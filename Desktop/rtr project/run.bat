@echo off
REM Secure File Locker - Startup Script
REM This script automatically activates the virtual environment and runs the application

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo Activating Virtual Environment...
call .venv\Scripts\activate.bat

if errorlevel 1 (
    echo Error: Failed to activate virtual environment
    pause
    exit /b 1
)

echo Starting Secure File Locker...
python main.py

if errorlevel 1 (
    echo.
    echo Error: Application failed to start
    echo Try running: .venv\Scripts\python.exe main.py
)

pause
