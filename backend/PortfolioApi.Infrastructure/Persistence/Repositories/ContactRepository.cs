using PortfolioApi.Domain.Entities;
using PortfolioApi.Domain.Interfaces;
using PortfolioApi.Infrastructure.Persistence;

namespace PortfolioApi.Infrastructure.Persistence.Repositories;

public class ContactRepository : IContactRepository
{
    private readonly AppDbContext _context;

    public ContactRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(ContactMessage message) =>
        await _context.ContactMessages.AddAsync(message);

    public Task SaveChangesAsync() =>
        _context.SaveChangesAsync();
}
