using Microsoft.EntityFrameworkCore;
using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Project> Projects { get; set; }
    public DbSet<ContactMessage> ContactMessages { get; set; }
    public DbSet<User> Users { get; set; }
}
