using FluentValidation;

namespace PortfolioApi.Application.Features.Projects.Commands.CreateProject;

public class CreateProjectCommandValidator : AbstractValidator<CreateProjectCommand>
{
    public CreateProjectCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(2000);
        RuleFor(x => x.Stack).NotEmpty().MaximumLength(300);
        RuleFor(x => x.Tags).NotEmpty().MaximumLength(500);
        RuleFor(x => x.DemoUrl).MaximumLength(500);
        RuleFor(x => x.GitHubUrl).MaximumLength(500);
        RuleFor(x => x.ImageUrl).MaximumLength(500);
    }
}
