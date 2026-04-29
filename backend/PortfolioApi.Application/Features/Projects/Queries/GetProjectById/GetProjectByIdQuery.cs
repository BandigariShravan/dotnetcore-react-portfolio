using MediatR;
using PortfolioApi.Application.DTOs.Projects;

namespace PortfolioApi.Application.Features.Projects.Queries.GetProjectById;

public record GetProjectByIdQuery(int Id) : IRequest<ProjectDto?>;
