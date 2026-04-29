using FluentValidation;

namespace PortfolioApi.Application.Features.Projects.Commands.DeleteProject;

public class DeleteProjectCommandValidator : AbstractValidator<DeleteProjectCommand>
{
    public DeleteProjectCommandValidator()
    {
        RuleFor(x => x.Id).GreaterThan(0);
    }
}
