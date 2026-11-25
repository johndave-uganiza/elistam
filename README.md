# eListam

eListam is a Point Of Sale (POS) web application developed using React.js, Bootstrap, ASP.NET Core Web API, and Microsoft SQL Server.

---

## Installation Guide

### Steps

1. **Clone the repository.** Open PowerShell and run:

   ```powershell
   git clone https://github.com/johndave-uganiza/elistam.git
   cd elistam
   ```

2. **Configure the API settings.** From the repository root, set these environment variables in PowerShell. Replace the example connection string and credentials with values for your local setup. Keep these values private.

   ```powershell
   $env:ConnectionStrings__DefaultConnection = "Server=localhost;Database=eListamDb;Trusted_Connection=True;TrustServerCertificate=True;"
   $env:Jwt__SecretKey = "replace-with-a-long-random-secret"
   $env:SeedUsers__AdminUserName = "admin"
   $env:SeedUsers__AdminEmail = "admin@example.com"
   $env:SeedUsers__AdminPassword = "Admin123!"
   $env:SeedUsers__DemoUserName = "demo"
   $env:SeedUsers__DemoEmail = "demo@example.com"
   $env:SeedUsers__DemoPassword = "Demo123!"
   ```

3. **Install the EF Core command-line tool** if you do not already have it:

   ```powershell
   dotnet tool install --global dotnet-ef
   ```

4. **Build the API** to restore dependencies and compile the server source code:

   ```powershell
   dotnet build server
   ```

5. **Apply EF Core migrations** from the repository root. If your checkout has no migrations yet, create the initial migration once before updating the database:

   ```powershell
   dotnet ef migrations add InitialCreate --project server\src\eListam.Infrastructure\eListam.Infrastructure.csproj --startup-project server\src\eListam.API\eListam.API.csproj
   ```

   Then create or update the database schema:

   ```powershell
   dotnet ef database update --project server\src\eListam.Infrastructure\eListam.Infrastructure.csproj --startup-project server\src\eListam.API\eListam.API.csproj
   ```

6. **Install additional SQL objects.** Connect to `eListamDb` in SSMS and execute these scripts in order:
   1. `sql\tables\DocumentNumberSequences.sql`
   2. `sql\stored-procedures\usp_DocumentNumberGenerator.sql`
   3. `sql\views\vw_Dashboard.sql`

   These scripts create the database objects used for document numbering and dashboard.

7. **Start the API.** In this same PowerShell window, trust the local HTTPS development certificate once if prompted, then start the server:

   ```powershell
   dotnet dev-certs https --trust
   dotnet run --project server\src\eListam.API\eListam.API.csproj --launch-profile https
   ```

   The API listens at `https://localhost:7020`. Open `https://localhost:7020/scalar/v1` for the Scalar API reference. On first startup, the API seeds the admin and demo accounts configured above, along with sample products, if it can connect to the database. Leave this terminal running.

8. **Install and start the client.** Open a second PowerShell window at the repository root and run:

   ```powershell
   cd client
   npm ci
   npm run dev -- --host localhost --port 5173 --strictPort
   ```

   The client runs on `http://localhost:5173`.

---

## Progress

- [Ongoing API integration and Front-End improvements](https://github.com/johndave-uganiza/elistam/tree/main-api-integration-feature)

---

## Pages

<p align="center">
  <img width="1897" height="857" alt="image" src="https://github.com/user-attachments/assets/1dbc1423-fa48-4b39-a1ac-4b8df444d656" />
  <br>
  <em>Home</em>
</p>

<p align="center">
  <img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/1321a451-73e3-441d-b6a3-536c6b2f974e" />
  <br>
  <em>Dashboard</em>
</p>

<p align="center">
  <img width="1917" height="861" alt="image" src="https://github.com/user-attachments/assets/1211ab3b-cb68-4830-bbc6-55e2a474bbe7" />
  <br>
  <em>Items</em>
</p>

<p align="center">
  <img width="1917" height="861" alt="image" src="https://github.com/user-attachments/assets/27649fd7-d618-4eef-b998-8ec6d44efe69" />
  <br>
  <em>Products</em>
</p>

<p align="center">
  <img width="1917" height="860" alt="image" src="https://github.com/user-attachments/assets/5e816040-74b8-48a4-9aae-94553fd2ed6a" />
  <br>
  <em>Orders</em>
</p>

<p align="center">
  <img width="1917" height="861" alt="image" src="https://github.com/user-attachments/assets/09e58909-7092-4f6f-8cfe-53abd51ace44" />
  <br>
  <em>Transactions</em>
</p>

---

## Thank You

Thanks for checking out this project! 🙂
