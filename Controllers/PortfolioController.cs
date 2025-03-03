using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using dt191g_projekt.Data;
using dt191g_projekt.Models;
using Microsoft.AspNetCore.Authorization;

namespace dt191g_projekt.Controllers
{
    public class PortfolioController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PortfolioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Portfolio
        public async Task<IActionResult> Index()
        {
            return View(await _context.Portfolio.ToListAsync());
        }

        // GET: Portfolio/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var portfolioModel = await _context.Portfolio
                .FirstOrDefaultAsync(m => m.Id == id);
            if (portfolioModel == null)
            {
                return NotFound();
            }

            return View(portfolioModel);
        }

        [Authorize]
        // GET: Portfolio/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Portfolio/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Description,Competence,GithubLink,Url")] PortfolioModel portfolioModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(portfolioModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(portfolioModel);
        }

        [Authorize]
        // GET: Portfolio/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var portfolioModel = await _context.Portfolio.FindAsync(id);
            if (portfolioModel == null)
            {
                return NotFound();
            }
            return View(portfolioModel);
        }

        // POST: Portfolio/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Competence,GithubLink,Url")] PortfolioModel portfolioModel)
        {
            if (id != portfolioModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(portfolioModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PortfolioModelExists(portfolioModel.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(portfolioModel);
        }

        // GET: Portfolio/Delete/5
        [Authorize]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var portfolioModel = await _context.Portfolio
                .FirstOrDefaultAsync(m => m.Id == id);
            if (portfolioModel == null)
            {
                return NotFound();
            }

            return View(portfolioModel);
        }

        // POST: Portfolio/Delete/5
        [Authorize]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var portfolioModel = await _context.Portfolio.FindAsync(id);
            if (portfolioModel != null)
            {
                _context.Portfolio.Remove(portfolioModel);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PortfolioModelExists(int id)
        {
            return _context.Portfolio.Any(e => e.Id == id);
        }
    }
}
