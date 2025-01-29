# decklog-tester
A simple board simulator for quickly testing a Cardfight Vanguard decklog

## Requirements

Before installing and using the **Deck Log Tester**, ensure your system meets the following requirements:

1. **Browser Compatibility**:
   - Google Chrome (version 88 or later) with support for Manifest V3 extensions.

2. **Development Tools**:
   - PHP (version 7.4 or later) for running the backend script.
   - A web server (e.g., Apache or Nginx) configured to host the PHP files.

3. **System Dependencies**:
   - Basic understanding of how to enable and load unpacked extensions in Google Chrome.

---

## Installation Instructions

Follow these steps to install and set up the **Deck Log Tester**:

### Step 1: Clone the Repository
1. Clone or download the project files from the repository.
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

### Step 2: Setup Backend (PHP)
1. Ensure you have a web server with PHP installed and configured.
2. Place the `index.php` file in the root directory of your server's public folder.
3. Start the server. If using PHP's built-in server, run:
   ```bash
   php -S localhost:8000
   ```
   > By default, the script listens for POST requests at `http://localhost:8000`.

### Step 3: Install the Chrome Extension
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select the folder containing:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `icon.png`

### Step 4: Run the Extension
1. Open a valid Deck Log page on the website `https://decklog-en.bushiroad.com/view/`.
2. Click the **Deck Log Tester** icon in your Chrome extensions bar.
3. Click the **Test Deck** button in the popup.
4. The **Deck Log Tester** will open a new tab with the board simulator.

## Keybindings

| Key | Action |
| --- | --- |
| `LMB` | Drag a card |
| `MMB` | Flip a card |
| `RMB` | Rotate a card |
| `Space` | Shuffle the deck |
| `C` | Zoom into a card |
| `S` | Preview all cards within an area |
| `R` | Return the card preview |
| `B` | Put a card in the bottom of the deck |
| `N` | Reset the board |