# 🎨 Suprada Wellness — Official Brand Color Palette Reference

This document serves as the authoritative color reference guide for the **Suprada Wellness** design system, created directly from the official brand color swatches.

---

## 🏛️ Primary Brand Palette

| Color Name | Swatch | Hex Code | RGB | HSL | Primary Usage / Design Intent |
|---|---|---|---|---|---|
| **Wine** | 🍷 | `#5E2735` | `rgb(94, 39, 53)` | `hsl(345, 41%, 26%)` | Main brand headings (`h1`, `h2`), primary action buttons, dark accents, and regal brand identity. |
| **Harvest Gold** | 🌾 | `#EAA936` | `rgb(234, 169, 54)` | `hsl(38, 80%, 56%)` | Gold leaf accents, highlight badges, star icons, mandala patterns, and interactive hover states. |
| **Tan** | 🏜️ | `#E6D3C0` | `rgb(230, 211, 192)` | `hsl(30, 44%, 83%)` | Card background fills, subtle borders, warm desert sand tones, and soft warm containers. |
| **Sage** | 🌿 | `#C2BA90` | `rgb(194, 186, 144)` | `hsl(50, 29%, 66%)` | Herbal retreat tags, natural wellness icons, botanical highlights, and calming herbal accents. |
| **Redwood** | 🪵 | `#B85645` | `rgb(184, 86, 69)` | `hsl(9, 45%, 50%)` | Subheadings, section category badges, terracotta accents, and secondary highlight text. |
| **Raisin Black** | 🖤 | `#282625` | `rgb(40, 38, 37)` | `hsl(20, 4%, 15%)` | Primary readable body text, high-contrast dark backdrops, and hero overlay gradients. |

---

## 🕊️ Luxury Neutrals Palette

| Color Name | Swatch | Hex Code | RGB | HSL | Primary Usage / Design Intent |
|---|---|---|---|---|---|
| **Isabelline** | 🐚 | `#F2ECE4` | `rgb(242, 236, 228)` | `hsl(34, 32%, 92%)` | Soft silk clay off-white. Default primary background color across the entire website. |
| **Tea Green** | 🍵 | `#D3DFCC` | `rgb(211, 223, 204)` | `hsl(98, 25%, 84%)` | Sage glaze tint. Used for wellness feature cards, detox/naturopathy badges, and calming light fills. |
| **Antique White** | 📜 | `#FAF0E6` | `rgb(250, 240, 230)` | `hsl(30, 67%, 94%)` | Creamy warm cotton paper. Used for contrasting section backgrounds and light modal card containers. |
| **Platinum** | 🌫️ | `#E7EDE8` | `rgb(231, 237, 232)` | `hsl(130, 15%, 92%)` | Cool mist pale gray-green. Used for subtle card borders, clean divider lines, and light neutral cards. |
| **Pale Dogwood** | 🌸 | `#F4DACA` | `rgb(244, 218, 202)` | `hsl(23, 62%, 87%)` | Soft warm rose blush. Used for delicate card highlights and warm blush container fills. |

---

## 💻 CSS Custom Properties (`src/index.css`)

```css
:root {
  /* Primary Brand Palette */
  --wine: #5E2735;
  --harvest-gold: #EAA936;
  --tan: #E6D3C0;
  --sage: #C2BA90;
  --redwood: #B85645;
  --raisin-black: #282625;

  /* Luxury Neutrals */
  --isabelline: #F2ECE4;
  --tea-green: #D3DFCC;
  --antique-white: #FAF0E6;
  --platinum: #E7EDE8;
  --pale-dogwood: #F4DACA;
}
```

---

## 📦 JavaScript Token Import Usage (`src/styles/colorPalette.js`)

```javascript
import { PRIMARY_PALETTE, NEUTRALS_PALETTE, COLOR_TOKENS } from '../styles/colorPalette';

// Example inline styling usage:
const cardStyle = {
  backgroundColor: NEUTRALS_PALETTE.antiqueWhite,
  borderColor: PRIMARY_PALETTE.wine,
  color: PRIMARY_PALETTE.raisinBlack
};
```
