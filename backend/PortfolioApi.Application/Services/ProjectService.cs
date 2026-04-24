using PortfolioApi.Application.DTOs.Projects;
using PortfolioApi.Application.Interfaces;
using PortfolioApi.Domain.Entities;
using PortfolioApi.Domain.Interfaces;

namespace PortfolioApi.Application.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;

    public ProjectService(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<IEnumerable<ProjectDto>> GetAllAsync()
    {
        var projects = await _projectRepository.GetAllAsync();
        return projects.Select(ToDto);
    }

    public async Task<ProjectDto?> GetByIdAsync(int id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        return project is null ? null : ToDto(project);
    }

    public async Task<ProjectDto> CreateAsync(CreateProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            Description = dto.Description,
            Stack = dto.Stack,
            DemoUrl = dto.DemoUrl,
            GitHubUrl = dto.GitHubUrl,
            ImageUrl = dto.ImageUrl,
            Tags = dto.Tags,
            CreatedAt = DateTime.UtcNow
        };

        await _projectRepository.AddAsync(project);
        await _projectRepository.SaveChangesAsync();

        return ToDto(project);
    }

    public async Task<bool> UpdateAsync(int id, UpdateProjectDto dto)
    {
        if (id != dto.Id) return false;

        var existing = await _projectRepository.GetByIdAsync(id);
        if (existing is null) return false;

        existing.Title = dto.Title;
        existing.Description = dto.Description;
        existing.Stack = dto.Stack;
        existing.DemoUrl = dto.DemoUrl;
        existing.GitHubUrl = dto.GitHubUrl;
        existing.ImageUrl = dto.ImageUrl;
        existing.Tags = dto.Tags;

        await _projectRepository.UpdateAsync(existing);
        await _projectRepository.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project is null) return false;

        await _projectRepository.DeleteAsync(project);
        await _projectRepository.SaveChangesAsync();

        return true;
    }

    private static ProjectDto ToDto(Project p) =>
        new(p.Id, p.Title, p.Description, p.Stack, p.DemoUrl, p.GitHubUrl, p.ImageUrl, p.Tags, p.CreatedAt);
}
