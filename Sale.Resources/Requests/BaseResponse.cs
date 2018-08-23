namespace Sale.Resources
{
    public class BaseResponse
    {
        public bool IsOk { get; set; } = false;
        public string ErrorType { get; set; }
        public string ErrorMessage { get; set; }
    }
}