namespace Minera.Data
{
    using Minera.Data.Entities;
    using Microsoft.EntityFrameworkCore;

    public class MineraDbContext : DbContext
    {
        public MineraDbContext(DbContextOptions<MineraDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Insumo> Insumos { get; set; }
        public DbSet<Manutencao> Manutencoes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}