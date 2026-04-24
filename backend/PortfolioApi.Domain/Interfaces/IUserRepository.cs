using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username);
    Task<bool> UsernameExistsAsync(string username);
    Task AddAsync(User user);
    Task SaveChangesAsync();
}
