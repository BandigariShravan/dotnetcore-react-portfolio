namespace PortfolioApi.Application.DTOs.Projects;

public record CreateProjectDto(
    string Title,
    string Description,
    string Stack,
    string? DemoUrl,
    string? GitHubUrl,
    string? ImageUrl,
    string Tags);
