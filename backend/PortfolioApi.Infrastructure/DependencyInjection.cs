using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PortfolioApi.Application.Interfaces;
using PortfolioApi.Application.Interfaces.Persistence;
using PortfolioApi.Application.Services;
using PortfolioApi.Domain.Interfaces;
using PortfolioApi.Infrastructure.Persistence;
using PortfolioApi.Infrastructure.Persistence.Repositories;
using PortfolioApi.Infrastructure.Services;

namespace PortfolioApi.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(
                configuration.GetConnectionString("DefaultConnection") ?? "Data Source=portfolio.db"));

        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<PortfolioApi.Domain.Interfaces.IProjectRepository, ProjectRepository>();
        services.AddScoped<PortfolioApi.Application.Interfaces.Persistence.IProjectRepository, ProjectRepository>();
        services.AddScoped<IContactRepository, ContactRepository>();

        // Infrastructure services
        services.AddScoped<ITokenService, TokenService>();

        // Application services
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IContactService, ContactService>();

        return services;
    }
}
