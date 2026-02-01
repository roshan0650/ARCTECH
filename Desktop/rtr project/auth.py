"""
auth.py - Authentication Module
Handles password hashing, validation, and master password management
Uses SHA-256 for secure password hashing
"""

import hashlib
import os

# File to store the hashed master password
PASSWORD_FILE = "master_password.hash"


def hash_password(password: str) -> str:
    """
    Hash a password using SHA-256 with a salt.
    
    Args:
        password: Plain text password to hash
        
    Returns:
        Salted and hashed password as hex string
    """
    # Generate a random salt (16 bytes = 32 hex characters)
    salt = os.urandom(16)
    
    # Hash password with salt using SHA-256
    pwd_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        100000  # Number of iterations for stronger security
    )
    
    # Return salt + hash combined (salt first for verification)
    return salt.hex() + pwd_hash.hex()


def verify_password(password: str, stored_hash: str) -> bool:
    """
    Verify if a password matches the stored hash.
    
    Args:
        password: Plain text password to verify
        stored_hash: Stored salted hash from hash_password()
        
    Returns:
        True if password matches, False otherwise
    """
    # Extract salt from stored hash (first 32 characters = 16 bytes)
    salt = bytes.fromhex(stored_hash[:32])
    stored_pwd_hash = stored_hash[32:]
    
    # Hash the provided password with the same salt
    pwd_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        100000
    )
    
    # Compare hashes
    return pwd_hash.hex() == stored_pwd_hash


def is_password_set() -> bool:
    """
    Check if master password has been set.
    
    Returns:
        True if password file exists, False otherwise
    """
    return os.path.exists(PASSWORD_FILE)


def set_master_password(password: str) -> bool:
    """
    Store the master password hash to file.
    
    Args:
        password: Master password to store
        
    Returns:
        True on success, False on failure
    """
    try:
        hashed = hash_password(password)
        with open(PASSWORD_FILE, 'w') as f:
            f.write(hashed)
        return True
    except Exception as e:
        print(f"Error setting password: {e}")
        return False


def get_stored_password_hash() -> str:
    """
    Retrieve the stored password hash from file.
    
    Returns:
        Stored hash string, or empty string if file not found
    """
    try:
        with open(PASSWORD_FILE, 'r') as f:
            return f.read().strip()
    except Exception as e:
        print(f"Error reading password file: {e}")
        return ""


def authenticate_user(password: str) -> bool:
    """
    Authenticate user against stored master password.
    
    Args:
        password: Password provided by user
        
    Returns:
        True if password is correct, False otherwise
    """
    stored_hash = get_stored_password_hash()
    if not stored_hash:
        return False
    
    return verify_password(password, stored_hash)


def change_master_password(old_password: str, new_password: str) -> tuple:
    """
    Change the master password after verifying the old password.
    
    Args:
        old_password: Current master password to verify
        new_password: New master password to set
        
    Returns:
        Tuple of (success: bool, message: str)
    """
    # Verify old password
    if not authenticate_user(old_password):
        return False, "Current password is incorrect"
    
    # Validate new password
    if not new_password or len(new_password) < 6:
        return False, "New password must be at least 6 characters"
    
    if old_password == new_password:
        return False, "New password must be different from current password"
    
    # Set new password
    try:
        if set_master_password(new_password):
            return True, "Master password changed successfully"
        else:
            return False, "Failed to save new password"
    except Exception as e:
        return False, f"Error changing password: {str(e)}"
