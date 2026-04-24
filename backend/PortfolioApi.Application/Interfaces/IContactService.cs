using PortfolioApi.Application.DTOs.Contact;

namespace PortfolioApi.Application.Interfaces;

public interface IContactService
{
    Task SubmitAsync(ContactMessageDto dto);
}
