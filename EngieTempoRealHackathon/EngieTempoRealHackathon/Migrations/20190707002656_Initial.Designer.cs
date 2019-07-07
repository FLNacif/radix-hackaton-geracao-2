﻿// <auto-generated />
using System;
using EngieTempoRealHackathon;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EngieTempoRealHackathon.Migrations
{
    [DbContext(typeof(EngieContext))]
    [Migration("20190707002656_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("EngieTempoRealHackathon.Entities.Audio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Timestamp");

                    b.Property<string>("Uri");

                    b.HasKey("Id");

                    b.ToTable("Audios");
                });

            modelBuilder.Entity("EngieTempoRealHackathon.Entities.Comando", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Acao");

                    b.Property<string>("Destino");

                    b.Property<int>("Estado");

                    b.Property<DateTime>("Timestamp");

                    b.Property<double>("Valor");

                    b.HasKey("Id");

                    b.ToTable("Comandos");
                });
#pragma warning restore 612, 618
        }
    }
}
