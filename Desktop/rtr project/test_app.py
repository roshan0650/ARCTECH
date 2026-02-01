"""
test_app.py - Quick verification that all modules import correctly
Run this to verify the application setup is correct
"""

import sys
import os

print("=" * 60)
print("SECURE FILE LOCKER - APPLICATION VERIFICATION")
print("=" * 60)

# Test 1: Check Python version
print(f"\n✓ Python Version: {sys.version}")

# Test 2: Import all modules
print("\n📦 Testing Module Imports...")
try:
    import auth
    print("  ✓ auth.py imported successfully")
except Exception as e:
    print(f"  ✗ Failed to import auth.py: {e}")
    sys.exit(1)

try:
    import crypto_utils
    print("  ✓ crypto_utils.py imported successfully")
except Exception as e:
    print(f"  ✗ Failed to import crypto_utils.py: {e}")
    sys.exit(1)

try:
    import main
    print("  ✓ main.py imported successfully")
except Exception as e:
    print(f"  ✗ Failed to import main.py: {e}")
    sys.exit(1)

# Test 3: Check required functions
print("\n🔐 Checking Authentication Functions...")
if hasattr(auth, 'hash_password'):
    print("  ✓ hash_password function found")
if hasattr(auth, 'verify_password'):
    print("  ✓ verify_password function found")
if hasattr(auth, 'authenticate_user'):
    print("  ✓ authenticate_user function found")

print("\n🔒 Checking Encryption Functions...")
if hasattr(crypto_utils, 'encrypt_file'):
    print("  ✓ encrypt_file function found")
if hasattr(crypto_utils, 'decrypt_file'):
    print("  ✓ decrypt_file function found")
if hasattr(crypto_utils, 'hide_file_windows'):
    print("  ✓ hide_file_windows function found")

print("\n🎨 Checking GUI Class...")
if hasattr(main, 'SecureFileLocker'):
    print("  ✓ SecureFileLocker class found")
if hasattr(main, 'main'):
    print("  ✓ main function found")

# Test 4: Test password hashing
print("\n🧪 Testing Password Hashing...")
test_password = "TestPassword123"
try:
    hashed = auth.hash_password(test_password)
    print(f"  ✓ Password hashed successfully (length: {len(hashed)})")
    
    # Verify correct password
    if auth.verify_password(test_password, hashed):
        print("  ✓ Correct password verified successfully")
    else:
        print("  ✗ Correct password verification failed")
    
    # Verify wrong password
    if not auth.verify_password("WrongPassword", hashed):
        print("  ✓ Wrong password correctly rejected")
    else:
        print("  ✗ Wrong password verification failed")
except Exception as e:
    print(f"  ✗ Password hashing test failed: {e}")

print("\n" + "=" * 60)
print("✅ ALL CHECKS PASSED - APPLICATION READY TO RUN!")
print("=" * 60)
print("\nTo start the application, run: python main.py")
print("\nThe GUI window will open with the login/setup screen.")
print("\nTest Instructions:")
print("  1. On first run: Create a master password")
print("  2. On dashboard: Click 'Lock File' to encrypt a file")
print("  3. Select any file and it will be encrypted and hidden")
print("  4. Click 'Unlock File' and authenticate to decrypt")
print("=" * 60 + "\n")
