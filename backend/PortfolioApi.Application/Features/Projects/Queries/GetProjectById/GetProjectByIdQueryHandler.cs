using AutoMapper;
using MediatR;
using PortfolioApi.Application.DTOs.Projects;
using PortfolioApi.Application.Interfaces.Persistence;

namespace PortfolioApi.Application.Features.Projects.Queries.GetProjectById;

public class GetProjectByIdQueryHandler : IRequestHandler<GetProjectByIdQuery, ProjectDto?>
{
    private readonly IProjectRepository _projectRepository;
    private readonly IMapper _mapper;

    public GetProjectByIdQueryHandler(IProjectRepository projectRepository, IMapper mapper)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
    }

    public async Task<ProjectDto?> Handle(GetProjectByIdQuery request, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetByIdAsync(request.Id);
        return project is null ? null : _mapper.Map<ProjectDto>(project);
    }
}
