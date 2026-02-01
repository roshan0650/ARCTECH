# Secure File Locker - PowerShell Startup Script
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

Write-Host "Activating Virtual Environment..." -ForegroundColor Cyan
try {
    & .\\.venv\\Scripts\\Activate.ps1
} catch {
    Write-Host "Error: Failed to activate virtual environment" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting Secure File Locker..." -ForegroundColor Green
.venv\Scripts\python.exe main.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "
Error: Application failed to start" -ForegroundColor Red
    Write-Host "Try running manually: .venv\Scripts\python.exe main.py" -ForegroundColor Yellow
}

Write-Host "
Application closed." -ForegroundColor Yellow
