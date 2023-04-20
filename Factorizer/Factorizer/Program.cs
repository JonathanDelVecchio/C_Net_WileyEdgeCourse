using System;

namespace Factorizer
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter a number to factor: ");
            int number = int.Parse(Console.ReadLine());

            Console.WriteLine("Original number: " + number);

            int factorCount = 0;
            int factorSum = 0;

            Console.Write("Factors: ");
            for (int i = 1; i <= number; i++)
            {
                if (number % i == 0)
                {
                    Console.Write(i + " ");
                    factorCount++;
                    factorSum += i;
                }
            }
            Console.WriteLine();

            Console.WriteLine("Number of factors: " + factorCount);

            bool isPerfect = (factorSum - number == number);
            Console.WriteLine("Perfect number: " + isPerfect);

            bool isPrime = true;
            for (int i = 2; i <= number / 2; i++)
            {
                if (number % i == 0)
                {
                    isPrime = false;
                    break;
                }
            }
            Console.WriteLine("Prime number: " + isPrime);
        }
    }
}