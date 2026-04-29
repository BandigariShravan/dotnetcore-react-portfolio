using MediatR;
using PortfolioApi.Application.Interfaces.Persistence;

namespace PortfolioApi.Application.Features.Projects.Commands.DeleteProject;

public class DeleteProjectCommandHandler : IRequestHandler<DeleteProjectCommand, bool>
{
    private readonly IProjectRepository _projectRepository;

    public DeleteProjectCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<bool> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetByIdAsync(request.Id);
        if (project is null)
        {
            return false;
        }

        await _projectRepository.DeleteAsync(project);
        await _projectRepository.SaveChangesAsync();

        return true;
    }
}
