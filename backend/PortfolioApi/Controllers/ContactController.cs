using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Application.DTOs.Contact;
using PortfolioApi.Application.Interfaces;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpPost]
    public async Task<IActionResult> Submit(ContactMessageDto dto)
    {
        await _contactService.SubmitAsync(dto);
        return Ok(new { message = "Message sent successfully!" });
    }
}
