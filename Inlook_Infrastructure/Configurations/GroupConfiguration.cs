﻿using Inlook_Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Inlook_Infrastructure.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.HasKey(g => g.Id);
            builder.Property(g => g.Id).HasDefaultValueSql("NEWID()");

            builder.HasOne(g => g.GroupOwner)
                .WithMany(u => u.GroupsOwned)
                .HasForeignKey(g => g.GroupOwnerId);
        }
    }
}