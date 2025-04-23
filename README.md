# Wedding Invitation Website

A beautiful and romantic wedding invitation website for Tâm & Giao's special day.

## Features

- Responsive design that works on all devices
- Multiple themes that change on page reload
- Theme selector for manual theme switching
- Beautiful typography with elegant fonts
- Family information section for bride and groom's families
- Interactive timeline of wedding day schedule
- Photo gallery showcasing the couple
- RSVP form for guest responses
- Countdown timer to the wedding day
- Smooth animations and parallax effects

## How to Use

1. Clone or download this repository
2. Open `index.html` in your browser to view the website locally
3. Customize the content to match your wedding details:
   - Update names, dates, and venue information in `index.html`
   - Replace the photos in the `assets` folder with your own
   - Adjust colors and styling in `styles.css` if desired
   - Modify the countdown date in `script.js`

## Customization

### Colors

The color scheme can be easily changed by modifying the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #d4b08c;
    --secondary-color: #f8f5f1;
    --text-color: #555;
    --dark-color: #333;
    --light-color: #fff;
    --accent-color: #c19e67;
}
```

### Fonts

The website uses the following Google Fonts:
- Great Vibes (for names and headings)
- Cormorant Garamond (for elegant text)
- Montserrat (for body text)

You can change these by updating the Google Fonts link in the `<head>` section of `index.html` and then updating the font-family properties in `styles.css`.

### Images

Replace the images in the assets folder with your own photos. The website uses the following images:
- Header background image (currently using HDS_5942.JPG)
- Gallery images

### Themes

The website features multiple themes that automatically change when the page is reloaded:

1. **Classic Gold** - Elegant gold and cream theme
2. **Garden Green** - Natural green and light theme
3. **Romantic Rose** - Soft pink and rose theme
4. **Ocean Blue** - Calming blue and white theme
5. **Vintage Brown** - Rustic vintage-inspired theme with double borders and sepia effect
6. **Modern Minimal** - Clean minimalist design with monochrome and gold accents

Users can also manually switch between themes using the theme selector at the bottom of the page.

## Deployment

To make this website live:

1. Purchase a domain name (optional)
2. Sign up for web hosting
3. Upload all files to your hosting server
4. Point your domain to the hosting server

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts
- Font Awesome icons 