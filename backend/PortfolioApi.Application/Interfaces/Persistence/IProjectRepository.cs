using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Application.Interfaces.Persistence;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync();
    Task<Project?> GetByIdAsync(int id);
    Task AddAsync(Project project);
    Task UpdateAsync(Project project);
    Task DeleteAsync(Project project);
    Task SaveChangesAsync();
}
