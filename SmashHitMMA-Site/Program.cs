using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// 1) Serve index.html automatically if no path is given
app.UseDefaultFiles(new DefaultFilesOptions
{
    DefaultFileNames = { "index.html" } // looks in wwwroot/
});

// 2) Serve files from wwwroot (css/js/images/html)
var contentTypeProvider = new FileExtensionContentTypeProvider();
// allow a couple of uncommon extensions if needed
contentTypeProvider.Mappings[".webmanifest"] = "application/manifest+json";

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = contentTypeProvider,
    ServeUnknownFileTypes = true
});

// 3) Optional: if a route isn't found, fall back to Home
app.MapFallbackToFile("index.html");

app.Run();
