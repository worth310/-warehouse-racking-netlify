@echo off
REM Quick deployment helper script for Windows

echo.
echo ========================================
echo Warehouse Racking System - Deployment
echo ========================================
echo.

echo This script will help you deploy to Netlify.
echo.
echo Prerequisites:
echo - Git installed (https://git-scm.com/download/win)
echo - GitHub account (https://github.com/signup)
echo - Node.js already installed ✓
echo.

pause

echo.
echo Step 1: Check if Git is installed...
git --version
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please download and install Git from: https://git-scm.com/download/win
    echo Then restart this script.
    pause
    exit /b 1
)

echo Git is installed ✓
echo.

echo Step 2: Initialize Git repository...
git init
git add .
git commit -m "Initial commit - Warehouse Racking System"

echo.
echo Step 3: Create repository on GitHub
echo.
echo 1. Go to https://github.com/new
echo 2. Create repository: warehouse-racking-netlify
echo 3. Copy the repository URL from GitHub
echo.

set /p GITHUB_URL="Paste your GitHub repository URL here: "

if "%GITHUB_URL%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b 1
)

echo Adding remote and pushing code...
git branch -M main
git remote add origin %GITHUB_URL%
git push -u origin main

echo.
echo ✓ Code pushed to GitHub!
echo.
echo Step 4: Deploy to Netlify
echo.
echo 1. Go to https://app.netlify.com
echo 2. Sign up with GitHub
echo 3. Click "New site from Git"
echo 4. Select warehouse-racking-netlify
echo 5. Build command: npm run build
echo 6. Publish directory: dist
echo 7. Click Deploy!
echo.

pause

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your app will be available at:
echo https://your-site-name.netlify.app
echo.
echo Next steps:
echo 1. Wait for Netlify to build (usually 1-2 minutes)
echo 2. Test all features
echo 3. Add custom domain (optional)
echo 4. Share your public URL!
echo.

pause
