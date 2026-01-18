@echo off
REM One-click Git installer

echo.
echo ============================================================
echo   INSTALLING GIT FOR WINDOWS
echo ============================================================
echo.
echo Downloading Git installer...
echo.

REM Download Git installer
powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe', '%TEMP%\GitInstaller.exe')"

if exist "%TEMP%\GitInstaller.exe" (
    echo ✓ Git installer downloaded
    echo.
    echo Installing Git (this may take a minute)...
    echo.
    
    REM Run installer silently
    "%TEMP%\GitInstaller.exe" /SILENT /NORESTART
    
    echo.
    echo ✓ Git installation complete!
    echo.
    echo You must restart your computer for Git to be available.
    echo.
    echo After restart, run: deploy-auto.bat
    echo.
) else (
    echo ERROR: Failed to download Git
    echo.
    echo Please manually download from:
    echo https://git-scm.com/download/win
    echo.
)

pause
