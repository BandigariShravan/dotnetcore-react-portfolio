using MediatR;

namespace PortfolioApi.Application.Features.Projects.Commands.DeleteProject;

public record DeleteProjectCommand(int Id) : IRequest<bool>;
