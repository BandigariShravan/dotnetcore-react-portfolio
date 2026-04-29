using MediatR;
using PortfolioApi.Application.DTOs.Projects;

namespace PortfolioApi.Application.Features.Projects.Queries.GetProjects;

public record GetProjectsQuery : IRequest<IEnumerable<ProjectDto>>;
