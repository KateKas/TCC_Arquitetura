using Minera.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Minera.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly ILogger _logger;
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger("Unexpected Exception");
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                var incommingException = ex;

                if (!(ex is BusinessException))
                {
                    try
                    {
                        _logger.LogCritical($"{ex}");                        
                    }
                    catch (System.Exception ex_2)
                    {
                        incommingException = new Exception(ex_2.Message, ex);
                    }
                }

                await HandleExceptionAsync(httpContext, incommingException);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            if (exception is BusinessException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var res = new ErrorResponse()
                {
                    Message = exception.Message
                };
                return context.Response.WriteAsync(res.ToString(), Encoding.UTF8);
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var res = new ErrorResponse()
                {
                    Message = exception.Message,
                    Details = new ErrorResponseDetails()
                    {
                        RequestId = context?.TraceIdentifier
                    }
                };
                return context.Response.WriteAsync(res.ToString(), Encoding.UTF8);
            }
        }
    }
}
