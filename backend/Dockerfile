# Stage 1 — build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files first to leverage Docker layer caching
COPY PortfolioSolution.sln .
COPY PortfolioApi/PortfolioApi.csproj                               PortfolioApi/
COPY PortfolioApi.Application/PortfolioApi.Application.csproj       PortfolioApi.Application/
COPY PortfolioApi.Domain/PortfolioApi.Domain.csproj                 PortfolioApi.Domain/
COPY PortfolioApi.Infrastructure/PortfolioApi.Infrastructure.csproj PortfolioApi.Infrastructure/

RUN dotnet restore

# Copy the rest of the source and publish
COPY . .
RUN dotnet publish PortfolioApi/PortfolioApi.csproj \
      -c Release \
      -o /app/publish \
      --no-restore

# Stage 2 — runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# Render injects PORT=10000; ASP.NET Core 8+ reads ASPNETCORE_HTTP_PORTS
ENV ASPNETCORE_HTTP_PORTS=10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "PortfolioApi.dll"]
