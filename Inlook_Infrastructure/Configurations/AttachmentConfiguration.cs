﻿using System;
using System.Collections.Generic;
using System.Text;
using Inlook_Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Inlook_Infrastructure.Configurations
{
    public class AttachmentConfiguration : IEntityTypeConfiguration<Attachment>
    {
        public void Configure(EntityTypeBuilder<Attachment> builder)
        {
            builder.HasKey(m => m.Id);
            builder.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder.HasOne(a => a.Mail)
                .WithMany(m => m.Attachments)
                .HasForeignKey(a => a.MailId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(a => a.ClientFileName).HasMaxLength(255);
        }
    }
}
