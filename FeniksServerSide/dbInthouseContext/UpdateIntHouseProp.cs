using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dbInthouseContext
{
    public class UpdateIntHouseProp
    {
        public int InHouse_ID { get; set; }
        public string InHouse_app_id { get; set; } // CONNECTION TRUE APP 

      
        public string Hub_ID { get; set; } // ID OF HUB 

        public string Name { get; set; }

      
        public string Password { get; set; }
        public string Username { get; set; }
    }
}
