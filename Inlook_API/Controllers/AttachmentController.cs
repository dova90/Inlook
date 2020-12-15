﻿using Inlook_Core.Interfaces.Services;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Inlook_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "UserPolicy")]
    public class AttachmentController : BaseController
    {
        private readonly IAttachmentService attachmentService;


        public AttachmentController(ILogger<AttachmentController> logger, TelemetryClient telemetryClient,  IAttachmentService attachmentService):base(logger, telemetryClient)
        {
            this.attachmentService = attachmentService;
        }

        [HttpGet("GetFile")]
        public async Task<IActionResult> GetFile(Guid id)
        {
            var file = await attachmentService.GetFile(id);

            if (file == null) return NotFound();

            return File(file.FileStream, file.ContentType);
        }


        [HttpPost("UploadAttachment")]
        public async Task<IActionResult> UploadAttachment(IFormFile file)
        {
            var attachmentModel = await attachmentService.UploadFile(file.OpenReadStream(), file.FileName);
            return new JsonResult(attachmentModel);
        }

        [HttpDelete("DeleteAttachment")]
        public async Task<IActionResult> DeleteAttachment(Guid id)
        {
            await attachmentService.DeleteAttachment(id);
            return NoContent();
        }
    }
}
