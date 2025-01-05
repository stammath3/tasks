using API.Extensions;
var builder = WebApplication.CreateBuilder(args);

// Retrieve the connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       Environment.GetEnvironmentVariable("SQLCONNSTR_DefaultConnection");

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200", "https://tasks-fullstack-app-a3fnb9f6cyf2cuca.northeurope-01.azurewebsites.net"));

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();
