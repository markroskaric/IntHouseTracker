using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FeniksServerSide.Class
{
    public class InthouseProp
    {
        [Key]
        public int InHouse_ID { get; set; }

        [Required]
        public string InHouse_app_id { get; set; } 

        [Required]
        public string Hub_ID { get; set; } 

        [Required]
        public string Name { get; set; }

        public string CloudConnection { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }

        public  List<Statistics>? Statistics { get; set; } = new List<Statistics>();


       
        public InthouseProp()
        {
            Statistics = new List<Statistics>();
        }

       
        public InthouseProp(string InHouse_app_id, string Name, string Hub_ID, string Username, string Password,string CloudConnection)
        {
            InHouse_ID = 0;
            this.InHouse_app_id = InHouse_app_id;
            this.Name = Name;
            this.Hub_ID = Hub_ID;
            this.Username = Username;
            this.Password = Password;
            this.CloudConnection = CloudConnection;
            Statistics = new List<Statistics>();
        }
    }

    
}
