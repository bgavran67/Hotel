using BACKEND.Data;
using BACKEND.Mapping;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

// dodavanje kontaksta baze podataka - dependency injection
builder.Services.AddDbContext<EdunovaContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("EdunovaContext"));
});


// Svi se od svuda na sve moguce nacine mogu spojiti na naš API
// èitati https://code-maze.com/aspnetcore-webapi-best-practices/

//  https://levelup.gitconnected.com/cors-finally-explained-simply-ae42b52a70a3
builder.Services.AddCors(o => {

    o.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// automapper
builder.Services.AddAutoMapper(cfg => {
    cfg.AddProfile<HotelMappingProfile>();
});


var app = builder.Build();
 
app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

// Configure the HTTP request pipeline.
app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI(o => {
    o.EnableTryItOutByDefault();
    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
});


app.MapControllers();




// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();