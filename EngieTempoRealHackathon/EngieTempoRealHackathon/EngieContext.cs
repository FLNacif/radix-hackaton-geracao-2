using EngieTempoRealHackathon.Entities;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EngieTempoRealHackathon
{
    public class EngieContext : DbContext
    {
        public EngieContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Audio> Audios { get; set; }
        public DbSet<Comando> Comandos { get; set; }

    }
}
