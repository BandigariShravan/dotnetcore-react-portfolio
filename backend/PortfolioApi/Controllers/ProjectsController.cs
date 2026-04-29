using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using PortfolioApi.Application.DTOs.Projects;
using PortfolioApi.Application.Features.Projects.Commands.CreateProject;
using PortfolioApi.Application.Features.Projects.Commands.DeleteProject;
using PortfolioApi.Application.Features.Projects.Commands.UpdateProject;
using PortfolioApi.Application.Features.Projects.Queries.GetProjectById;
using PortfolioApi.Application.Features.Projects.Queries.GetProjects;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ISender _sender;

    public ProjectsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _sender.Send(new GetProjectsQuery());
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _sender.Send(new GetProjectByIdQuery(id));
        if (project is null) return NotFound();
        return Ok(project);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateProjectDto dto)
    {
        var command = new CreateProjectCommand(
            dto.Title,
            dto.Description,
            dto.Stack,
            dto.DemoUrl,
            dto.GitHubUrl,
            dto.ImageUrl,
            dto.Tags);

        var created = await _sender.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateProjectDto dto)
    {
        if (id != dto.Id) return BadRequest();

        var command = new UpdateProjectCommand(
            dto.Id,
            dto.Title,
            dto.Description,
            dto.Stack,
            dto.DemoUrl,
            dto.GitHubUrl,
            dto.ImageUrl,
            dto.Tags);

        var updated = await _sender.Send(command);
        if (!updated) return NotFound();

        return NoContent();
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _sender.Send(new DeleteProjectCommand(id));
        if (!deleted) return NotFound();

        return NoContent();
    }
}
