using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Application.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
}
