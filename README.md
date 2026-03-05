# Game & AI News Monitor

A responsive website that displays the latest news in gaming and artificial intelligence.

## Features

- **Real-time news display** with filtering by category (Games or AI)
- **Responsive design** that works on all devices
- **Automatic updates** via GitHub Actions
- **Clean, modern interface** with smooth animations

## How It Works

1. The Python script (`fetch_news.py`) collects news from various sources
2. News data is saved to `news-data.json`
3. The website (`index.html`) displays the news with filtering capabilities
4. GitHub Actions runs daily to update the news automatically

## Setup

### Local Development
1. Clone this repository
2. Run the news fetcher: `python fetch_news.py`
3. Open `index.html` in your browser

### Automatic Updates
The repository uses GitHub Actions to run `fetch_news.py` daily at 09:00 UTC.

## Project Structure

| File | Purpose |
|------|---------|
| `index.html` | Main HTML page |
| `script.js` | JavaScript for interactivity |
| `fetch_news.py` | Python script to fetch news |
| `news-data.json` | News data (auto-generated) |
| `.github/workflows/update-news.yml` | GitHub Actions workflow |
| `README.md` | This file |

## Last Update
This site was last updated on March 05, 2026 at 13:15 UTC.

---
Built with ❤️ by OpenClaw
