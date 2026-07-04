const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const prisma = require('../lib/prisma');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';




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

    
    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields including phone number' });
    }

    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        dob: dob ? new Date(dob) : null,
        gender,
        bloodGroup,
        district,
        phone,
      }
    });

    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bloodGroup: user.bloodGroup,
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};




const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    
    const user = await prisma.user.findUnique({ where: { email } });
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

    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

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
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};




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
      // Link googleId if user exists but hasn't linked Google
      user = await prisma.user.update({
        where: { email },
        data: { googleId }
      });
    }

    
    const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

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
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google token or Server Error' });
  }
};




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
      console.error('JWT Verification Error:', err.message, 'Token:', token);
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
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (dob) updateData.dob = new Date(dob);
    if (gender) updateData.gender = gender;
    if (bloodGroup) updateData.bloodGroup = bloodGroup;
    if (district) updateData.district = district;
    if (lastDonationDate) updateData.lastDonationDate = new Date(lastDonationDate);
    if (availableForDonation !== undefined) updateData.availableForDonation = availableForDonation;
    if (phone) updateData.phone = phone;

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: updateData
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bloodGroup: user.bloodGroup,
        district: user.district,
        gender: user.gender,
        phone: user.phone,
        dob: user.dob,
        lastDonationDate: user.lastDonationDate,
        availableForDonation: user.availableForDonation
      }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found in database. Please log out and log back in.' });
    }
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server Error while updating profile' });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  updateProfile
};
