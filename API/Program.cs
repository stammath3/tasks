using API.Extensions;
using Serilog;
using Prometheus;


var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console(new Serilog.Formatting.Compact.RenderedCompactJsonFormatter()) // JSON output
    .WriteTo.File(path: @"C:\Logs\log-.txt", rollingInterval: RollingInterval.Day, formatter: new Serilog.Formatting.Compact.RenderedCompactJsonFormatter())
    .CreateLogger();

// Retrieve the connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       Environment.GetEnvironmentVariable("SQLCONNSTR_DefaultConnection");

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);

builder.Host.UseSerilog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add Prometheus metrics endpoint
app.UseMetricServer(); // Expose metrics at /metrics
app.UseSerilogRequestLogging();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200", "https://tasks-fullstack-app-a3fnb9f6cyf2cuca.northeurope-01.azurewebsites.net"));

app.UseDefaultFiles();
app.UseStaticFiles();

// Add a test route that logs structured data
app.MapGet("/", () =>
{
    Log.Information("This is a log message with structured data. Example: {OrderId}, {UserId}", 123, "user1");
    return "Hello, Serilog with Prometheus!";
});

app.MapControllers();

app.Run();
