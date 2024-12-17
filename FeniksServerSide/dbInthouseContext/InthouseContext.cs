using Microsoft.EntityFrameworkCore;

namespace FeniksServerSide.Class
{
    public class InthouseContext : DbContext
    {
        public DbSet<InthouseProp> InthouseProp { get; set; }
        public DbSet<Statistics> Statistics { get; set; }
        public string DbPath { get; }
        public InthouseContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "blogging.db");
        }
        public InthouseContext(DbContextOptions<InthouseContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite($"Data Source={DbPath}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Statistics>()
                .HasOne(s => s.InthouseProp)
                .WithMany(i => i.Statistics)
                .HasForeignKey(s => s.TK_Inthouse_ID);
        }
    }
}
