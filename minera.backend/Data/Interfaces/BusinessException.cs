using System;

namespace Minera.Data.Entities
{
    public class BusinessException : Exception
    {
        public string Code { get; set; }
        public string Description { get; set; }

        public BusinessException()
        {
            Code = "500";
            Description = "Erro desconhecido.";
        }

        public BusinessException(string message)
            : base(message)
        {
            Code = "500";
            Description = message;
        }

        public BusinessException(string message, Exception inner)
            : base(message, inner)
        {
            Code = "500";
            Description = message;
        }

        public BusinessException(string code, string description) : base (description)
        {
            Code = code;
            Description = description;            
        }
    }
}