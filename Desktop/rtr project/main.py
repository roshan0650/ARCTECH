"""
main.py - Secure File Locker Desktop Application
Main GUI application with authentication and file locking/unlocking
"""

# CRITICAL: Check if running in correct Python environment
import sys
import os
import subprocess

def check_and_relaunch_if_needed():
    """Check if running with correct Python (venv), relaunch if not"""
    # Check if Crypto module is available
    try:
        import Crypto
    except ImportError:
        # Not in venv - try to relaunch with venv Python
        project_root = os.path.dirname(os.path.abspath(__file__))
        venv_python = os.path.join(project_root, '.venv', 'Scripts', 'python.exe')
        
        if os.path.exists(venv_python):
            # Relaunch with venv Python
            subprocess.run([venv_python, __file__], cwd=project_root)
            sys.exit(0)
        else:
            # Can't find venv
            print("ERROR: Virtual environment not found!")
            print(f"Expected at: {venv_python}")
            print("\nPlease run: .venv\\Scripts\\python.exe main.py")
            sys.exit(1)

check_and_relaunch_if_needed()

import tkinter as tk
from tkinter import filedialog, messagebox
import auth
import crypto_utils
import threading
from concurrent.futures import ThreadPoolExecutor
import queue


# Color scheme - Apple inspired (modern dark/light theme)
COLORS = {
    "bg_primary": "#FFFFFF",          # White background
    "bg_secondary": "#F5F5F7",        # Light gray background
    "bg_tertiary": "#E8E8ED",         # Slightly darker gray
    "text_primary": "#1D1D1F",        # Almost black text
    "text_secondary": "#666666",      # Gray text
    "text_tertiary": "#999999",       # Lighter gray text
    "accent_blue": "#0071E3",         # Apple blue
    "accent_green": "#34C759",        # System green
    "accent_red": "#FF3B30",          # System red
    "accent_orange": "#FF9500",       # System orange
    "accent_cyan": "#00B4D8",         # Cyan
    "border": "#D2D2D7",              # Border gray
    "shadow": "#00000014",            # Subtle shadow
}


class SecureFileLocker:
    """Main application class for Secure File Locker"""
    
    def __init__(self, root):
        """Initialize the application"""
        self.root = root
        self.root.title("Secure File Locker")
        self.root.geometry("600x700")
        self.root.resizable(False, False)
        
        # Configure style - Apple inspired clean look
        self.root.configure(bg=COLORS["bg_primary"])
        
        # Set window icon and appearance
        self.root.attributes('-alpha', 0.99)  # Smooth appearance
        
        # Center window on screen
        self.center_window()
        
        # Current state
        self.authenticated = False
        self.current_password = None
        
        # Show login screen
        self.show_login_screen()
    
    def center_window(self):
        """Center the window on screen"""
        self.root.update_idletasks()
        width = self.root.winfo_width()
        height = self.root.winfo_height()
        x = (self.root.winfo_screenwidth() // 2) - (width // 2)
        y = (self.root.winfo_screenheight() // 2) - (height // 2)
        self.root.geometry(f"{width}x{height}+{x}+{y}")
    
    def clear_window(self):
        """Clear all widgets from window"""
        for widget in self.root.winfo_children():
            widget.destroy()
    
    def create_button(self, parent, text, command, bg_color, text_color, width=None, height=None, icon_bg=False):
        """Create a professional Apple-style button"""
        btn_frame = tk.Frame(parent, bg=COLORS["bg_primary"], highlightthickness=0)
        
        btn = tk.Button(
            btn_frame,
            text=text,
            command=command,
            font=("Segoe UI", 13, "bold"),
            bg=bg_color,
            fg=text_color,
            padx=24,
            pady=14,
            relief="flat",
            cursor="hand2",
            activebackground=self._lighten_color(bg_color),
            activeforeground=text_color,
            border=0,
            highlightthickness=0
        )
        
        # Use grid to center the button
        btn.pack(fill="x", padx=0)
        return btn_frame
    
    def _lighten_color(self, color):
        """Lighten a color for hover effect"""
        # Convert hex to RGB, lighten, and convert back
        if color.startswith('#'):
            hex_color = color.lstrip('#')
            rgb = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
            # Lighten by reducing darkness
            rgb = tuple(min(c + 20, 255) for c in rgb)
            return '#{:02x}{:02x}{:02x}'.format(*rgb)
        return color
    
    def show_login_screen(self):
        """Display login/setup screen"""
        self.clear_window()
        
        # Create main frame with better spacing
        main_frame = tk.Frame(self.root, bg=COLORS["bg_primary"], highlightthickness=0)
        main_frame.pack(fill="both", expand=True)
        
        # Top spacer
        top_spacer = tk.Frame(main_frame, bg=COLORS["bg_primary"], height=40, highlightthickness=0)
        top_spacer.pack(fill="x")
        
        # Title - modern, clean typography
        title_label = tk.Label(
            main_frame,
            text="🔐",
            font=("Segoe UI", 48),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        title_label.pack(pady=(0, 20))
        
        title_text = tk.Label(
            main_frame,
            text="Secure File Locker",
            font=("Segoe UI", 28, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        title_text.pack(pady=(0, 8))
        
        # Subtitle
        subtitle_label = tk.Label(
            main_frame,
            text="Protect your sensitive files with military-grade encryption",
            font=("Segoe UI", 11),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_secondary"]
        )
        subtitle_label.pack(pady=(0, 40))
        
        # Check if password is already set
        if auth.is_password_set():
            self.show_login_form()
        else:
            self.show_setup_form()
    
    def show_setup_form(self):
        """Show first-time setup form for creating master password"""
        # Create content frame
        content_frame = tk.Frame(self.root, bg=COLORS["bg_primary"], highlightthickness=0)
        content_frame.pack(fill="both", expand=True, padx=40, pady=20)
        
        # Password label - refined typography
        pwd_label = tk.Label(
            content_frame,
            text="Create Master Password",
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        pwd_label.pack(anchor="w", pady=(20, 8))
        
        # Password entry - clean style
        self.setup_pwd_entry = tk.Entry(
            content_frame,
            show="●",
            font=("Segoe UI", 12),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        self.setup_pwd_entry.pack(padx=0, pady=(0, 20), fill="x", ipady=10)
        self.setup_pwd_entry.focus()
        
        # Confirm password label
        confirm_label = tk.Label(
            content_frame,
            text="Confirm Password",
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        confirm_label.pack(anchor="w", pady=(0, 8))
        
        # Confirm password entry
        self.setup_confirm_entry = tk.Entry(
            content_frame,
            show="●",
            font=("Segoe UI", 12),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        self.setup_confirm_entry.pack(padx=0, pady=(0, 30), fill="x", ipady=10)
        
        # Biometric checkbox - refined
        self.biometric_var = tk.BooleanVar()
        biometric_check = tk.Checkbutton(
            content_frame,
            text="Enable biometric authentication (optional)",
            variable=self.biometric_var,
            font=("Segoe UI", 11),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"],
            selectcolor=COLORS["bg_primary"],
            activebackground=COLORS["bg_primary"],
            activeforeground=COLORS["accent_blue"],
            highlightthickness=0,
            relief="flat"
        )
        biometric_check.pack(anchor="w", pady=(0, 30))
        
        # Button frame
        button_frame = tk.Frame(content_frame, bg=COLORS["bg_primary"], highlightthickness=0)
        button_frame.pack(fill="x", pady=20)
        
        # Setup button - primary action
        setup_btn = tk.Button(
            button_frame,
            text="Setup & Login",
            command=self.handle_setup,
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["accent_blue"],
            fg="white",
            padx=24,
            pady=12,
            relief="flat",
            cursor="hand2",
            activebackground="#0056C0",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        setup_btn.pack(fill="x", pady=10)
        
        # Bind Enter key
        self.setup_pwd_entry.bind("<Return>", lambda e: self.handle_setup())
        self.setup_confirm_entry.bind("<Return>", lambda e: self.handle_setup())
    
    def show_login_form(self):
        """Show login form for existing users"""
        # Create content frame
        content_frame = tk.Frame(self.root, bg=COLORS["bg_primary"], highlightthickness=0)
        content_frame.pack(fill="both", expand=True, padx=40, pady=40)
        
        # Password label
        pwd_label = tk.Label(
            content_frame,
            text="Enter Master Password",
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        pwd_label.pack(anchor="w", pady=(0, 8))
        
        # Password entry
        self.login_pwd_entry = tk.Entry(
            content_frame,
            show="●",
            font=("Segoe UI", 12),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        self.login_pwd_entry.pack(padx=0, pady=(0, 12), fill="x", ipady=10)
        self.login_pwd_entry.focus()
        
        # Link frame for forgot password
        link_frame = tk.Frame(content_frame, bg=COLORS["bg_primary"], highlightthickness=0)
        link_frame.pack(fill="x", pady=(0, 25))
        
        # Forgot Password link
        forgot_pwd_link = tk.Label(
            link_frame,
            text="Forgot password?",
            font=("Segoe UI", 10, "underline"),
            bg=COLORS["bg_primary"],
            fg=COLORS["accent_blue"],
            cursor="hand2"
        )
        forgot_pwd_link.pack(side="left")
        forgot_pwd_link.bind("<Button-1>", lambda e: self.show_forgot_password_panel(content_frame))
        
        # Biometric checkbox
        self.biometric_login_var = tk.BooleanVar()
        biometric_check = tk.Checkbutton(
            content_frame,
            text="Use biometric authentication (simulated)",
            variable=self.biometric_login_var,
            font=("Segoe UI", 11),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"],
            selectcolor=COLORS["bg_primary"],
            activebackground=COLORS["bg_primary"],
            activeforeground=COLORS["accent_blue"],
            highlightthickness=0,
            relief="flat"
        )
        biometric_check.pack(anchor="w", pady=(0, 30))
        
        # Login button
        login_btn = tk.Button(
            content_frame,
            text="Unlock Files",
            command=self.handle_login,
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["accent_blue"],
            fg="white",
            padx=24,
            pady=12,
            relief="flat",
            cursor="hand2",
            activebackground="#0056C0",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        login_btn.pack(fill="x", pady=10)
        
        # Bind Enter key
        self.login_pwd_entry.bind("<Return>", lambda e: self.handle_login())
    
    def show_forgot_password_panel(self, parent_frame):
        """Show forgot password recovery panel on the same page"""
        # Clear existing widgets in parent
        for widget in parent_frame.winfo_children():
            widget.destroy()
        
        # Title
        title_label = tk.Label(
            parent_frame,
            text="Reset Master Password",
            font=("Segoe UI", 14, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        title_label.pack(anchor="w", pady=(0, 5))
        
        # Subtitle
        subtitle_label = tk.Label(
            parent_frame,
            text="Unfortunately, we cannot recover a forgotten master password for security reasons.",
            font=("Segoe UI", 10),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_secondary"],
            wraplength=300,
            justify="left"
        )
        subtitle_label.pack(anchor="w", pady=(0, 20))
        
        # Info box
        info_frame = tk.Frame(parent_frame, bg=COLORS["bg_secondary"], highlightthickness=1, relief="solid")
        info_frame.pack(fill="x", pady=15)
        
        info_text = tk.Label(
            info_frame,
            text="⚠️  Options:\n\n• Use your backup password if you created one\n• Reset all data by deleting master_password.hash file\n• Start fresh with a new master password",
            font=("Segoe UI", 10),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            justify="left",
            wraplength=280,
            padx=12,
            pady=12
        )
        info_text.pack(anchor="w", fill="x")
        
        # Button frame
        button_frame = tk.Frame(parent_frame, bg=COLORS["bg_primary"], highlightthickness=0)
        button_frame.pack(fill="x", pady=20)
        
        # Back button
        back_btn = tk.Button(
            button_frame,
            text="← Back to Login",
            command=self.show_login_screen,
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            padx=20,
            pady=10,
            relief="flat",
            cursor="hand2",
            activebackground=COLORS["bg_tertiary"],
            activeforeground=COLORS["text_primary"],
            border=0,
            highlightthickness=0
        )
        back_btn.pack(fill="x", pady=5)
    
    def handle_setup(self):
        """Handle first-time setup"""
        password = self.setup_pwd_entry.get()
        confirm_password = self.setup_confirm_entry.get()
        
        # Validate input
        if not password or not confirm_password:
            messagebox.showerror("Setup Error", "Please enter a password")
            return
        
        if len(password) < 6:
            messagebox.showerror("Setup Error", "Password must be at least 6 characters")
            return
        
        if password != confirm_password:
            messagebox.showerror("Setup Error", "Passwords do not match")
            return
        
        # Set master password
        if auth.set_master_password(password):
            self.current_password = password
            self.authenticated = True
            messagebox.showinfo("Success", "Master password set successfully!")
            self.show_dashboard()
        else:
            messagebox.showerror("Setup Error", "Failed to set master password")
    
    def handle_login(self):
        """Handle user login"""
        password = self.login_pwd_entry.get()
        
        if not password:
            messagebox.showerror("Login Error", "Please enter your password")
            return
        
        # Authenticate user
        if auth.authenticate_user(password):
            self.current_password = password
            self.authenticated = True
            messagebox.showinfo("Success", "Authentication successful!")
            self.show_dashboard()
        else:
            messagebox.showerror("Login Error", "Incorrect password")
            self.login_pwd_entry.delete(0, tk.END)
            self.login_pwd_entry.focus()
    
    def show_dashboard(self):
        """Display main dashboard with professional Apple-style design"""
        self.clear_window()
        self.root.geometry("600x950")
        self.center_window()
        
        # Create main scrollable frame
        main_frame = tk.Frame(self.root, bg=COLORS["bg_primary"], highlightthickness=0)
        main_frame.pack(fill="both", expand=True)
        
        # Header section
        header_frame = tk.Frame(main_frame, bg=COLORS["bg_secondary"], highlightthickness=0)
        header_frame.pack(fill="x", pady=0)
        
        # Header content with settings button
        header_top = tk.Frame(header_frame, bg=COLORS["bg_secondary"], highlightthickness=0)
        header_top.pack(fill="x", padx=40, pady=(15, 0))
        
        # Settings button (top right)
        settings_btn = tk.Button(
            header_top,
            text="🔑 Change Master Password",
            command=self.change_password_action,
            font=("Segoe UI", 9),
            bg=COLORS["bg_secondary"],
            fg=COLORS["accent_blue"],
            padx=10,
            pady=6,
            relief="flat",
            cursor="hand2",
            activebackground=COLORS["bg_tertiary"],
            activeforeground=COLORS["accent_blue"],
            border=0,
            highlightthickness=0
        )
        settings_btn.pack(side="right")
        
        # Header content
        header_content = tk.Frame(header_frame, bg=COLORS["bg_secondary"], highlightthickness=0)
        header_content.pack(fill="x", padx=40, pady=(15, 30))
        
        # Icon
        icon_label = tk.Label(
            header_content,
            text="🔐",
            font=("Segoe UI", 42),
            bg=COLORS["bg_secondary"],
            fg=COLORS["accent_blue"]
        )
        icon_label.pack(pady=(0, 12))
        
        # Welcome message
        welcome_label = tk.Label(
            header_content,
            text="Dashboard",
            font=("Segoe UI", 24, "bold"),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"]
        )
        welcome_label.pack(pady=(0, 8))
        
        # Status label
        self.status_label = tk.Label(
            header_content,
            text="Ready to secure your files",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_secondary"]
        )
        self.status_label.pack(pady=(0, 0))
        
        # Content section
        content_frame = tk.Frame(main_frame, bg=COLORS["bg_primary"], highlightthickness=0)
        content_frame.pack(fill="both", expand=True, padx=24, pady=24)
        
        # Lock section
        lock_section_title = tk.Label(
            content_frame,
            text="Lock Files",
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        lock_section_title.pack(anchor="w", pady=(20, 12))
        
        # Lock File button
        lock_btn = tk.Button(
            content_frame,
            text="🔒  Lock Individual File",
            command=self.lock_file_action,
            font=("Segoe UI", 12, "bold"),
            bg=COLORS["accent_green"],
            fg="white",
            padx=20,
            pady=14,
            relief="flat",
            cursor="hand2",
            activebackground="#2FA84F",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        lock_btn.pack(fill="x", pady=8)
        
        # Lock Folder button
        lock_folder_btn = tk.Button(
            content_frame,
            text="📁  Lock Entire Folder",
            command=self.lock_folder_action,
            font=("Segoe UI", 12, "bold"),
            bg=COLORS["accent_cyan"],
            fg="white",
            padx=20,
            pady=14,
            relief="flat",
            cursor="hand2",
            activebackground="#0094C9",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        lock_folder_btn.pack(fill="x", pady=8)
        
        # Unlock section
        unlock_section_title = tk.Label(
            content_frame,
            text="Unlock Files",
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        unlock_section_title.pack(anchor="w", pady=(24, 12))
        
        # Unlock File button
        unlock_btn = tk.Button(
            content_frame,
            text="🔓  Unlock Individual File",
            command=self.unlock_file_action,
            font=("Segoe UI", 12, "bold"),
            bg=COLORS["accent_red"],
            fg="white",
            padx=20,
            pady=14,
            relief="flat",
            cursor="hand2",
            activebackground="#E60C0C",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        unlock_btn.pack(fill="x", pady=8)
        
        # Unlock Folder button
        unlock_folder_btn = tk.Button(
            content_frame,
            text="📂  Unlock Entire Folder",
            command=self.unlock_folder_action,
            font=("Segoe UI", 12, "bold"),
            bg=COLORS["accent_orange"],
            fg="white",
            padx=20,
            pady=14,
            relief="flat",
            cursor="hand2",
            activebackground="#E68000",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        unlock_folder_btn.pack(fill="x", pady=8)
        
        # Settings section
        settings_section_title = tk.Label(
            content_frame,
            text="Settings",
            font=("Segoe UI", 13, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        settings_section_title.pack(anchor="w", pady=(24, 12))
        
        # Change Password button - opens inline panel
        change_pwd_btn = tk.Button(
            content_frame,
            text="🔑  Change Master Password",
            command=lambda: self.show_change_password_inline(content_frame),
            font=("Segoe UI", 12, "bold"),
            bg=COLORS["accent_blue"],
            fg="white",
            padx=20,
            pady=14,
            relief="flat",
            cursor="hand2",
            activebackground="#0056C0",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        change_pwd_btn.pack(fill="x", pady=8)
        
        # Exit button - subtle
        exit_btn = tk.Button(
            content_frame,
            text="Exit Application",
            command=self.root.quit,
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            padx=20,
            pady=11,
            relief="flat",
            cursor="hand2",
            activebackground=COLORS["bg_tertiary"],
            activeforeground=COLORS["text_primary"],
            border=0,
            highlightthickness=0
        )
        exit_btn.pack(fill="x", pady=(24, 0))
    
    def lock_file_action(self):
        """Handle lock file action"""
        # Open file picker
        file_path = filedialog.askopenfilename(
            title="Select a file to lock",
            initialdir=os.path.expanduser("~")
        )
        
        if not file_path:
            return  # User cancelled
        
        # Check if file is accessible
        if not os.path.exists(file_path):
            messagebox.showerror("Error", f"File not found: {file_path}")
            return
        
        if not os.access(file_path, os.R_OK):
            messagebox.showerror("Error", f"File is not readable. Please check permissions: {file_path}")
            return
        
        # Show processing
        self.status_label.config(text="🔒 Encrypting file...")
        self.root.update()
        
        try:
            # Encrypt the file
            if crypto_utils.encrypt_file(file_path, self.current_password):
                # Hide the encrypted file
                locked_path = file_path + ".locked"
                if crypto_utils.hide_file_windows(locked_path):
                    self.status_label.config(text="✓ File locked and hidden successfully", fg=COLORS["accent_green"])
                    messagebox.showinfo(
                        "Success",
                        f"File locked successfully!\n\nLocked file: {locked_path}\n\nNote: Original file has been securely deleted."
                    )
                else:
                    self.status_label.config(text="File encrypted but hiding failed", fg=COLORS["accent_red"])
                    messagebox.showwarning(
                        "Partial Success",
                        f"File encrypted successfully, but could not hide it.\nFile location: {locked_path}"
                    )
            else:
                self.status_label.config(text="✗ File encryption failed", fg=COLORS["accent_red"])
                messagebox.showerror("Error", "Failed to encrypt file. Check console for details.")
        except Exception as e:
            self.status_label.config(text="✗ An error occurred", fg=COLORS["accent_red"])
            messagebox.showerror("Error", f"An error occurred: {str(e)}")
    
    def lock_folder_action(self):
        """Handle lock folder action with threading"""
        # Open folder picker
        folder_path = filedialog.askdirectory(
            title="Select a folder to lock",
            initialdir=os.path.expanduser("~")
        )
        
        if not folder_path:
            return
        
        # Check if folder exists
        if not os.path.exists(folder_path):
            messagebox.showerror("Error", f"Folder not found: {folder_path}")
            return
        
        if not os.path.isdir(folder_path):
            messagebox.showerror("Error", f"Not a folder: {folder_path}")
            return
        
        # Confirm action
        file_count = sum([len(files) for _, _, files in os.walk(folder_path)])
        if file_count == 0:
            messagebox.showwarning("Warning", "The selected folder is empty")
            return
        
        confirm = messagebox.askyesno(
            "Confirm Lock",
            f"Lock {file_count} file(s)?\n\n{folder_path}"
        )
        
        if not confirm:
            return
        
        # Create progress dialog
        progress_window = tk.Toplevel(self.root)
        progress_window.title("Locking Folder")
        progress_window.geometry("400x150")
        progress_window.resizable(False, False)
        progress_window.configure(bg=COLORS["bg_primary"])
        
        # Center dialog
        progress_window.transient(self.root)
        progress_window.grab_set()
        
        # Title
        title_label = tk.Label(
            progress_window,
            text="🔒 Locking folder...",
            font=("Segoe UI", 12, "bold"),
            padx=20,
            pady=10,
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        title_label.pack()
        
        # Progress label
        progress_label = tk.Label(
            progress_window,
            text="Starting...",
            font=("Segoe UI", 10),
            padx=20,
            pady=5,
            bg=COLORS["bg_primary"],
            fg=COLORS["text_secondary"]
        )
        progress_label.pack()
        
        # Progress bar
        progress_bar = tk.Label(
            progress_window,
            text="",
            font=("Segoe UI", 9),
            fg=COLORS["accent_green"],
            padx=20,
            pady=5,
            bg=COLORS["bg_primary"]
        )
        progress_bar.pack()
        
        # Callback for progress updates
        def progress_callback(current, total, filename):
            try:
                progress_percent = int((current / total) * 100)
                progress_label.config(text=f"{filename[:40]}")
                progress_bar.config(text=f"{current}/{total} files • {progress_percent}%")
                progress_window.update()
            except:
                pass
        
        # Run encryption in background thread
        def encrypt_folder_thread():
            try:
                success, message, files_encrypted = crypto_utils.encrypt_folder(
                    folder_path,
                    self.current_password,
                    callback=progress_callback
                )
                
                try:
                    progress_window.destroy()
                except:
                    pass
                
                if success:
                    self.status_label.config(text=f"✓ {files_encrypted} file(s) locked", fg=COLORS["accent_green"])
                    messagebox.showinfo("Success", f"Locked {files_encrypted} file(s)")
                else:
                    self.status_label.config(text="✗ Folder locking failed", fg=COLORS["accent_red"])
                    messagebox.showwarning("Warning", message)
            except Exception as e:
                try:
                    progress_window.destroy()
                except:
                    pass
                self.status_label.config(text="✗ Error", fg=COLORS["accent_red"])
                messagebox.showerror("Error", str(e))
        
        self.status_label.config(text="🔒 Encrypting folder...")
        thread = threading.Thread(target=encrypt_folder_thread, daemon=True)
        thread.start()
    
    def unlock_file_action(self):
        """Handle unlock file action with threading"""
        # Open file picker for .locked files
        file_path = filedialog.askopenfilename(
            title="Select a locked file to unlock",
            filetypes=[("Locked files", "*.locked"), ("All files", "*.*")],
            initialdir=os.path.expanduser("~")
        )
        
        if not file_path:
            return
        
        # Verify password before decryption
        password_dialog = tk.Toplevel(self.root)
        password_dialog.title("Verify Password")
        password_dialog.geometry("350x180")
        password_dialog.resizable(False, False)
        
        # Center dialog
        password_dialog.transient(self.root)
        password_dialog.grab_set()
        
        # Label
        label = tk.Label(
            password_dialog,
            text="Enter password to unlock file",
            font=("Segoe UI", 10),
            padx=20,
            pady=20
        )
        label.pack()
        
        # Password entry
        pwd_entry = tk.Entry(password_dialog, show="●", font=("Segoe UI", 11))
        pwd_entry.pack(padx=20, pady=(0, 20), fill="x")
        pwd_entry.focus()
        
        def verify_and_decrypt():
            password = pwd_entry.get()
            if auth.authenticate_user(password):
                password_dialog.destroy()
                self.status_label.config(text="🔓 Decrypting file...")
                self.root.update()
                
                try:
                    # Unhide file first
                    crypto_utils.unhide_file_windows(file_path)
                    
                    # Decrypt the file
                    if crypto_utils.decrypt_file(file_path, password):
                        self.status_label.config(text="✓ File unlocked successfully", fg="#28a745")
                        original_path = file_path[:-7]  # Remove .locked
                        messagebox.showinfo(
                            "Success",
                            f"File unlocked successfully!\n\nOriginal file: {original_path}"
                        )
                    else:
                        self.status_label.config(text="✗ File decryption failed", fg="#dc3545")
                        messagebox.showerror("Error", "Failed to decrypt file")
                except Exception as e:
                    self.status_label.config(text="✗ An error occurred", fg="#dc3545")
                    messagebox.showerror("Error", f"An error occurred: {str(e)}")
            else:
                messagebox.showerror("Error", "Incorrect password")
                pwd_entry.delete(0, tk.END)
                pwd_entry.focus()
        
        # Verify button
        verify_btn = tk.Button(
            password_dialog,
            text="Unlock",
            command=verify_and_decrypt,
            font=("Segoe UI", 10, "bold"),
            bg="#dc3545",
            fg="white",
            padx=20,
            pady=8,
            relief="flat"
        )
        verify_btn.pack(pady=10)
        
        # Bind Enter key
        pwd_entry.bind("<Return>", lambda e: verify_and_decrypt())
    
    def unlock_folder_action(self):
        """Handle unlock folder action with threading"""
        # Open folder picker
        folder_path = filedialog.askdirectory(
            title="Select a folder with locked files",
            initialdir=os.path.expanduser("~")
        )
        
        if not folder_path:
            return
        
        # Check if folder exists
        if not os.path.exists(folder_path):
            messagebox.showerror("Error", f"Folder not found: {folder_path}")
            return
        
        if not os.path.isdir(folder_path):
            messagebox.showerror("Error", f"Not a folder: {folder_path}")
            return
        
        # Count locked files
        locked_files = []
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                if file.endswith('.locked'):
                    locked_files.append(file)
        
        if not locked_files:
            messagebox.showwarning("Warning", "No locked files found")
            return
        
        # Confirm action
        confirm = messagebox.askyesno(
            "Confirm Unlock",
            f"Unlock {len(locked_files)} file(s)?\n\n{folder_path}"
        )
        
        if not confirm:
            return
        
        # Create password verification dialog
        password_dialog = tk.Toplevel(self.root)
        password_dialog.title("Verify Password")
        password_dialog.geometry("350x180")
        password_dialog.resizable(False, False)
        password_dialog.configure(bg=COLORS["bg_primary"])
        
        # Center dialog
        password_dialog.transient(self.root)
        password_dialog.grab_set()
        
        # Label
        label = tk.Label(
            password_dialog,
            text="Enter password",
            font=("Segoe UI", 11),
            padx=20,
            pady=20,
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        label.pack()
        
        # Password entry
        pwd_entry = tk.Entry(
            password_dialog,
            show="●",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        pwd_entry.pack(padx=20, pady=(0, 20), fill="x", ipady=8)
        pwd_entry.focus()
        
        def verify_and_decrypt_folder():
            password = pwd_entry.get()
            if auth.authenticate_user(password):
                password_dialog.destroy()
                
                # Create progress dialog
                progress_window = tk.Toplevel(self.root)
                progress_window.title("Unlocking Folder")
                progress_window.geometry("400x150")
                progress_window.resizable(False, False)
                progress_window.configure(bg=COLORS["bg_primary"])
                
                # Center dialog
                progress_window.transient(self.root)
                progress_window.grab_set()
                
                # Title
                title_label = tk.Label(
                    progress_window,
                    text="🔓 Unlocking folder...",
                    font=("Segoe UI", 12, "bold"),
                    padx=20,
                    pady=10,
                    bg=COLORS["bg_primary"],
                    fg=COLORS["text_primary"]
                )
                title_label.pack()
                
                # Progress label
                progress_label = tk.Label(
                    progress_window,
                    text="Starting...",
                    font=("Segoe UI", 10),
                    padx=20,
                    pady=5,
                    bg=COLORS["bg_primary"],
                    fg=COLORS["text_secondary"]
                )
                progress_label.pack()
                
                # Progress bar
                progress_bar = tk.Label(
                    progress_window,
                    text="",
                    font=("Segoe UI", 9),
                    fg=COLORS["accent_red"],
                    padx=20,
                    pady=5,
                    bg=COLORS["bg_primary"]
                )
                progress_bar.pack()
                
                # Callback for progress updates
                def progress_callback(current, total, filename):
                    try:
                        progress_percent = int((current / total) * 100)
                        progress_label.config(text=f"{filename[:40]}")
                        progress_bar.config(text=f"{current}/{total} files • {progress_percent}%")
                        progress_window.update()
                    except:
                        pass
                
                # Run decryption in background thread
                def decrypt_folder_thread():
                    try:
                        success, message, files_decrypted = crypto_utils.decrypt_folder(
                            folder_path,
                            password,
                            callback=progress_callback
                        )
                        
                        try:
                            progress_window.destroy()
                        except:
                            pass
                        
                        if success:
                            self.status_label.config(text=f"✓ {files_decrypted} file(s) unlocked", fg=COLORS["accent_green"])
                            messagebox.showinfo("Success", f"Unlocked {files_decrypted} file(s)")
                        else:
                            self.status_label.config(text="✗ Folder unlocking failed", fg=COLORS["accent_red"])
                            messagebox.showwarning("Warning", message)
                    except Exception as e:
                        try:
                            progress_window.destroy()
                        except:
                            pass
                        self.status_label.config(text="✗ Error", fg=COLORS["accent_red"])
                        messagebox.showerror("Error", str(e))
                
                self.status_label.config(text="🔓 Decrypting folder...")
                thread = threading.Thread(target=decrypt_folder_thread, daemon=True)
                thread.start()
            else:
                messagebox.showerror("Error", "Incorrect password")
                pwd_entry.delete(0, tk.END)
                pwd_entry.focus()
        
        # Verify button
        verify_btn = tk.Button(
            password_dialog,
            text="Unlock",
            command=verify_and_decrypt_folder,
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["accent_red"],
            fg="white",
            padx=20,
            pady=8,
            relief="flat",
            cursor="hand2",
            activebackground="#E60C0C",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        verify_btn.pack(pady=10)
        
        # Bind Enter key
        pwd_entry.bind("<Return>", lambda e: verify_and_decrypt_folder())
    
    def show_change_password_inline(self, parent_frame):
        """Show change password panel inline on the dashboard"""
        # Clear existing widgets in parent
        for widget in parent_frame.winfo_children():
            widget.destroy()
        
        # Back button at top
        back_btn = tk.Button(
            parent_frame,
            text="← Back to Dashboard",
            command=self.show_dashboard,
            font=("Segoe UI", 10),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            padx=10,
            pady=8,
            relief="flat",
            cursor="hand2",
            activebackground=COLORS["bg_tertiary"],
            activeforeground=COLORS["text_primary"],
            border=0,
            highlightthickness=0
        )
        back_btn.pack(fill="x", pady=(0, 20))
        
        # Title
        title_label = tk.Label(
            parent_frame,
            text="🔑 Change Master Password",
            font=("Segoe UI", 14, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        title_label.pack(anchor="w", pady=(0, 5))
        
        # Subtitle
        subtitle_label = tk.Label(
            parent_frame,
            text="Enter your current password and set a new one",
            font=("Segoe UI", 10),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_secondary"]
        )
        subtitle_label.pack(anchor="w", pady=(0, 25))
        
        # Current password label
        current_label = tk.Label(
            parent_frame,
            text="Current Password",
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        current_label.pack(anchor="w", pady=(0, 6))
        
        # Current password entry
        current_pwd_entry = tk.Entry(
            parent_frame,
            show="●",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        current_pwd_entry.pack(fill="x", pady=(0, 16), ipady=8)
        current_pwd_entry.focus()
        
        # New password label
        new_label = tk.Label(
            parent_frame,
            text="New Password (min 6 characters)",
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        new_label.pack(anchor="w", pady=(0, 6))
        
        # New password entry
        new_pwd_entry = tk.Entry(
            parent_frame,
            show="●",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        new_pwd_entry.pack(fill="x", pady=(0, 16), ipady=8)
        
        # Confirm new password label
        confirm_label = tk.Label(
            parent_frame,
            text="Confirm New Password",
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"]
        )
        confirm_label.pack(anchor="w", pady=(0, 6))
        
        # Confirm new password entry
        confirm_pwd_entry = tk.Entry(
            parent_frame,
            show="●",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        confirm_pwd_entry.pack(fill="x", pady=(0, 30), ipady=8)
        
        def perform_password_change():
            current_pwd = current_pwd_entry.get()
            new_pwd = new_pwd_entry.get()
            confirm_pwd = confirm_pwd_entry.get()
            
            # Validate inputs
            if not current_pwd or not new_pwd or not confirm_pwd:
                messagebox.showerror("Error", "Please fill in all fields")
                return
            
            if new_pwd != confirm_pwd:
                messagebox.showerror("Error", "New passwords do not match")
                confirm_pwd_entry.delete(0, tk.END)
                new_pwd_entry.delete(0, tk.END)
                new_pwd_entry.focus()
                return
            
            # Attempt to change password
            success, message = auth.change_master_password(current_pwd, new_pwd)
            
            if success:
                self.current_password = new_pwd
                messagebox.showinfo("Success", message)
                self.show_dashboard()
            else:
                messagebox.showerror("Error", message)
                current_pwd_entry.delete(0, tk.END)
                current_pwd_entry.focus()
        
        # Button frame
        button_frame = tk.Frame(parent_frame, bg=COLORS["bg_primary"], highlightthickness=0)
        button_frame.pack(fill="x")
        
        # Change button
        change_btn = tk.Button(
            button_frame,
            text="Update Password",
            command=perform_password_change,
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["accent_blue"],
            fg="white",
            padx=15,
            pady=11,
            relief="flat",
            cursor="hand2",
            activebackground="#0056C0",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        change_btn.pack(fill="x", pady=8)
        
        # Cancel button
        cancel_btn = tk.Button(
            button_frame,
            text="Cancel",
            command=self.show_dashboard,
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            padx=15,
            pady=11,
            relief="flat",
            cursor="hand2",
            activebackground=COLORS["bg_tertiary"],
            activeforeground=COLORS["text_primary"],
            border=0,
            highlightthickness=0
        )
        cancel_btn.pack(fill="x", pady=8)
        
        # Bind Enter key
        current_pwd_entry.bind("<Return>", lambda e: new_pwd_entry.focus())
        new_pwd_entry.bind("<Return>", lambda e: confirm_pwd_entry.focus())
        confirm_pwd_entry.bind("<Return>", lambda e: perform_password_change())
    
    def change_password_action(self):
        """Handle change password action"""
        # Create password change dialog with professional styling
        change_pwd_dialog = tk.Toplevel(self.root)
        change_pwd_dialog.title("Change Master Password")
        change_pwd_dialog.geometry("450x420")
        change_pwd_dialog.resizable(False, False)
        change_pwd_dialog.configure(bg=COLORS["bg_primary"])
        
        # Center dialog
        change_pwd_dialog.transient(self.root)
        change_pwd_dialog.grab_set()
        
        # Header frame
        header_frame = tk.Frame(change_pwd_dialog, bg=COLORS["bg_secondary"], highlightthickness=0)
        header_frame.pack(fill="x", pady=0)
        
        # Title
        title_label = tk.Label(
            header_frame,
            text="🔑 Change Master Password",
            font=("Segoe UI", 14, "bold"),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            padx=20,
            pady=20
        )
        title_label.pack()
        
        # Content frame
        content_frame = tk.Frame(change_pwd_dialog, bg=COLORS["bg_primary"], highlightthickness=0)
        content_frame.pack(fill="both", expand=True, padx=20, pady=20)
        
        # Current password label
        current_label = tk.Label(
            content_frame,
            text="Current Password",
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"],
            anchor="w"
        )
        current_label.pack(fill="x", pady=(0, 6))
        
        # Current password entry
        current_pwd_entry = tk.Entry(
            content_frame,
            show="●",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        current_pwd_entry.pack(fill="x", pady=(0, 16), ipady=8)
        current_pwd_entry.focus()
        
        # New password label
        new_label = tk.Label(
            content_frame,
            text="New Password (min 6 characters)",
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"],
            anchor="w"
        )
        new_label.pack(fill="x", pady=(0, 6))
        
        # New password entry
        new_pwd_entry = tk.Entry(
            content_frame,
            show="●",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        new_pwd_entry.pack(fill="x", pady=(0, 16), ipady=8)
        
        # Confirm new password label
        confirm_label = tk.Label(
            content_frame,
            text="Confirm New Password",
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["bg_primary"],
            fg=COLORS["text_primary"],
            anchor="w"
        )
        confirm_label.pack(fill="x", pady=(0, 6))
        
        # Confirm new password entry
        confirm_pwd_entry = tk.Entry(
            content_frame,
            show="●",
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            border=1,
            relief="solid",
            insertbackground=COLORS["accent_blue"]
        )
        confirm_pwd_entry.pack(fill="x", pady=(0, 30), ipady=8)
        
        def perform_password_change():
            current_pwd = current_pwd_entry.get()
            new_pwd = new_pwd_entry.get()
            confirm_pwd = confirm_pwd_entry.get()
            
            # Validate inputs
            if not current_pwd or not new_pwd or not confirm_pwd:
                messagebox.showerror("Error", "Please fill in all fields")
                return
            
            if new_pwd != confirm_pwd:
                messagebox.showerror("Error", "New passwords do not match")
                confirm_pwd_entry.delete(0, tk.END)
                new_pwd_entry.delete(0, tk.END)
                new_pwd_entry.focus()
                return
            
            # Attempt to change password
            success, message = auth.change_master_password(current_pwd, new_pwd)
            
            if success:
                self.current_password = new_pwd
                messagebox.showinfo("Success", message)
                change_pwd_dialog.destroy()
            else:
                messagebox.showerror("Error", message)
                current_pwd_entry.delete(0, tk.END)
                current_pwd_entry.focus()
        
        # Button frame
        button_frame = tk.Frame(content_frame, bg=COLORS["bg_primary"], highlightthickness=0)
        button_frame.pack(fill="x")
        
        # Change button
        change_btn = tk.Button(
            button_frame,
            text="Change Password",
            command=perform_password_change,
            font=("Segoe UI", 11, "bold"),
            bg=COLORS["accent_blue"],
            fg="white",
            padx=15,
            pady=10,
            relief="flat",
            cursor="hand2",
            activebackground="#0056C0",
            activeforeground="white",
            border=0,
            highlightthickness=0
        )
        change_btn.pack(side="left", fill="x", expand=True, padx=(0, 8))
        
        # Cancel button
        cancel_btn = tk.Button(
            button_frame,
            text="Cancel",
            command=change_pwd_dialog.destroy,
            font=("Segoe UI", 11),
            bg=COLORS["bg_secondary"],
            fg=COLORS["text_primary"],
            padx=15,
            pady=10,
            relief="flat",
            cursor="hand2",
            activebackground=COLORS["bg_tertiary"],
            activeforeground=COLORS["text_primary"],
            border=0,
            highlightthickness=0
        )
        cancel_btn.pack(side="left", fill="x", expand=True)
        
        # Bind Enter key to current password field
        current_pwd_entry.bind("<Return>", lambda e: new_pwd_entry.focus())
        new_pwd_entry.bind("<Return>", lambda e: confirm_pwd_entry.focus())
        confirm_pwd_entry.bind("<Return>", lambda e: perform_password_change())


def main():
    """Main entry point"""
    root = tk.Tk()
    app = SecureFileLocker(root)
    root.mainloop()


if __name__ == "__main__":
    main()
