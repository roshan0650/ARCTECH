"""
crypto_utils.py - Cryptography Module
Handles AES encryption and decryption of files
Uses pycryptodome for secure AES encryption
"""

from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Hash import SHA256
import hashlib
import os


def derive_key_from_password(password: str, salt: bytes = None) -> tuple:
    """
    Derive a 32-byte AES key from password using PBKDF2.
    
    Args:
        password: Master password
        salt: Optional salt (if None, generates random salt)
        
    Returns:
        Tuple of (key, salt) - both as bytes
    """
    if salt is None:
        salt = get_random_bytes(16)
    
    # Encode password to bytes if it's a string
    if isinstance(password, str):
        password = password.encode('utf-8')
    
    # Derive 32-byte key using PBKDF2 (suitable for AES-256)
    # Use Crypto.Hash.SHA256 module, not hashlib
    key = PBKDF2(password, salt, dkLen=32, count=100000, hmac_hash_module=SHA256)
    
    return key, salt


def encrypt_file(file_path: str, password: str) -> bool:
    """
    Encrypt a file using AES-256 in CBC mode.
    
    Args:
        file_path: Path to the file to encrypt
        password: Master password for encryption
        
    Returns:
        True on success, False on failure
    """
    try:
        import traceback
        
        # Verify file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return False
        
        # Check if file is readable
        if not os.access(file_path, os.R_OK):
            print(f"File is not readable: {file_path}")
            return False
        
        # Read original file
        try:
            with open(file_path, 'rb') as f:
                file_data = f.read()
        except Exception as e:
            print(f"Error reading file: {e}")
            traceback.print_exc()
            return False
        
        # Derive key and salt from password
        try:
            key, salt = derive_key_from_password(password)
        except Exception as e:
            print(f"Error deriving key: {e}")
            traceback.print_exc()
            return False
        
        # Generate random IV (Initialization Vector)
        iv = get_random_bytes(16)
        
        # Create cipher and encrypt
        try:
            cipher = AES.new(key, AES.MODE_CBC, iv)
            
            # Add PKCS7 padding
            padding_len = 16 - (len(file_data) % 16)
            padded_data = file_data + bytes([padding_len] * padding_len)
            
            # Encrypt the data
            encrypted_data = cipher.encrypt(padded_data)
        except Exception as e:
            print(f"Error during encryption: {e}")
            traceback.print_exc()
            return False
        
        # Create locked file with salt and IV prepended (salt + iv + encrypted_data)
        locked_file_path = file_path + ".locked"
        try:
            with open(locked_file_path, 'wb') as f:
                f.write(salt + iv + encrypted_data)
        except Exception as e:
            print(f"Error writing encrypted file: {e}")
            traceback.print_exc()
            return False
        
        # Securely delete original file (overwrite with random data)
        try:
            file_size = os.path.getsize(file_path)
            with open(file_path, 'wb') as f:
                f.write(os.urandom(file_size))
            os.remove(file_path)
        except Exception as e:
            print(f"Warning: Could not securely delete original file: {e}")
            # Still attempt to remove the file
            try:
                os.remove(file_path)
            except Exception as e2:
                print(f"Warning: Could not remove original file: {e2}")
        
        print(f"File encrypted successfully: {locked_file_path}")
        return True
        
    except Exception as e:
        print(f"Encryption error: {e}")
        import traceback
        traceback.print_exc()
        return False


def decrypt_file(locked_file_path: str, password: str, output_path: str = None) -> bool:
    """
    Decrypt a .locked file using AES-256.
    
    Args:
        locked_file_path: Path to the .locked file
        password: Master password for decryption
        output_path: Optional output path (default: remove .locked extension)
        
    Returns:
        True on success, False on failure
    """
    try:
        # Verify file exists
        if not os.path.exists(locked_file_path):
            print(f"Locked file not found: {locked_file_path}")
            return False
        
        # Read locked file
        with open(locked_file_path, 'rb') as f:
            file_contents = f.read()
        
        # Extract salt (first 16 bytes) and IV (next 16 bytes)
        salt = file_contents[:16]
        iv = file_contents[16:32]
        encrypted_data = file_contents[32:]
        
        # Derive key using same password and extracted salt
        key, _ = derive_key_from_password(password, salt)
        
        # Create cipher and decrypt
        cipher = AES.new(key, AES.MODE_CBC, iv)
        padded_data = cipher.decrypt(encrypted_data)
        
        # Remove PKCS7 padding
        padding_len = padded_data[-1]
        file_data = padded_data[:-padding_len]
        
        # Determine output path
        if output_path is None:
            if locked_file_path.endswith('.locked'):
                output_path = locked_file_path[:-7]  # Remove .locked extension
            else:
                output_path = locked_file_path + ".decrypted"
        
        # Write decrypted file
        with open(output_path, 'wb') as f:
            f.write(file_data)
        
        # Delete the locked file
        try:
            os.remove(locked_file_path)
        except Exception as e:
            print(f"Warning: Could not delete locked file: {e}")
        
        print(f"File decrypted successfully: {output_path}")
        return True
        
    except Exception as e:
        print(f"Decryption error: {e}")
        return False


def hide_file_windows(file_path: str) -> bool:
    """
    Hide a file in Windows using file attributes.
    
    Args:
        file_path: Path to file to hide
        
    Returns:
        True on success, False on failure
    """
    try:
        import subprocess
        # Use Windows attrib command to hide file
        subprocess.run(['attrib', '+h', file_path], check=True, capture_output=True)
        print(f"File hidden: {file_path}")
        return True
    except Exception as e:
        print(f"Error hiding file: {e}")
        return False


def unhide_file_windows(file_path: str) -> bool:
    """
    Unhide a file in Windows using file attributes.
    
    Args:
        file_path: Path to file to unhide
        
    Returns:
        True on success, False on failure
    """
    try:
        import subprocess
        # Use Windows attrib command to unhide file
        subprocess.run(['attrib', '-h', file_path], check=True, capture_output=True)
        print(f"File unhidden: {file_path}")
        return True
    except Exception as e:
        print(f"Error unhiding file: {e}")
        return False


def encrypt_folder(folder_path: str, password: str, callback=None) -> tuple:
    """
    Encrypt all files in a folder recursively using AES-256.
    
    Args:
        folder_path: Path to the folder to encrypt
        password: Master password for encryption
        callback: Optional callback function(current_file, total_files) for progress updates
        
    Returns:
        Tuple of (success: bool, message: str, files_encrypted: int)
    """
    try:
        # Verify folder exists
        if not os.path.exists(folder_path):
            return False, f"Folder not found: {folder_path}", 0
        
        if not os.path.isdir(folder_path):
            return False, f"Not a folder: {folder_path}", 0
        
        # Get all files recursively
        all_files = []
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                # Skip already locked files
                if not file.endswith('.locked'):
                    file_path = os.path.join(root, file)
                    all_files.append(file_path)
        
        if not all_files:
            return False, "No files found in folder", 0
        
        # Encrypt each file
        successful_encryptions = 0
        failed_files = []
        
        for index, file_path in enumerate(all_files):
            try:
                # Update progress callback
                if callback:
                    callback(index + 1, len(all_files), os.path.basename(file_path))
                
                # Encrypt the file
                if encrypt_file(file_path, password):
                    successful_encryptions += 1
                    # Hide the locked file
                    locked_path = file_path + ".locked"
                    hide_file_windows(locked_path)
                else:
                    failed_files.append(os.path.basename(file_path))
            except Exception as e:
                print(f"Error encrypting {file_path}: {e}")
                failed_files.append(os.path.basename(file_path))
        
        # Prepare message
        if successful_encryptions == len(all_files):
            message = f"Successfully locked {successful_encryptions} file(s) in folder"
            return True, message, successful_encryptions
        elif successful_encryptions > 0:
            message = f"Locked {successful_encryptions}/{len(all_files)} files. Failed: {', '.join(failed_files[:5])}"
            if len(failed_files) > 5:
                message += f" and {len(failed_files) - 5} more"
            return True, message, successful_encryptions
        else:
            message = f"Failed to lock any files. Errors: {', '.join(failed_files[:5])}"
            return False, message, 0
            
    except Exception as e:
        print(f"Folder encryption error: {e}")
        return False, f"Error: {str(e)}", 0


def decrypt_folder(folder_path: str, password: str, callback=None) -> tuple:
    """
    Decrypt all .locked files in a folder recursively.
    
    Args:
        folder_path: Path to the folder containing locked files
        password: Master password for decryption
        callback: Optional callback function(current_file, total_files) for progress updates
        
    Returns:
        Tuple of (success: bool, message: str, files_decrypted: int)
    """
    try:
        # Verify folder exists
        if not os.path.exists(folder_path):
            return False, f"Folder not found: {folder_path}", 0
        
        if not os.path.isdir(folder_path):
            return False, f"Not a folder: {folder_path}", 0
        
        # Get all .locked files recursively
        locked_files = []
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                if file.endswith('.locked'):
                    file_path = os.path.join(root, file)
                    locked_files.append(file_path)
        
        if not locked_files:
            return False, "No locked files found in folder", 0
        
        # Decrypt each file
        successful_decryptions = 0
        failed_files = []
        
        for index, locked_file_path in enumerate(locked_files):
            try:
                # Unhide file first
                unhide_file_windows(locked_file_path)
                
                # Update progress callback
                if callback:
                    callback(index + 1, len(locked_files), os.path.basename(locked_file_path))
                
                # Decrypt the file
                if decrypt_file(locked_file_path, password):
                    successful_decryptions += 1
                else:
                    failed_files.append(os.path.basename(locked_file_path))
            except Exception as e:
                print(f"Error decrypting {locked_file_path}: {e}")
                failed_files.append(os.path.basename(locked_file_path))
        
        # Prepare message
        if successful_decryptions == len(locked_files):
            message = f"Successfully unlocked {successful_decryptions} file(s) in folder"
            return True, message, successful_decryptions
        elif successful_decryptions > 0:
            message = f"Unlocked {successful_decryptions}/{len(locked_files)} files. Failed: {', '.join(failed_files[:5])}"
            if len(failed_files) > 5:
                message += f" and {len(failed_files) - 5} more"
            return True, message, successful_decryptions
        else:
            message = f"Failed to unlock any files. Errors: {', '.join(failed_files[:5])}"
            return False, message, 0
            
    except Exception as e:
        print(f"Folder decryption error: {e}")
        return False, f"Error: {str(e)}", 0
