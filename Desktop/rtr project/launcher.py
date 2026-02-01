#!/usr/bin/env python
"""
Secure File Locker - Application Launcher
This script ensures the application runs with the correct Python environment
"""

import sys
import os
import subprocess

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Path to venv Python
venv_python = os.path.join(script_dir, '.venv', 'Scripts', 'python.exe')

# Check if we're already in the venv
current_python = sys.executable
venv_site_packages = os.path.join(script_dir, '.venv', 'Lib', 'site-packages')

# If not in venv, restart with venv Python
if venv_site_packages not in sys.path and os.path.exists(venv_python):
    print("[INFO] Starting application with virtual environment Python...")
    # Restart with venv Python
    result = subprocess.run([venv_python, os.path.join(script_dir, 'main.py')])
    sys.exit(result.returncode)

# If we're here, we're in the venv, so proceed normally
if __name__ == '__main__':
    sys.path.insert(0, script_dir)
    
    try:
        from main import main
        main()
    except ImportError as e:
        print(f"[ERROR] Import failed: {e}")
        print(f"[INFO] Make sure to install dependencies:")
        print(f"      pip install -r requirements.txt")
        sys.exit(1)
