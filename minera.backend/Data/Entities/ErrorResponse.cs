using Newtonsoft.Json;

namespace Minera.Data.Entities
{
    public class ErrorResponse
    {
        public string Message { get; set; }

        public ErrorResponseDetails Details { get; set; }


        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }


    public class ErrorResponseDetails
    {
        public string RequestId { get; set; }
    }
}
