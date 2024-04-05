using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        [HttpGet]

        public IEnumerable GetStrings()
        {
            return new string[] { "surat", "Ahemdabad" };
        }
    }
}
