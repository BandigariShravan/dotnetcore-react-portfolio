namespace PortfolioApi.Application.DTOs.Projects;

public record UpdateProjectDto(
    int Id,
    string Title,
    string Description,
    string Stack,
    string? DemoUrl,
    string? GitHubUrl,
    string? ImageUrl,
    string Tags);
