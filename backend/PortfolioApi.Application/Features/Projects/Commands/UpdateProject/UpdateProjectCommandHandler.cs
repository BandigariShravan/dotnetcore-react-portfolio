using MediatR;
using PortfolioApi.Application.Interfaces.Persistence;

namespace PortfolioApi.Application.Features.Projects.Commands.UpdateProject;

public class UpdateProjectCommandHandler : IRequestHandler<UpdateProjectCommand, bool>
{
    private readonly IProjectRepository _projectRepository;

    public UpdateProjectCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<bool> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        var existing = await _projectRepository.GetByIdAsync(request.Id);
        if (existing is null)
        {
            return false;
        }

        existing.Title = request.Title;
        existing.Description = request.Description;
        existing.Stack = request.Stack;
        existing.DemoUrl = request.DemoUrl;
        existing.GitHubUrl = request.GitHubUrl;
        existing.ImageUrl = request.ImageUrl;
        existing.Tags = request.Tags;

        await _projectRepository.UpdateAsync(existing);
        await _projectRepository.SaveChangesAsync();

        return true;
    }
}
