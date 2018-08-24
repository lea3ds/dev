namespace Sale.Resources
{
    public class AccountPasswordRequest
    {
        public long UserId { get; set; }
        public string PasswordOld { get; set; }
        public string PasswordNew { get; set; }
    }
}
