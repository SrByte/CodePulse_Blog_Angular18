using AutoMapper;
using CodePulse.API.Models.DTO;
using CodePulse.API.Models.Domain;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
namespace CodePulse.API.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            #region Category
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CreateCategoryRequestDto, Category>().ReverseMap();
            CreateMap<UpdateCategoryRequestDto, Category>().ReverseMap();
            #endregion

        }
    }
}