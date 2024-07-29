using Asp.Versioning.ApiExplorer;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
{
    private readonly IApiVersionDescriptionProvider _provider;

    public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider)
    {
        _provider = provider;
    }
    public void Configure(SwaggerGenOptions options)
    {
        foreach (var description in _provider.ApiVersionDescriptions)
        {
            // Crie informações para a versão da API com base na descrição.
            var apiInfo = CreateInfoForApiVersion(description);

            // Adicione o SwaggerDoc com o grupo de nome e as informações da API.
            options.SwaggerDoc(description.GroupName, apiInfo);
        }
    }

    private OpenApiInfo CreateInfoForApiVersion(ApiVersionDescription description)
    {
        // Aqui, você pode personalizar o título e a versão da API conforme necessário.
        return new OpenApiInfo
        {
            Title = "CodePulse API",
            Version = $"Versão {description.ApiVersion.ToString()}", // Ajusta a versão da API conforme a descrição
            Description = "API desenvolvida em AspNetCore Web API",
            // Você pode adicionar mais informações como Contact, License, etc.
        };
    }

}

