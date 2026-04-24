using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Application.DTOs.Auth;
using PortfolioApi.Application.Interfaces;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        try
        {
            var result = await _authService.RegisterAsync(dto);
            return Ok(new { token = result.Token, username = result.Username, role = result.Role });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        if (result is null)
            return Unauthorized(new { message = "Invalid credentials" });

        return Ok(new { token = result.Token, username = result.Username, role = result.Role });
    }
}
