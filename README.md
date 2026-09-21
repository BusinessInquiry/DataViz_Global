# Dataviz Global Consulting website

A responsive, light-theme static website for Dataviz Global Consulting.

## Pages

- `index.html` — Home
- `about.html` — About
- `experience.html` — Industry experience
- `services.html` — Services
- `case-studies.html` — Interactive case studies
- `contact.html` — Contact form and company information

## Structure

```text
assets/
├── css/style.css
├── images/
└── js/
    ├── main.js
    └── case-studies.js
```

## Run locally

```bash
python -m http.server 5500
```

Open `http://localhost:5500`.

## Contact form

The form validates in the browser and submits through FormSubmit to `info@datavizglobal.in`. The recipient must confirm FormSubmit's one-time activation email after the first submission before messages are delivered.
