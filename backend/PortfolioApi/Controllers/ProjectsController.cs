using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _context.Projects.OrderByDescending(p => p.CreatedAt).ToListAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();
        return Ok(project);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> Create(Project project)
    {
        project.CreatedAt = DateTime.UtcNow;
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Project project)
    {
        if (id != project.Id) return BadRequest();

        var existing = await _context.Projects.FindAsync(id);
        if (existing == null) return NotFound();

        // Preserve original CreatedAt to prevent accidental overwrite
        existing.Title = project.Title;
        existing.Description = project.Description;
        existing.Stack = project.Stack;
        existing.DemoUrl = project.DemoUrl;
        existing.GitHubUrl = project.GitHubUrl;
        existing.ImageUrl = project.ImageUrl;
        existing.Tags = project.Tags;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();
        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
