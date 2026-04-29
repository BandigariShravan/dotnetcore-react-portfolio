using AutoMapper;
using PortfolioApi.Application.DTOs.Projects;
using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Application.Common.Mappings;

public class ProjectMappingProfile : Profile
{
    public ProjectMappingProfile()
    {
        CreateMap<Project, ProjectDto>();
    }
}
