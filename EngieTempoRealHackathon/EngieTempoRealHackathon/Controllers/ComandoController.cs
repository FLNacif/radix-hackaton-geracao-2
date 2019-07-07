using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EngieTempoRealHackathon.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EngieTempoRealHackathon.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ComandoController : ControllerBase
    {
        EngieContext _engieContext;
        public ComandoController(EngieContext engieContext)
        {
            _engieContext = engieContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Comando>> All()
        {
            return _engieContext.Comandos.ToList();
        }

        [HttpGet("{usina}")]
        public ActionResult<IEnumerable<Comando>> FromUsina(string usina)
        {
            return _engieContext.Comandos.Where(x => x.Destino.ToLower().Contains(usina.ToLower()) && (x.Estado == 1 || x.Estado == 2 || x.Estado == 3)).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Comando> Get(int id)
        {
            return _engieContext.Comandos.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public void Adicionar([FromBody] Comando Comando)
        {
            _engieContext.Comandos.Add(Comando);
            _engieContext.Entry(Comando).State = EntityState.Added;

            _engieContext.SaveChanges();
        }

        [HttpPost]
        public void Atualizar([FromBody] Comando Comando)
        {
            _engieContext.Update(Comando);
            _engieContext.Entry(Comando).State = EntityState.Modified;

            _engieContext.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Excluir(int id)
        {
            var comando = _engieContext.Comandos.FirstOrDefault(x => x.Id == id);
            _engieContext.Remove(comando);
            _engieContext.Entry(comando).State = EntityState.Deleted;

            _engieContext.SaveChanges();
        }
    }
}
