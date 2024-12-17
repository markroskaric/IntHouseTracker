using FeniksServerSide.Class;
using Polly;
using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        InthouseContext _context = new InthouseContext();
        Console.WriteLine($"Database path: {_context.DbPath}.");
        var program = new IntHouseArray(_context);

        await RunPeriodicTaskWithRetryAsync(program);
    }

    private static async Task RunPeriodicTaskWithRetryAsync(IntHouseArray program)
    {
        var retryPolicy = Policy
            .Handle<Exception>() 
            .WaitAndRetryAsync( 
                retryCount: 3,
                sleepDurationProvider: attempt => TimeSpan.FromSeconds(5), 
                onRetry: (exception, timeSpan, retryCount, context) =>
                {
                   
                    Console.WriteLine($"Retrying... Attempt {retryCount} after {timeSpan.TotalSeconds} seconds due to: {exception.Message}");
                });

        while (true)
        {
            try
            {
               
                await retryPolicy.ExecuteAsync(async () =>
                {
                    await program.AccessProtectedSiteAsync();
                    Console.WriteLine("Accessed protected site successfully.");
                });
            }
            catch (Exception ex)
            {
               
                Console.WriteLine($"Error occurred after retries: {ex.Message}");
            }

            
            await Task.Delay(10000);
        }
    }
}
