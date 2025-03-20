# Projekt: Portfolio Website

## Beskrivning

Detta är en webbapplikation byggd med ASP.NET Core MVC som fungerar som en personlig portfoliowebbplats. Webbplatsen innehåller flera vyer såsom Home, Contact och Portfolio, där användare kan få information om projekt och kontakta ägaren via ett formulär.

## Teknologier

- Backend: ASP.NET Core MVC

- Frontend: HTML, CSS, JavaScript, Bootstrap

- E-posthantering: EmailJS

- Animationer: JavaScript

## Funktionalitet

- Startsida (Home View): Introduktion och kort beskrivning av portfolion.

- Kontakt (Contact View): Formulär för att skicka meddelanden med validering och EmailJS-integration.

- Portfolio (Portfolio View): Lista över tidigare projekt med beskrivningar.

- Interaktiva kort: Animationer som ger en flytande effekt vid hover.

- Nedladdning av CV: En knapp för att ladda ner CV i PDF-format.

## Installation och Körning

- Klona detta repository:

- -Navigera till projektmappen:

- Installera nödvändiga beroenden:

- Starta applikationen:

- Öppna webbläsaren och gå till http://localhost:5000.

## Mappstruktur

dt191g_projekt/
│-- Controllers/
│   ├── HomeController.cs
│   ├── ContactController.cs
│   ├── PortfolioController.cs
│-- Views/
│   ├── Home/
│   │   ├── Index.cshtml
│   ├── Contact/
│   │   ├── Index.cshtml
│   ├── Portfolio/
│   │   ├── Index.cshtml
│-- wwwroot/
│   ├── css/
│   ├── js/
│-- Models/
│-- Program.cs
│-- Startup.cs
│-- README.md

## Användning

- Besök Home-sidan för att se en introduktion.

- Navigera till Portfolio för att se tidigare projekt.

- Gå till Contact-sidan för att skicka ett meddelande.