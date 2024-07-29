using Asp.Versioning;
using AutoMapper;
using Azure.Core;
using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CodePulse.API.Controllers
{
    // https://localhost:xxxx/api/categories
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public CategoriesController(ICategoryRepository categoryRepository,IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        [MapToApiVersion("1.0")] // Define que este método está na versão 1.0    
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {
            //// Map DTO to Domain Model
            //var category = new Category
            //{
            //    Name = request.Name,
            //    UrlHandle = request.UrlHandle
            //};
            var categoryDomainModel=mapper.Map<Category>(request);

            categoryDomainModel =  await categoryRepository.CreateAsync(categoryDomainModel);

            //// Domain model to DTO
            //var response = new CategoryDto
            //{
            //    Id = category.Id,
            //    Name = category.Name,
            //    UrlHandle = category.UrlHandle
            //};

            var response = mapper.Map<CategoryDto>(categoryDomainModel);

            return Ok(response);
        }

        // GET: https://localhost:7202//api/Categories?query=html&sortBy=name&sortDirection=desc  
        [HttpGet]
        public async Task<IActionResult> GetAllCategories(
            [FromQuery] string? query,
            [FromQuery] string? sortBy,
            [FromQuery] string? sortDirection,
            [FromQuery] int? pageNumber,
            [FromQuery] int? pageSize)
        {
                var caterogies = await categoryRepository
                .GetAllAsync(query, sortBy, sortDirection, pageNumber, pageSize);

            // Map Domain model to DTO

            //var response = new List<CategoryDto>();
            //foreach (var category in caterogies)
            //{
            //    response.Add(new CategoryDto
            //    {
            //        Id = category.Id,
            //        Name = category.Name,
            //        UrlHandle = category.UrlHandle
            //    });
            //}

            var response = mapper.Map<List<CategoryDto>>(caterogies);

            return Ok(response);
        }
        [HttpGet]
        [MapToApiVersion("2.0")] // Define que este método está na versão 2.0    
        public async Task<IActionResult> GetAllCategoriesV2(
           [FromQuery] string? query,
           [FromQuery] string? sortBy,
           [FromQuery] string? sortDirection,
           [FromQuery] int? pageNumber,
           [FromQuery] int? pageSize)
        {

            var caterogies = await categoryRepository
                .GetAllAsync(query, sortBy, sortDirection, pageNumber, pageSize);

            // Map Domain model to DTO

            var response = new List<CategoryDto>();
            foreach (var category in caterogies)
            {
                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name + "No Automapper - via V2",
                    UrlHandle = category.UrlHandle
                });
            }

            return Ok(response);
        }

        // GET: https://localhost:7202//api/categories/{id}
        [HttpGet]
        [MapToApiVersion("1.0")] // Define que este método está na versão 1.0    
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var existingCategory = await categoryRepository.GetById(id);

            if (existingCategory is null)
            {
                return NotFound();
            }

            //var response = new CategoryDto
            //{
            //    Id = existingCategory.Id,
            //    Name = existingCategory.Name,
            //    UrlHandle = existingCategory.UrlHandle
            //};

            var response = mapper.Map<CategoryDto>(existingCategory);

            return Ok(response);
        }

        // PUT: https://localhost:7202//api/categories/{id}
        [HttpPut]
        [MapToApiVersion("1.0")] // Define que este método está na versão 1.0    
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> EditCategory([FromRoute] Guid id, UpdateCategoryRequestDto request)
        {
            // Convert DTO to Domain Model
            //var category = new Category
            //{
            //    Id = id,
            //    Name = request.Name,
            //    UrlHandle = request.UrlHandle
            //};
           
            var categoryDomainModel = mapper.Map<Category>(request);

            categoryDomainModel.Id = id;

            categoryDomainModel = await categoryRepository.UpdateAsync(categoryDomainModel);

            if (categoryDomainModel == null)
            {
                return NotFound();
            }

            // Convert Domain model to DTO
            //var response = new CategoryDto
            //{
            //    Id = category.Id,
            //    Name = category.Name,
            //    UrlHandle = category.UrlHandle
            //};

            var response = mapper.Map<CategoryDto>(categoryDomainModel);

            return Ok(response);
        }


        // DELETE: https://localhost:7202//api/categories/{id}
        [HttpDelete]
        [MapToApiVersion("1.0")] // Define que este método está na versão 1.0    
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {

            var categoryDomainModel = await categoryRepository.DeleteAsync(id);

            if (categoryDomainModel is null)
            {
                return NotFound();
            }

            // Convert Domain model to DTO
            //var response = new CategoryDto
            //{
            //    Id = category.Id,
            //    Name = category.Name,
            //    UrlHandle = category.UrlHandle
            //};
            var response = mapper.Map<CategoryDto>(categoryDomainModel);

            return Ok(response);
        }


        // GET: https://localhost:7202//api/categories/count
        [HttpGet]
        [MapToApiVersion("1.0")] // Define que este método está na versão 1.0    
        [Route("count")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> GetCategoriesTotal()
        {
            var count = await categoryRepository.GetCount();

            return Ok(count);
        }
    }
}