using dbInthouseContext;
using FeniksServerSide.Class;
using InthouseAPI.Class;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace InthouseAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IntHouseController : ControllerBase
    {
        private readonly ILogger<IntHouseController> _logger;

        InthouseContext _context = new InthouseContext();

        public IntHouseController(ILogger<IntHouseController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetAllIntHouseObjects")]
        public IEnumerable<object> Get()
        {
            var devices = _context.InthouseProp
                .Include(i => i.Statistics)
                .ToList();

            var result = devices.Select(device =>
            {
                
                var lastStatus = device.Statistics
                    .OrderByDescending(s => s.Date)
                    .ThenByDescending(s => s.Time)
                    .Select(s => new
                    {
                        s.Status,
                        s.Response,
                        s.Date,
                        s.Time
                    })
                    .FirstOrDefault();

               
                return new
                {
                    device.InHouse_ID,
                    device.InHouse_app_id,
                    device.Name,
                    device.Hub_ID,
                    device.CloudConnection,
                    device.Username,
                    device.Password,
                    LastStatus = lastStatus ?? new 
                    {
                        Status = "0",                     
                        Response = "0",                   
                        Date = DateOnly.MinValue,         
                        Time = TimeSpan.Zero               
                    }
                };
            });

            return result;
        }






        [HttpPost(Name = "AddIntHouseObject")]
        public async Task<ActionResult<InthouseProp>> AddIntHouseObject(IntHousePropAPI inthouseProp)
        {
            if (inthouseProp == null)
            {
                return BadRequest("Invalid input.");
            }
            string Connection ;
            if (inthouseProp.Hub_ID.StartsWith("H-"))
            {
                Connection = "https://" + inthouseProp.Hub_ID + ".inthouse.cloud";

            }
            else
            {
                Connection = "http://" + inthouseProp.Hub_ID;
            }
            var data = new InthouseProp(inthouseProp.InHouse_app_id, inthouseProp.Name, inthouseProp.Hub_ID, inthouseProp.Username, inthouseProp.Password, Connection);

            await _context.InthouseProp.AddAsync(data);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddIntHouseObject), new { id = data.InHouse_ID }, data);
        }

       
        [HttpPut("{id}", Name = "UpdateIntHouseObject")]
        public async Task<IActionResult> UpdateInthouse(int id, [FromBody] UpdateIntHouseProp updatedInthouse)
        {
            if (id != updatedInthouse.InHouse_ID)
            {
                return BadRequest("ID mismatch.");
            }

            var existingInthouse = await _context.InthouseProp
                .Include(i => i.Statistics)
                .FirstOrDefaultAsync(i => i.InHouse_ID == id);

            if (existingInthouse == null)
            {
                return NotFound("Inthouse object not found.");
            }

            string Connection;
            if (updatedInthouse.Hub_ID.StartsWith("H-"))
            {
                Connection = "https://" + updatedInthouse.Hub_ID + ".inthouse.cloud";

            }
            else
            {
                Connection = "http://" + updatedInthouse.Hub_ID;
            }
            existingInthouse.InHouse_app_id = updatedInthouse.InHouse_app_id;
            existingInthouse.Hub_ID = updatedInthouse.Hub_ID;
            existingInthouse.Name = updatedInthouse.Name;
            existingInthouse.Password = updatedInthouse.Password;
            existingInthouse.Username = updatedInthouse.Username;
            existingInthouse.CloudConnection = Connection;




            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingInthouse);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.InthouseProp.Any(e => e.InHouse_ID == id))
                {
                    return NotFound("Inthouse object not found for concurrency exception.");
                }
                else
                {
                    throw;
                }
            }
        }
        [HttpDelete("{id}", Name = "DeleteIntHouseObject")]
        public async Task<IActionResult> DeleteInthouse(int id)
        {
        
            var existingInthouse = await _context.InthouseProp
                .Include(i => i.Statistics) 
                .FirstOrDefaultAsync(i => i.InHouse_ID == id);

          
            if (existingInthouse == null)
            {
                return NotFound($"Inthouse object with ID {id} not found.");
            }

          
            _context.InthouseProp.Remove(existingInthouse);

            try
            {
               
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("count", Name = "GetInthouseCount")]
        public async Task<IActionResult> GetInthouseCount()
        {
            var count = await _context.InthouseProp.CountAsync();
            return Ok(count);
        }
        

    }
}
