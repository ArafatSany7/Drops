const prisma = require('../lib/prisma');

/**
 * Submit a contact message (public)
 */
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide name, email, subject, and message' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      data: contactMessage
    });
  } catch (error) {
    console.error('Submit Contact Error:', error);
    res.status(500).json({ message: 'Server Error while submitting your message' });
  }
};

/**
 * Get all contact messages (Admin only) - with pagination
 */
const getMessages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};
    if (status) where.status = status;

    const [messages, totalCount] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contactMessage.count({ where })
    ]);

    res.json({
      success: true,
      data: messages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / take),
        totalCount,
        limit: take
      }
    });
  } catch (error) {
    console.error('Get Messages Error:', error);
    res.status(500).json({ message: 'Server Error while fetching messages' });
  }
};

/**
 * Mark message as read (Admin only)
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status: 'READ' }
    });

    res.json({ success: true, data: message });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Message not found' });
    }
    console.error('Mark As Read Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  submitContact,
  getMessages,
  markAsRead
};
