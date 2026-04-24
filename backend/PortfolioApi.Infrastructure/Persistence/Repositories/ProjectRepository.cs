using Microsoft.EntityFrameworkCore;
using PortfolioApi.Domain.Entities;
using PortfolioApi.Domain.Interfaces;
using PortfolioApi.Infrastructure.Persistence;

namespace PortfolioApi.Infrastructure.Persistence.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;

    public ProjectRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Project>> GetAllAsync() =>
        await _context.Projects.OrderByDescending(p => p.CreatedAt).ToListAsync();

    public Task<Project?> GetByIdAsync(int id) =>
        _context.Projects.FindAsync(id).AsTask();

    public async Task AddAsync(Project project) =>
        await _context.Projects.AddAsync(project);

    public Task UpdateAsync(Project project)
    {
        _context.Projects.Update(project);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Project project)
    {
        _context.Projects.Remove(project);
        return Task.CompletedTask;
    }

    public Task SaveChangesAsync() =>
        _context.SaveChangesAsync();
}
