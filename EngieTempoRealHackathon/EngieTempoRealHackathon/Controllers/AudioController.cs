using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EngieTempoRealHackathon.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EngieTempoRealHackathon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudioController : ControllerBase
    {
        EngieContext _engieContext;
        public AudioController(EngieContext engieContext)
        {
            _engieContext = engieContext;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Audio>> Get()
        {
            return _engieContext.Audios.ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Audio> Get(int id)
        {
            return _engieContext.Audios.FirstOrDefault(x => x.Id == id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Audio audio)
        {
            _engieContext.Audios.Add(audio);
            _engieContext.Entry(audio).State = EntityState.Added;

            _engieContext.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Audio audio)
        {
            _engieContext.Update(audio);
            _engieContext.Entry(audio).State = EntityState.Modified;

            _engieContext.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var audio = _engieContext.Audios.FirstOrDefault(x => x.Id == id);
            _engieContext.Remove(audio);
            _engieContext.Entry(audio).State = EntityState.Deleted;

            _engieContext.SaveChanges();
        }
    }
}
