const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const prisma = require('../lib/prisma');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

const userSelectFields = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  bloodGroup: true,
  phone: true,
  district: true,
  gender: true,
  dob: true,
  lastDonationDate: true,
  availableForDonation: true,
  role: true,
};

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dob,
      gender,
      bloodGroup,
      district,
      phone
    } = req.body;

    // Validation
    const errors = {};
    if (!firstName || firstName.trim().length < 2) errors.firstName = 'First name must be at least 2 characters';
    if (!lastName || lastName.trim().length < 1) errors.lastName = 'Last name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!phone) errors.phone = 'Phone number is required';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        dob: dob ? new Date(dob) : null,
        gender: gender || null,
        bloodGroup: bloodGroup || null,
        district: district || null,
        phone: phone.trim(),
      },
      select: userSelectFields
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Login with email and password
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.passwordHash) {
      return res.status(400).json({ message: 'Please login using Google' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bloodGroup: user.bloodGroup,
        phone: user.phone,
        district: user.district,
        gender: user.gender,
        dob: user.dob,
        lastDonationDate: user.lastDonationDate,
        availableForDonation: user.availableForDonation,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Google OAuth login/register
 */
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Google token is required' });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId,
          email,
          firstName: firstName || 'User',
          lastName: lastName || '',
        }
      });
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { email },
        data: { googleId }
      });
    }

    const jwtToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Google login successful',
      token: jwtToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bloodGroup: user.bloodGroup,
        phone: user.phone,
        district: user.district,
        gender: user.gender,
        dob: user.dob,
        lastDonationDate: user.lastDonationDate,
        availableForDonation: user.availableForDonation,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google token or Server Error' });
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized, no token' });
    }
    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized, invalid or expired token' });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Unauthorized, invalid token payload' });
    }

    const {
      firstName,
      lastName,
      dob,
      gender,
      bloodGroup,
      district,
      lastDonationDate,
      availableForDonation,
      phone
    } = req.body;

    const updateData = {};
    if (firstName) updateData.firstName = firstName.trim();
    if (lastName) updateData.lastName = lastName.trim();
    if (dob) updateData.dob = new Date(dob);
    if (gender) updateData.gender = gender;
    if (bloodGroup) updateData.bloodGroup = bloodGroup;
    if (district) updateData.district = district;
    if (lastDonationDate) updateData.lastDonationDate = new Date(lastDonationDate);
    if (availableForDonation !== undefined) updateData.availableForDonation = availableForDonation;
    if (phone) updateData.phone = phone.trim();

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: updateData,
      select: userSelectFields
    });

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found in database. Please log out and log back in.' });
    }
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server Error while updating profile' });
  }
};

/**
 * Get current user profile
 */
const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: userSelectFields
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Seed Demo Accounts (Temporary endpoint)
 */
const seedDemoAccounts = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);
    const adminPasswordHash = await bcrypt.hash('admin123', 10);

    // Demo User
    await prisma.user.upsert({
      where: { email: 'user@drops.com' },
      update: { passwordHash: passwordHash },
      create: {
        firstName: 'Demo',
        lastName: 'User',
        email: 'user@drops.com',
        passwordHash: passwordHash,
        bloodGroup: 'O+',
        district: 'Dhaka',
        gender: 'Male',
        availableForDonation: true,
        role: 'USER',
        phone: '01700000000'
      },
    });

    // Demo Admin
    await prisma.user.upsert({
      where: { email: 'admin@drops.com' },
      update: { passwordHash: adminPasswordHash, role: 'ADMIN' },
      create: {
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@drops.com',
        passwordHash: adminPasswordHash,
        bloodGroup: 'AB+',
        district: 'Dhaka',
        gender: 'Male',
        availableForDonation: false,
        role: 'ADMIN',
        phone: '01700000001'
      },
    });

    res.json({ message: 'Demo accounts seeded successfully' });
  } catch (error) {
    console.error('Seed Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  updateProfile,
  getMe,
  seedDemoAccounts
};
