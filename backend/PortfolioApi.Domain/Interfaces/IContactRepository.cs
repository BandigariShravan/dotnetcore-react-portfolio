using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Domain.Interfaces;

public interface IContactRepository
{
    Task AddAsync(ContactMessage message);
    Task SaveChangesAsync();
}
