using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace Sale.Core
{
    public class PasswordHelper
    {
        private static int _iterations = 1000;

        public static HashInfo Hash(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            var deriveBytes = new Rfc2898DeriveBytes(password, salt, _iterations);
            var hash = deriveBytes.GetBytes(20);

            return new HashInfo
            {
                Hash = Convert.ToBase64String(hash),
                Salt = Convert.ToBase64String(salt),
                Iterations = _iterations,
            };
        }

        public static bool IsValid(string password, HashInfo hashInfo)
        {
            var hash = Convert.FromBase64String(hashInfo.Hash);
            var salt = Convert.FromBase64String(hashInfo.Salt);

            var deriveBytes = new Rfc2898DeriveBytes(password, salt, hashInfo.Iterations);
            var newHash = deriveBytes.GetBytes(20);

            return hash.SequenceEqual(newHash);
        }

        public static string GetHash(string input)
        {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();

            byte[] byteValue = System.Text.Encoding.UTF8.GetBytes(input);

            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);

            return Convert.ToBase64String(byteHash);
        }
    }

    public class HashInfo
    {
        public string Hash { get; set; }
        public string Salt { get; set; }
        public int Iterations { get; set; }
    }
}