﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Inlook_Core.Models
{
    public class UpdateGroupModel
    {
        [Required]
        public string Id { get; set; }
        [MinLength(3, ErrorMessage = "Group name must contain at least 3 characters")]
        [MaxLength(40, ErrorMessage = "Group name must be equal to or less than 40 characters")]
        public string Name { get; set; }
        [MinLength(1)]
        public string[] Users { get; set; }
    }
}
