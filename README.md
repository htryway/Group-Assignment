# Next Level Gaming & Esports Arena

Website and mobile app project for **Next Level Gaming & Esports Arena**, a gaming and esports venue in Sandton, Johannesburg. Built for The Independent Institute of Education (IIE), module **XHAW5112**, Task 3.

**Live website:** https://htryway.github.io/Group-Assignment/index.html

The website is plain HTML, CSS and JavaScript. There is no build step and nothing to install.

## Team

| Name | Student number | Role | GitHub | Main tasks |
|---|---|---|---|---|
| Miehleketo Hlayiseko Magagula | ST10443758 | Team Leader | [htryway](https://github.com/htryway) | Wireframes, colour palette, repository setup |
| Karabo Mashishi | ST10509295 | Quality Checker | [versagedoctor15-design](https://github.com/versagedoctor15-design) | Website design |
| Tshepang Masoka | ST10525380 | Team Secretary | [Cozy-mike](https://github.com/Cozy-mike) | App design |

## Project links

| Item | Link |
|---|---|
| Published website | https://htryway.github.io/Group-Assignment/index.html |
| Repository | https://github.com/htryway/Group-Assignment |
| Website wireframes (Figma) | https://www.figma.com/design/WJyq1ye6wGnOsYTl5bgxM2/Untitled?node-id=4-350&p=f&t=VnYU4tG8yfrFH7DA-0 |
| Mobile app wireframes (Figma) | https://www.figma.com/design/WJyq1ye6wGnOsYTl5bgxM2/Untitled?node-id=4-351&p=f&t=VnYU4tG8yfrFH7DA-0 |
| Task 2 website demo video (YouTube) | https://youtube.com/shorts/dXcxQddaGxs |
| Task 2 app demo video, part 1 (YouTube) | https://youtube.com/shorts/PaDxjMd6fPI |
| Task 2 app demo video, part 2 (YouTube) | https://youtube.com/shorts/YRog0ehnjOk |
| Individual presentation video, Miehleketo (YouTube) | https://youtube.com/shorts/9M7a4eaIOsk |
| Group presentation video (YouTube) | _To be added_ |
| Presentation | `Next_Level_Gaming_Presentation.pptx` (in this repository) |

## What the website does

- Shows the four packages (Ultimate Gamer Pass, VIP Gaming Experience, Esports Training Package, Birthday Party Package) and three experiences (Virtual Reality, Racing Simulator, Escape Room) with prices.
- Calculates a quote live: quantity steppers, a multi-booking discount, 15% VAT and a printable invoice.
- Takes the customer through **Calculate Fees → Booking Summary → Booking Confirmation**, with a booking reference and an add-to-calendar file.
- Works on desktop and phone. The navigation collapses into a menu on small screens.

### Task 3 requirements

| Requirement | Where it is |
|---|---|
| Drop-down menu | The **Packages** and **Experiences** items in the navigation list every item with its price. They open on hover, click, tap or keyboard, and close with Esc or an outside click. See `js/components.js` and the "Drop-down menus" section of `css/style.css`. |
| Error handling | The contact form and the fee form validate every field and show a message under the field that is wrong. The booking summary checks the date and time slot. Pages that need a booking show a friendly message if none exists, and browser-storage failures are caught. See `js/contact.js`, `js/fees.js`, `js/booking.js`. |
| Table | The invoice on `fees.html` and the itemised quote on `booking-summary.html` are HTML tables. |
| Published | GitHub Pages (link above). |

### Pricing rules

| Bookings | Discount |
|---|---|
| 1 | 0% |
| 2 | 5% |
| 3 | 10% |
| 4 or more | 15% |

VAT of 15% is added after the discount. Every package is R1,500 and every experience is R750.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `overview.html` | Packages catalogue |
| `experiences.html` | Individual experiences |
| `package-ultimate-gamer-pass.html` | Individual package page (static) |
| `package.html?id=...` | One template that renders every other package or experience |
| `fees.html` | Calculate Fees |
| `booking-summary.html` | Booking Summary (date and time slot) |
| `confirmation.html` | Booking Confirmation |
| `contact.html` | Contact Us |

## How it is built

```
.
├── index.html, about.html, overview.html, experiences.html,
│   package*.html, fees.html, booking-summary.html,
│   confirmation.html, contact.html
├── css/style.css        all styling, colour tokens and responsive rules
├── js/
│   ├── data.js          single source of truth: prices, packages, discounts, contact details
│   ├── components.js    builds the logo, navigation (with drop-downs) and footer on every page
│   ├── packages.js      renders package and experience pages and cards
│   ├── fees.js          fee calculator, validation and invoice
│   ├── booking.js       booking summary and confirmation
│   └── contact.js       contact form validation
└── assets/
    ├── logo/            badge, favicon and full lock-up (SVG)
    └── icons/           social and contact icons (SVG)
```

Because every price and discount lives in `js/data.js`, no two pages can disagree. The navigation and footer are written once in `js/components.js` and added to every page.

A booking moves between pages using the browser's `sessionStorage`. It is kept only while the tab is open and nothing is sent to a server.

## Running it locally

Open `index.html` in a browser. To behave exactly like GitHub Pages, serve the folder instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Design

- **Palette:** charcoal `#111018`, cyan `#00B8D9`, purple `#6B2FBF`, magenta `#D6249F`, off-white `#F5F6FA`. Magenta is kept for calls to action such as Book Now.
- **Logo:** a hexagon badge with a double upward chevron ("level up"), in the cyan-to-magenta gradient.
- **Wireframes:** 12 website pages and 12 mobile app screens, linked above.

## Mobile app

The mobile app is designed as 12 screens in Figma: splash, onboarding, login, home, packages, package detail, experiences, calculate fees, booking summary, confirmation, profile and contact. Its demo videos are linked above.

## Known limitations

- Bookings are not stored or emailed: there is no back end, so the confirmation is shown on screen only.
- The social media links in the footer are placeholders.
- The booking reference is generated in the browser.

## Working in the repository

Each page or feature is built on its own branch and merged into `main` through a pull request, so every member's commits are visible.

```bash
git checkout -b feature/my-change
git add .
git commit -m "Describe the change"
git push -u origin feature/my-change
```

## Academic note

This project was produced for IIE module XHAW5112 and is not a real business website. The prices and contact details come from the module scenario.
