using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using GenericRepository.Data.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Minera.Data;
using Minera.Data.Entities;
using Minera.Data.Interfaces;
using Minera.Data.Repository;
using Minera.Extensions;
using Minera.Services;
namespace Minera
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration["ConnectionStrings:DefaultConnection"];

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            }
            );

            services.AddDbContext<MineraDbContext>(options =>

                options.UseSqlServer(connectionString), ServiceLifetime.Transient
            );

            services.AddMvc(option => option.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            // services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddAutoMapper(typeof(Startup));

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IInsumoRepository, InsumoRepository>();
            services.AddScoped<IManutencaoRepository, ManutencaoRepository>();

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUsuarioService>();
                        int userId = 0;
                        int.TryParse(context.Principal.Identity.Name, out userId);

                        var user = userService.GetById(userId);

                        if (user == null)
                        {
                            // return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                // c.SwaggerDoc("v1", new OpenApiInfo { Title = "Minera API", Version = "v1" });

                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Minera API",
                    Description = "API Minera - Projeto TCC do curso de Arquitetura de Sistemas Distribuídos",
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "Token de Autorização JWT utilizado no cabeçalho da requisição com o esquema \"Bearer\". Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });

                c.EnableAnnotations();
            });

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,  ILoggerFactory loggerFactory, MineraDbContext dbContext)
        {
            app.UseStaticFiles(new StaticFileOptions
            {
                ServeUnknownFileTypes = true,
                DefaultContentType = "image/png"
            });

            loggerFactory.AddFile(Configuration.GetSection("Logging"));

             // InitializeDb(dbContext).Wait();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Minera API v1");
                c.RoutePrefix = string.Empty;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.ConfigureCustomExceptionMiddleware();
            app.UseHttpsRedirection();

            app.UseMvc();
        }
        private async Task InitializeDb(MineraDbContext dbContext)
        {
            // IOptions<AppSettings> options = Options.Create(appSettings);

            dbContext.Database.EnsureCreated();

            // RelationalDatabaseCreator databaseCreator = (RelationalDatabaseCreator) dbContext.Database.GetService<IDatabaseCreator>();
            // databaseCreator.CreateTables();

            var userRepository = new UsuarioRepository(dbContext);

            var adminUser = await userRepository.GetUserByUsername("admin");

            if (adminUser == null)
            {
                // Create admin user
                string admin_password = "admin";

                byte[] admin_passwordHash, admin_passwordSalt;

                UsuarioService.CreatePasswordHash(admin_password, out admin_passwordHash, out admin_passwordSalt);

                await userRepository.Create(new Usuario()
                {
                    nome = "Administrador",
                    papel = "admin",
                    username = "admin",
                    password_hash = admin_passwordHash,
                    password_salt = admin_passwordSalt
                });

                // Create automation user

                string client_password = "client";

                byte[] client_passwordHash, client_passwordSalt;

                UsuarioService.CreatePasswordHash(client_password, out client_passwordHash, out client_passwordSalt);

                await userRepository.Create(new Usuario()
                {
                    nome = "Cliente Automação",
                    papel = "client",
                    username = "client",
                    password_hash = client_passwordHash,
                    password_salt = client_passwordSalt
                });
            }
        }
    }
}
