using MediatR;

namespace PortfolioApi.Application.Features.Projects.Commands.UpdateProject;

public record UpdateProjectCommand(
    int Id,
    string Title,
    string Description,
    string Stack,
    string? DemoUrl,
    string? GitHubUrl,
    string? ImageUrl,
    string Tags) : IRequest<bool>;
