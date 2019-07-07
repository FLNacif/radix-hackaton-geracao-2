using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EngieTempoRealHackathon.Entities
{
    public class Comando
    {

        public int Id { get; set; }

        public string Acao { get; set; }

        public string Destino { get; set; }

        public double Valor { get; set; }

        public DateTime Timestamp { get; set; }
         
        public int Estado { get; set; } // 0 - Sem estado | 1 - Negado | 2 - Cancelado | 3 - Enviado | 4 - Confirmado
    }
}
