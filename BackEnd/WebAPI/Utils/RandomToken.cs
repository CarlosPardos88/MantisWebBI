using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace WebAPI.Utils
{
    public class RandomToken
    {
        static public int Next(int max)
        {
            int min = 0;
            var generator = RandomNumberGenerator.Create();
            var bytes = new byte[sizeof(int)]; // 4 bytes
            generator.GetNonZeroBytes(bytes);
            // match Next of Random
            // where max is exclusive
            max = max - 1;

            var val = BitConverter.ToInt32(bytes, 0);
            // constrain our values to between our min and max
            var result = ((val - min) % (max - min + 1) + (max - min + 1)) % (max - min + 1) + min;
            return result;
        }

    }
}