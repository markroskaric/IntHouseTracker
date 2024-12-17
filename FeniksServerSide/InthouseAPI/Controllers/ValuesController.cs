using FeniksServerSide.Class;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InthouseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly ILogger<StatisticsController> _logger;
        InthouseContext _context = new InthouseContext();

        public StatisticsController(ILogger<StatisticsController> logger)
        {
            _logger = logger;
        }
        [HttpGet("byfield/{id}", Name = "GetStatisticsByFieldID")]
        public async Task<ActionResult<IEnumerable<Statistics>>> GetStatisticsByFieldID(int id)
        {
            var results = await _context.Statistics
                .Where(s => s.TK_Inthouse_ID == id) 
                .ToListAsync(); 

            if (!results.Any())
            {
                return NotFound(); 
            }

            return Ok(results); 
        }
        [HttpGet("byfield/{id}/last100dates", Name = "GetLast100StatisticsByFieldID")]
        public async Task<ActionResult<IEnumerable<object>>> GetLast100StatisticsByFieldID(int id)
        {
           
            var results = await _context.Statistics
                .Where(s => s.TK_Inthouse_ID == id)
                 .OrderBy(s => s.Date) 
                .Take(100) 
                .ToListAsync(); 

            if (!results.Any())
            {
                return NotFound(new { status = 0 });
            }

            
            var transformedResults = results.Select(s => new
            {
                time = s.Date.ToString("yyyy-MM-dd") + " " + s.Time.ToString(),
                status = (int.TryParse(s.Status, out int statusValue) && statusValue >= 200 && statusValue <= 299) ? 1 : 0
            });



            return Ok(transformedResults); 
        }






    }
}
