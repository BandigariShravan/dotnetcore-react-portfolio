using PortfolioApi.Application.DTOs.Contact;
using PortfolioApi.Application.Interfaces;
using PortfolioApi.Domain.Entities;
using PortfolioApi.Domain.Interfaces;

namespace PortfolioApi.Application.Services;

public class ContactService : IContactService
{
    private readonly IContactRepository _contactRepository;

    public ContactService(IContactRepository contactRepository)
    {
        _contactRepository = contactRepository;
    }

    public async Task SubmitAsync(ContactMessageDto dto)
    {
        var message = new ContactMessage
        {
            Name = dto.Name,
            Email = dto.Email,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow
        };

        await _contactRepository.AddAsync(message);
        await _contactRepository.SaveChangesAsync();
    }
}
