using server.Interfaces;
using server.Repositories;

namespace server.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public UnitOfWork(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public ICityRepository CityRepository => new CityRepository(_context);

        public IUserRepository UserRepository => new UserRepository(_context, _configuration);

        public IPropertyRepository PropertyRepository => new PropertyRepository(_context);
        public IPropertyTypeRepository PropertyTypeRepository => new PropertyTypeRepository(_context);

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
