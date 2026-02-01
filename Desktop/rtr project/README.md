# 🔒 Secure File Locker - Desktop Application

A professional Windows desktop security application built with Python and Tkinter that allows users to encrypt, hide, and protect sensitive files using AES-256 encryption.

## 📋 Project Overview

This application demonstrates real security concepts while remaining simple enough to explain in a viva. It provides:

- ✅ Master password authentication with SHA-256 hashing
- ✅ AES-256 file encryption
- ✅ Windows file hiding using file attributes
- ✅ Professional Tkinter GUI
- ✅ Secure file deletion
- ✅ Clean, maintainable code structure

## 🎯 Features

### Authentication System
- First-run setup with master password creation
- Subsequent authentication on app launch
- Secure password hashing using PBKDF2
- Biometric simulation checkbox (UI element only)

### File Locking
- File picker to select files for encryption
- AES-256 encryption with password-derived keys
- Files saved with `.locked` extension
- Original files securely deleted (overwritten)
- Encrypted files hidden from Windows File Explorer

### File Unlocking
- File picker for `.locked` files
- Password verification before decryption
- Automatic file restoration with original extension
- Hidden file attribute removal

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.7+
- Windows OS

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

Or manually:
```bash
pip install pycryptodome
```

### Step 2: Run the Application
```bash
python main.py
```

## 📁 Project Structure

```
rtr project/
├── main.py              # GUI and application flow
├── auth.py              # Password hashing and validation
├── crypto_utils.py      # AES encryption/decryption
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## 🔐 Security Implementation Details

### Password Hashing (auth.py)
- Uses **PBKDF2** with SHA-256
- 100,000 iterations for stronger security
- Random 16-byte salt per password
- Salt stored with hash for verification

### File Encryption (crypto_utils.py)
- **AES-256** encryption in CBC mode
- Key derived from password using PBKDF2
- Random IV (Initialization Vector) per file
- PKCS7 padding for proper block alignment
- Salt + IV + encrypted data stored in `.locked` file

### File Hiding (Windows)
- Uses Windows `attrib +h` command
- Files hidden from normal File Explorer view
- Requires file attribute modification for viewing

## 💡 How It Works

### First Run
1. User launches `main.py`
2. Create Master Password screen appears
3. User sets password (must match confirmation)
4. Password is hashed and stored in `master_password.hash`
5. User proceeds to dashboard

### Locking a File
1. User clicks "🔒 Lock File"
2. File picker opens
3. File selected and encrypted with AES-256
4. Original file securely overwritten and deleted
5. `.locked` file created and hidden
6. Success message displayed

### Unlocking a File
1. User clicks "🔓 Unlock File"
2. File picker opens (shows `.locked` files)
3. User must re-authenticate with password
4. If correct: file decrypted and restored
5. If incorrect: error dialog shown
6. Hidden attribute removed from decrypted file

## 📊 Code Quality Features

- **Clear comments** for easy explanation in viva
- **Modular design** with separate concerns
- **Error handling** throughout
- **User-friendly messages** for all scenarios
- **Professional UI** with Tkinter
- **Security best practices** implemented

## 🎨 UI Screens

### Login Screen
- Clean, centered layout
- Masked password input
- First-run setup or authentication

### Dashboard
- Two main action buttons
- Status messages
- Professional color scheme
- Exit button

### Dialogs
- File pickers for easy file selection
- Success/error message boxes
- Password verification dialog

## 🧪 Testing the Application

### Test Scenario 1: First Setup
```
1. Run: python main.py
2. Enter master password (e.g., "SecurePass123")
3. Confirm password
4. Click "Setup & Login"
5. Dashboard should appear
```

### Test Scenario 2: Lock a File
```
1. Click "🔒 Lock File"
2. Select any file (e.g., C:\test.txt)
3. File encrypted and hidden
4. Verify file not visible in File Explorer
5. Check C:\test.txt.locked exists (hidden)
```

### Test Scenario 3: Unlock a File
```
1. Click "🔓 Unlock File"
2. Select C:\test.txt.locked
3. Enter master password
4. Original file restored
5. File visible in File Explorer again
```

### Test Scenario 4: Wrong Password
```
1. Click "🔓 Unlock File"
2. Select C:\test.txt.locked
3. Enter wrong password
4. Error dialog: "Incorrect password"
5. File not decrypted
```

## 📝 Key Files Explanation

### main.py
- **SecureFileLocker class**: Main application
- **show_login_screen()**: Initial authentication
- **show_dashboard()**: Main interface
- **lock_file_action()**: Encrypts and hides files
- **unlock_file_action()**: Decrypts and restores files

### auth.py
- **hash_password()**: Hashes password with salt
- **verify_password()**: Checks if password matches hash
- **set_master_password()**: Stores hashed password
- **authenticate_user()**: Validates user login

### crypto_utils.py
- **derive_key_from_password()**: Derives AES key from password
- **encrypt_file()**: Encrypts file with AES-256
- **decrypt_file()**: Decrypts `.locked` file
- **hide_file_windows()**: Hides file with `attrib +h`
- **unhide_file_windows()**: Unhides file with `attrib -h`

## ⚠️ Important Notes

1. **Master Password**: If forgotten, all encrypted files are permanently locked
2. **Backup**: Keep backups of important files before encrypting
3. **Windows Only**: File hiding feature works only on Windows
4. **Permissions**: May need admin rights to hide/unhide files
5. **Random Seed**: Each encryption uses a random salt and IV

## 🎓 Viva Preparation Points

### Explain in Viva:
1. **Authentication**: PBKDF2 with salt prevents rainbow table attacks
2. **Encryption**: AES-256 with random IV ensures security
3. **File Hiding**: Windows attributes hide files from casual viewing
4. **Modular Code**: Each module has clear responsibility
5. **Error Handling**: Graceful failure with user-friendly messages
6. **Security**: Password never stored in plain text

### Demo Steps:
1. Show first-time setup screen
2. Lock a test file and verify it's hidden
3. Try to open with wrong password (fails)
4. Unlock with correct password
5. Verify file is restored and visible

## 📄 License

This is a college project for educational purposes.

## 👨‍💻 Author

Built as a Secure File Locker RTR Project

---

**Made with ❤️ for college RTR project**
