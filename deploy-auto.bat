@echo off
REM Warehouse Racking System - Automated Deployment Helper
REM This script automates the deployment process

setlocal enabledelayedexpansion

color 0A
cls

echo.
echo ============================================================
echo   WAREHOUSE RACKING SYSTEM - AUTOMATED DEPLOYMENT
echo ============================================================
echo.
echo This script will help you deploy to the internet.
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Go to: https://git-scm.com/download/win
    echo 2. Download and run the installer
    echo 3. Keep default settings, click Next
    echo 4. Restart your computer
    echo 5. Run this script again
    echo.
    pause
    exit /b 1
)

echo ✓ Git is installed
echo.

REM Check if already a git repo
if exist ".git" (
    echo ✓ Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    echo ✓ Git initialized
)

echo.
echo ============================================================
echo   STEP 1: Add all files to Git
echo ============================================================
echo.

git add .
echo ✓ All files added

echo.
echo ============================================================
echo   STEP 2: Create initial commit
echo ============================================================
echo.

git commit -m "Initial commit - Warehouse Racking System" -q
if errorlevel 1 (
    echo Note: Files may already be committed
) else (
    echo ✓ Commit created
)

echo.
echo ============================================================
echo   STEP 3: Manual Setup Required
echo ============================================================
echo.
echo I've prepared your code for deployment, but you need to:
echo.
echo 1. CREATE GITHUB ACCOUNT (if you don't have one):
echo    Go to: https://github.com/signup
echo    Sign up with your email
echo.
echo 2. CREATE GITHUB REPOSITORY:
echo    Go to: https://github.com/new
echo    Repository name: warehouse-racking-netlify
echo    Choose "Public"
echo    Click "Create repository"
echo    COPY THE URL (looks like: https://github.com/YOUR_NAME/warehouse-racking-netlify.git)
echo.
echo 3. COME BACK HERE AND RUN:
echo    git remote add origin [PASTE_YOUR_URL]
echo    git push -u origin main
echo.
echo 4. CREATE NETLIFY ACCOUNT:
echo    Go to: https://app.netlify.com
echo    Sign up with GitHub
echo.
echo 5. DEPLOY ON NETLIFY:
echo    Click "New site from Git"
echo    Select your repository
echo    Click "Deploy"
echo.
echo ============================================================
echo.

set /p GITHUB_URL="Paste your GitHub repository URL here (or press Enter to skip): "

if not "!GITHUB_URL!"=="" (
    echo.
    echo Adding remote and pushing code...
    git branch -M main 2>nul
    git remote remove origin 2>nul
    git remote add origin !GITHUB_URL!
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to push to GitHub
        echo This usually means the URL is incorrect or GitHub credentials aren't set up
        echo Try again with the correct URL
    ) else (
        echo.
        echo ✓ Code pushed to GitHub successfully!
        echo.
        echo Next: Deploy on Netlify at https://app.netlify.com
    )
) else (
    echo.
    echo Skipped GitHub push
    echo You can run this anytime to push your code
)

echo.
pause
