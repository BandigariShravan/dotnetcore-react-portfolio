# DevPortfolio — Full-Stack Portfolio Web Application

A complete, advanced portfolio web application built with **ASP.NET Core 10** (backend) and **React + Vite** (frontend), using **SQLite** for data storage and **JWT** for authentication.

---

## Tech Stack

| Layer     | Technology                                              |
|-----------|---------------------------------------------------------|
| Backend   | ASP.NET Core 10 Web API, Entity Framework Core, SQLite  |
| Auth      | JWT Bearer tokens, BCrypt password hashing              |
| Frontend  | React 19, Vite, React Router v7, Material-UI v6         |
| Database  | SQLite (via EF Core)                                    |

---

## Project Structure

```
dotnetcore-react-portfolio/
├── backend/
│   └── PortfolioApi/
│       ├── Controllers/
│       │   ├── AuthController.cs
│       │   ├── ProjectsController.cs
│       │   └── ContactController.cs
│       ├── Data/
│       │   └── AppDbContext.cs
│       ├── Models/
│       │   ├── Project.cs
│       │   ├── ContactMessage.cs
│       │   └── User.cs
│       ├── Services/
│       │   └── TokenService.cs
│       ├── Program.cs
│       ├── appsettings.json
│       └── PortfolioApi.csproj
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Admin.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── ProjectDetail.jsx
    │   │   └── Projects.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    ├── index.html
    └── package.json
```

---

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/) and npm

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BandigariShravan/dotnetcore-react-portfolio.git
cd dotnetcore-react-portfolio
```

### 2. Run the Backend

```bash
cd backend/PortfolioApi
dotnet run
```

The API will start on **http://localhost:5000**.

On first run, it automatically:
- Creates the SQLite database (`portfolio.db`)
- Seeds 5 demo projects
- Creates the default admin user

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## API Endpoints

### Authentication
| Method | Endpoint             | Description          | Auth Required |
|--------|----------------------|----------------------|---------------|
| POST   | `/api/auth/register` | Register new user    | No            |
| POST   | `/api/auth/login`    | Login, returns JWT   | No            |

### Projects
| Method | Endpoint              | Description           | Auth Required       |
|--------|-----------------------|-----------------------|---------------------|
| GET    | `/api/projects`       | Get all projects      | No                  |
| GET    | `/api/projects/{id}`  | Get project by ID     | No                  |
| POST   | `/api/projects`       | Create new project    | Admin JWT           |
| PUT    | `/api/projects/{id}`  | Update project        | Admin JWT           |
| DELETE | `/api/projects/{id}`  | Delete project        | Admin JWT           |

### Contact
| Method | Endpoint        | Description              | Auth Required |
|--------|-----------------|--------------------------|---------------|
|POST    | `/api/contact`  | Submit contact message   | No            |

---

## Default Credentials

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | `admin`  | `Admin@123`|

---

## Frontend Pages

| Route           | Description                        | Protected |
|-----------------|------------------------------------|-----------|
| `/`             | Home / Landing page with hero      | No        |
| `/projects`     | Project gallery with search/filter | No        |
| `/projects/:id` | Project detail view                | No        |
| `/contact`      | Contact form                       | No        |
| `/login`        | Login page                         | No        |
| `/admin`        | Admin panel (manage projects)      | Admin only|

---

## Features

- **JWT Authentication** — Secure login with role-based access (admin/viewer)
- **Projects CRUD** — Full create, read, update, delete via admin panel
- **Contact Form** — Messages saved to SQLite database
- **Search & Filter** — Filter projects by text search and tag chips
- **Responsive Design** — Mobile-friendly with drawer navigation
- **Material-UI** — Polished UI with consistent theming
- **Seed Data** — 5 demo projects auto-seeded on startup
- **Swagger UI** — API docs available at `/swagger` in development

---

## Environment Variables

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`backend/PortfolioApi/appsettings.json`):
```json
{
  "ConnectionStrings": { "DefaultConnection": "Data Source=portfolio.db" },
  "Jwt": {
    "Key": "...",
    "Issuer": "PortfolioApi",
    "Audience": "PortfolioApp"
  }
}
```

---

## Deployment

The app is deployed with the **backend on [Render](https://render.com)** (free tier, Docker) and the **frontend on [Vercel](https://vercel.com)** (free tier, CDN).

### Backend — Render

1. Push this repository to GitHub (if not already done).
2. Go to **render.com → New → Blueprint** and connect the repository.  
   Render will detect `render.yaml` and create the `portfolio-api` web service automatically.
3. In the Render dashboard, set the following **environment variables** under the service's *Environment* tab:

   | Variable | Description |
   |---|---|
   | `Jwt__Key` | Random secret, **minimum 32 characters** (256-bit for HS256) |
   | `Cors__AllowedOrigin` | Your Vercel frontend URL, e.g. `https://my-portfolio.vercel.app` |

4. Deploy — Render builds the Docker image and mounts a 1 GB persistent disk at `/data` for the SQLite database.

> **Note:** The free tier spins down after inactivity; the first request after sleep may be slow.

### Frontend — Vercel

1. Go to **vercel.com → New Project** and import the same GitHub repository.
2. Set the **Root Directory** to `frontend`.
3. Add the following **Environment Variable** in the Vercel project settings:

   | Variable | Value |
   |---|---|
   | `VITE_API_URL` | Your Render backend URL + `/api`, e.g. `https://portfolio-api.onrender.com/api` |

4. Deploy — Vercel detects Vite automatically and builds the React app.  
   The `frontend/vercel.json` file ensures React Router deep links work on page refresh.

### CI (GitHub Actions)

The `.github/workflows/ci.yml` workflow runs automatically on every push and pull request to `main`/`master`:

- **Backend** — `dotnet restore` → `dotnet build`
- **Frontend** — `npm ci` → `npm run lint` → `npm run build`

No secrets are required for CI — only the two Render env vars and the one Vercel env var listed above need to be configured in their respective dashboards.

---

## License

MIT
