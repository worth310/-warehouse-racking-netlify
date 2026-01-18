$NodeVersion = "20.10.0"
$NodeUrl = "https://nodejs.org/dist/v$NodeVersion/node-v$NodeVersion-x64.msi"
$InstallerPath = "$env:TEMP\node-installer.msi"
$ProjectPath = "C:\Users\worth\warehouse-racking-netlify"

Write-Host "Installing Node.js v$NodeVersion..." -ForegroundColor Cyan

# Download Node.js
Write-Host "Downloading Node.js installer..." -ForegroundColor Yellow
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $NodeUrl -OutFile $InstallerPath

# Install Node.js
Write-Host "⚙️  Installing Node.js..." -ForegroundColor Yellow
Start-Process msiexec.exe -Wait -ArgumentList "/i $InstallerPath /quiet"

# Refresh PATH
$machPath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
$userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$env:Path = "$machPath;$userPath"

# Verify installation
Write-Host "✅ Checking Node.js installation..." -ForegroundColor Green
node --version
npm --version

# Install project dependencies
Write-Host "📚 Installing project dependencies..." -ForegroundColor Cyan
Set-Location $ProjectPath
npm install --legacy-peer-deps --no-fund --no-audit

Write-Host "✅ Setup complete! Starting development server..." -ForegroundColor Green
npm run dev
