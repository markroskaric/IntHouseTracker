using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeniksServerSide.Class
{
    public class Statistics
    {
        [Key]
        public int Statistic_ID { get; set; }
        public DateOnly Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Status { get; set; }
        public string Response { get; set; }
        public int? TK_Inthouse_ID { get; set; }
        public virtual InthouseProp InthouseProp { get; set; }

        public Statistics() { }

        public Statistics(int statistic_ID, DateOnly date, TimeSpan time, string status, string response, int? tK_Inthouse_ID, InthouseProp inthouseProp)
        {
            Statistic_ID = statistic_ID;
            Date = date;
            Time = time;
            Status = status;
            Response = response;
            TK_Inthouse_ID = tK_Inthouse_ID;
            InthouseProp = inthouseProp;
        }
    }
    

}
