using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using PortfolioApi.Infrastructure;
using PortfolioApi.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Infrastructure (repositories, services, DbContext)
builder.Services.AddInfrastructure(builder.Configuration);

// JWT — key must be provided via Jwt:Key config key, Jwt__Key environment variable, or dotnet user-secrets
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrWhiteSpace(jwtKey))
    throw new InvalidOperationException(
        "JWT signing key is not configured. " +
        "Set it using the 'Jwt__Key' environment variable or dotnet user-secrets (key: 'Jwt:Key'). " +
        "The key must be at least 32 characters long.");

if (jwtKey.Length < 32)
    throw new InvalidOperationException("JWT signing key must be at least 32 characters long.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "PortfolioApi",
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "PortfolioApp",
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                builder.Configuration["Cors:AllowedOrigin"] ?? "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Ensure the directory for the SQLite database file exists (e.g. /data on Render's persistent disk)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=portfolio.db";
var sqliteBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder(connectionString);
var dbDirectory = Path.GetDirectoryName(sqliteBuilder.DataSource);
if (!string.IsNullOrWhiteSpace(dbDirectory))
    Directory.CreateDirectory(dbDirectory);

// Seed database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DatabaseSeeder.Seed(db);
}

app.Run();
