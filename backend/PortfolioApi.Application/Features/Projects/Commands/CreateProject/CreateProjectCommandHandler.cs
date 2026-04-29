using AutoMapper;
using MediatR;
using PortfolioApi.Application.DTOs.Projects;
using PortfolioApi.Application.Interfaces.Persistence;
using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Application.Features.Projects.Commands.CreateProject;

public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, ProjectDto>
{
    private readonly IProjectRepository _projectRepository;
    private readonly IMapper _mapper;

    public CreateProjectCommandHandler(IProjectRepository projectRepository, IMapper mapper)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
    }

    public async Task<ProjectDto> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = new Project
        {
            Title = request.Title,
            Description = request.Description,
            Stack = request.Stack,
            DemoUrl = request.DemoUrl,
            GitHubUrl = request.GitHubUrl,
            ImageUrl = request.ImageUrl,
            Tags = request.Tags,
            CreatedAt = DateTime.UtcNow
        };

        await _projectRepository.AddAsync(project);
        await _projectRepository.SaveChangesAsync();

        return _mapper.Map<ProjectDto>(project);
    }
}
