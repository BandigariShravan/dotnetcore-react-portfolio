using PortfolioApi.Domain.Entities;

namespace PortfolioApi.Infrastructure.Persistence;

public static class DatabaseSeeder
{
    public static void Seed(AppDbContext db)
    {
        db.Database.EnsureCreated();

        if (!db.Users.Any())
        {
            db.Users.Add(new User
            {
                Username = "admin",
                Email = "admin@portfolio.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Role = "admin"
            });
        }

        if (!db.Projects.Any())
        {
            db.Projects.AddRange(
                new Project
                {
                    Title = "E-Commerce Platform",
                    Description = "A full-featured e-commerce platform built with .NET Core and React. Features include product catalog, shopping cart, order management, and payment integration.",
                    Stack = "ASP.NET Core,React,SQL Server,Redis,Stripe",
                    DemoUrl = "https://demo.example.com/ecommerce",
                    GitHubUrl = "https://github.com/example/ecommerce",
                    ImageUrl = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
                    Tags = "fullstack,ecommerce,dotnet,react",
                    CreatedAt = DateTime.UtcNow.AddDays(-30)
                },
                new Project
                {
                    Title = "Real-Time Chat App",
                    Description = "A real-time messaging application using SignalR for WebSocket communication. Supports group chats, direct messages, and file sharing.",
                    Stack = "ASP.NET Core,SignalR,React,PostgreSQL",
                    DemoUrl = "https://demo.example.com/chat",
                    GitHubUrl = "https://github.com/example/chat",
                    ImageUrl = "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600",
                    Tags = "realtime,signalr,websocket,chat",
                    CreatedAt = DateTime.UtcNow.AddDays(-20)
                },
                new Project
                {
                    Title = "Portfolio CMS",
                    Description = "A headless CMS for managing portfolio content. Built with Clean Architecture principles and CQRS pattern.",
                    Stack = "ASP.NET Core,React,SQLite,JWT,MediatR",
                    DemoUrl = "https://demo.example.com/cms",
                    GitHubUrl = "https://github.com/example/cms",
                    ImageUrl = "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600",
                    Tags = "cms,cleanarchitecture,cqrs,dotnet",
                    CreatedAt = DateTime.UtcNow.AddDays(-10)
                },
                new Project
                {
                    Title = "Task Management API",
                    Description = "RESTful API for task management with team collaboration features. Includes webhooks, notifications, and detailed audit logging.",
                    Stack = "ASP.NET Core,Entity Framework,PostgreSQL,Docker",
                    DemoUrl = "https://demo.example.com/tasks",
                    GitHubUrl = "https://github.com/example/tasks",
                    ImageUrl = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600",
                    Tags = "api,tasks,docker,postgresql",
                    CreatedAt = DateTime.UtcNow.AddDays(-5)
                },
                new Project
                {
                    Title = "AI Blog Generator",
                    Description = "An AI-powered blog content generator integrated with OpenAI GPT. Features automatic SEO optimization, tagging, and content scheduling.",
                    Stack = "React,Node.js,OpenAI,MongoDB",
                    DemoUrl = "https://demo.example.com/blog",
                    GitHubUrl = "https://github.com/example/blog",
                    ImageUrl = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600",
                    Tags = "ai,openai,react,blogging",
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                }
            );
        }

        db.SaveChanges();
    }
}
