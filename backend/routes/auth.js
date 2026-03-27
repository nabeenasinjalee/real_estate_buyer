const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Validation Functions
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return false;
    if (email.length > 100) return false;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
    return nameRegex.test(name);
};

// Enhanced Login with specific error messages
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Email and password are required',
                error: 'MISSING_CREDENTIALS',
                errors: {
                    email: !email ? 'Email is required' : null,
                    password: !password ? 'Password is required' : null
                }
            });
        }

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
                error: 'INVALID_EMAIL_FORMAT',
                errors: {
                    email: 'Please enter a valid email address (e.g., name@example.com)'
                }
            });
        }

        db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], async (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Database error occurred',
                    error: 'DATABASE_ERROR'
                });
            }

            // Check if user exists - return 404 for user not found
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'User not found',
                    error: 'USER_NOT_FOUND',
                    errors: {
                        email: 'No account found with this email address'
                    }
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Invalid password',
                    error: 'INVALID_PASSWORD',
                    errors: {
                        password: 'The password you entered is incorrect'
                    }
                });
            }

            // Generate token
            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Successful login
            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: { 
                    id: user.id, 
                    email: user.email, 
                    name: user.name, 
                    role: user.role 
                }
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred',
            error: 'SERVER_ERROR'
        });
    }
});

// Enhanced Registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, role = 'buyer' } = req.body;

        // Validate required fields
        const missingFields = [];
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!name) missingFields.push('name');

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                success: false,
                message: 'Missing required fields',
                error: 'MISSING_FIELDS',
                errors: {
                    email: !email ? 'Email is required' : null,
                    password: !password ? 'Password is required' : null,
                    name: !name ? 'Name is required' : null
                }
            });
        }

        // Validate name
        if (!validateName(name)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid name format',
                error: 'INVALID_NAME',
                errors: {
                    name: 'Name must be 2-50 characters long and contain only letters, spaces, and hyphens'
                }
            });
        }

        // Validate email
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
                error: 'INVALID_EMAIL',
                errors: {
                    email: 'Please enter a valid email address (e.g., user@example.com)'
                }
            });
        }

        // Validate password
        if (!validatePassword(password)) {
            const passwordErrors = [];
            if (password.length < 8) passwordErrors.push('At least 8 characters');
            if (!/[A-Z]/.test(password)) passwordErrors.push('One uppercase letter');
            if (!/[a-z]/.test(password)) passwordErrors.push('One lowercase letter');
            if (!/\d/.test(password)) passwordErrors.push('One number');
            if (!/[@$!%*?&]/.test(password)) passwordErrors.push('One special character (@$!%*?&)');
            
            return res.status(400).json({
                success: false,
                message: 'Password does not meet security requirements',
                error: 'WEAK_PASSWORD',
                errors: {
                    password: `Password must contain: ${passwordErrors.join(', ')}`
                }
            });
        }

        // Check if user exists
        db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], async (err, existingUser) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Database error occurred',
                    error: 'DATABASE_ERROR'
                });
            }

            if (existingUser) {
                return res.status(409).json({ 
                    success: false,
                    message: 'User already exists',
                    error: 'USER_ALREADY_EXISTS',
                    errors: {
                        email: 'An account with this email already exists. Please login instead.'
                    }
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Insert user
            db.run(
                'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
                [email.toLowerCase(), hashedPassword, name.trim(), role],
                function(err) {
                    if (err) {
                        console.error('Insert error:', err);
                        return res.status(500).json({ 
                            success: false,
                            message: 'Error creating user',
                            error: 'CREATE_USER_ERROR'
                        });
                    }

                    // Generate token
                    const token = jwt.sign(
                        { id: this.lastID, email: email.toLowerCase(), name: name.trim(), role },
                        JWT_SECRET,
                        { expiresIn: '24h' }
                    );

                    res.status(201).json({
                        success: true,
                        message: 'Registration successful',
                        token,
                        user: { 
                            id: this.lastID, 
                            email: email.toLowerCase(), 
                            name: name.trim(), 
                            role 
                        }
                    });
                }
            );
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred',
            error: 'SERVER_ERROR'
        });
    }
});

// Password strength checker
router.post('/check-password-strength', (req, res) => {
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Password is required',
            error: 'NO_PASSWORD'
        });
    }
    
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password)
    };
    
    const strength = Object.values(checks).filter(Boolean).length;
    let strengthLevel = 'Weak';
    let isValid = false;
    
    if (strength === 5) {
        strengthLevel = 'Strong';
        isValid = true;
    } else if (strength >= 3) {
        strengthLevel = 'Medium';
    }
    
    res.json({
        success: true,
        strength: strengthLevel,
        checks,
        isValid,
        message: isValid ? 'Password is strong' : 'Password needs improvement',
        requirements: {
            minLength: 8,
            needsUppercase: !checks.uppercase,
            needsLowercase: !checks.lowercase,
            needsNumber: !checks.number,
            needsSpecial: !checks.special
        }
    });
});

// Email availability check
router.post('/check-email', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required',
            error: 'NO_EMAIL'
        });
    }
    
    if (!validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format',
            error: 'INVALID_EMAIL'
        });
    }
    
    db.get('SELECT email FROM users WHERE email = ?', [email.toLowerCase()], (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Database error',
                error: 'DATABASE_ERROR'
            });
        }
        
        res.json({
            success: true,
            available: !user,
            message: user ? 'Email already registered' : 'Email is available'
        });
    });
});

module.exports = router;