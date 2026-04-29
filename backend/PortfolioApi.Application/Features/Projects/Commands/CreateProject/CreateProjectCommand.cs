using MediatR;
using PortfolioApi.Application.DTOs.Projects;

namespace PortfolioApi.Application.Features.Projects.Commands.CreateProject;

public record CreateProjectCommand(
    string Title,
    string Description,
    string Stack,
    string? DemoUrl,
    string? GitHubUrl,
    string? ImageUrl,
    string Tags) : IRequest<ProjectDto>;
