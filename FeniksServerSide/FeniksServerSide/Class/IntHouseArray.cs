using Microsoft.EntityFrameworkCore;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace FeniksServerSide.Class
{

    internal class IntHouseArray
    {
        private readonly InthouseContext _dbContext;

        public IntHouseArray(InthouseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<InthouseProp>> GetInthouseListAsync()
        {
            return await _dbContext.InthouseProp.ToListAsync();
        }

   
        public async Task AddToListAsync(InthouseProp inthouseProp)
        {
            _dbContext.InthouseProp.Add(inthouseProp);
            await _dbContext.SaveChangesAsync();
        }

        
        public async Task RemoveFromListAsync(InthouseProp inthouseProp)
        {
            _dbContext.InthouseProp.Remove(inthouseProp);
            await _dbContext.SaveChangesAsync();
        }

     
        public async Task AccessProtectedSiteAsync()
        {
            List<InthouseProp> inthouses = await GetInthouseListAsync();

            foreach (InthouseProp item in inthouses)
            {
                using (HttpClient client = new HttpClient())
                {
                    try
                    {
                        var byteArray = Encoding.ASCII.GetBytes($"{item.Username}:{item.Password}");
                        var authHeader = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

                        client.DefaultRequestHeaders.Authorization = authHeader;

                        HttpResponseMessage response = await client.GetAsync(item.CloudConnection);

                        if (response.IsSuccessStatusCode)
                        {
                            Console.WriteLine("Access granted, site is reachable.");
                            string content = await response.Content.ReadAsStringAsync();
                            Console.WriteLine("Site content: ");
                            Console.WriteLine(content);
                            _dbContext.Statistics.Add(new Statistics(
                                0,
                                DateOnly.FromDateTime(DateTime.Now), 
                                DateTime.Now.TimeOfDay,             
                                "200",
                                "200",
                                item.InHouse_ID,
                                item
                            ));
                            await _dbContext.SaveChangesAsync();
                        }
                        else
                        {
                            Console.WriteLine($"Access denied, status code: {response.StatusCode}");
                            _dbContext.Statistics.Add(new Statistics(0, DateOnly.FromDateTime(DateTime.Now), DateTime.Now.TimeOfDay, response.StatusCode.ToString(), response.StatusCode.ToString(), item.InHouse_ID, item));
                            await _dbContext.SaveChangesAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error accessing site: {ex.Message}");
                    }
                }
            }
        }
    }
}
