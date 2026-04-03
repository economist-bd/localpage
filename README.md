# MH Academy – Deployment Guide

## ফাইল লিস্ট
```
index.html      ← মেইন অ্যাপ (এটি আপনার repo-তে রাখুন)
manifest.json   ← PWA manifest
sw.js           ← Service Worker (অফলাইন সাপোর্ট)
icon-192.png    ← অ্যাপ আইকন (192x192) — পরিবর্তন করুন
icon-512.png    ← অ্যাপ আইকন (512x512) — পরিবর্তন করুন
og-image.png    ← Facebook শেয়ার ছবি (1200x630) — তৈরি করুন
```

## GitHub Pages-এ আপলোড করুন
1. সব ফাইল আপনার `localpage` repo-তে push করুন
2. Settings → Pages → Branch: main → Save
3. আপনার সাইট: https://economist-bd.github.io/localpage/

## আইকন পরিবর্তন করতে চাইলে
- 192×192 PNG → `icon-192.png` নামে সেভ করুন
- 512×512 PNG → `icon-512.png` নামে সেভ করুন
- [realfavicongenerator.net](https://realfavicongenerator.net) ব্যবহার করতে পারেন

## Facebook OG Image
- 1200×630 পিক্সেল PNG তৈরি করুন
- `og-image.png` নামে repo-তে রাখুন

## নতুন পেইজ যোগ করতে
`index.html`-এর `PAGES` array-তে নতুন object যোগ করুন:
```js
{
  file: 'new-page.html',
  title: 'নতুন পেইজ',
  desc: 'বিবরণ...',
  icon: '🆕',
  badge: 'New',
  tags: ['ট্যাগ১', 'ট্যাগ২'],
  accent: 'linear-gradient(90deg,#38bdf8,#818cf8)',
  glow: 'rgba(56,189,248,0.08)',
  iconBg: 'linear-gradient(135deg,rgba(56,189,248,0.18),rgba(56,189,248,0.05))',
  iconBorder: 'rgba(56,189,248,0.25)',
  badgeBg: 'rgba(56,189,248,0.12)', badgeColor: '#38bdf8',
  btnFrom: '#38bdf8', btnTo: '#0284c7',
},
```
