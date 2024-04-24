chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "modifyText") {
      // Access the clipboard content
      navigator.clipboard.readText().then(originalText => {
        let modifiedText;
  
        // Choose your desired text modification logic:
        switch (request.modificationType) {
          case "uppercase":
            modifiedText = originalText.toUpperCase();
            break;
          case "lowercase":
            modifiedText = originalText.toLowerCase();
            break;
          // Add other cases for different modifications (e.g., title case, etc.)
          default:
            modifiedText = originalText.toUpperCase();; // No modification
        }
  
        // Replace the clipboard content with the modified text
        navigator.clipboard.writeText(modifiedText);
      });
    }
  });
  
  chrome.tabs.onSelectionChanged.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.selectionText) {
      // If using a popup, send a message requesting modification type:
      if (chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: "getSelectionType" });
      } else {
        // Otherwise, assume uppercase modification (adjust as needed):
        chrome.runtime.sendMessage({ action: "modifyText", modificationType: "uppercase" });
      }
    }
  });
  