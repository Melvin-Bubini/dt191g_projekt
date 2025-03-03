using Microsoft.AspNetCore.Mvc;
using dt191g_projekt.Models;

namespace dt191g_projekt.Controllers
{
    public class ContactController : Controller
    {
        // Visa kontaktformuläret
        public IActionResult Index()
        {
            return View();
        }

    }
}
