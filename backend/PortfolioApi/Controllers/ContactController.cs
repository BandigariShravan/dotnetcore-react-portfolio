using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Submit(ContactMessage message)
    {
        message.CreatedAt = DateTime.UtcNow;
        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Message sent successfully!" });
    }
}
