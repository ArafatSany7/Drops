const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

/**
 * Get all users (Admin only) - with pagination, search, filtering
 */
const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      bloodGroup,
      district,
      role,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (bloodGroup) where.bloodGroup = bloodGroup;
    if (district) where.district = { contains: district, mode: 'insensitive' };
    if (role) where.role = role;

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          bloodGroup: true,
          district: true,
          gender: true,
          role: true,
          isVerified: true,
          availableForDonation: true,
          createdAt: true
        },
        skip,
        take,
        orderBy: { [sortBy]: sortOrder }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / take),
        totalCount,
        limit: take
      }
    });
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: 'Server Error while fetching users' });
  }
};

/**
 * Update user role (Admin only)
 */
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be USER or ADMIN.' });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: user
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    console.error('Update User Role Error:', error);
    res.status(500).json({ message: 'Server Error while updating user role' });
  }
};

/**
 * Get dashboard statistics (Admin)
 */
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalDonors,
      activeRequests,
      fulfilledRequests,
      totalBlogPosts,
      unreadMessages
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { bloodGroup: { not: null }, availableForDonation: true } }),
      prisma.bloodRequest.count({ where: { status: 'ACTIVE' } }),
      prisma.bloodRequest.count({ where: { status: 'FULFILLED' } }),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { status: 'UNREAD' } })
    ]);

    // Blood group distribution
    const bloodGroupDist = await prisma.user.groupBy({
      by: ['bloodGroup'],
      _count: { bloodGroup: true },
      where: { bloodGroup: { not: null } }
    });

    // Monthly registrations (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRegistrations = await prisma.user.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true }
    });

    const monthlyData = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      monthlyData[key] = 0;
    }
    monthlyRegistrations.forEach(u => {
      const d = new Date(u.createdAt);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      if (monthlyData[key] !== undefined) monthlyData[key]++;
    });

    // Monthly donations (requests fulfilled per month)
    const monthlyRequests = await prisma.bloodRequest.findMany({
      where: { createdAt: { gte: sixMonthsAgo }, status: 'FULFILLED' },
      select: { createdAt: true }
    });

    const donationData = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      donationData[key] = 0;
    }
    monthlyRequests.forEach(r => {
      const d = new Date(r.createdAt);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      if (donationData[key] !== undefined) donationData[key]++;
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalDonors,
          activeRequests,
          fulfilledRequests,
          totalBlogPosts,
          unreadMessages,
          livesImpacted: fulfilledRequests * 3
        },
        bloodGroupDistribution: bloodGroupDist.map(bg => ({
          name: bg.bloodGroup,
          value: bg._count.bloodGroup
        })),
        monthlyRegistrations: Object.entries(monthlyData).map(([month, count]) => ({
          month,
          users: count
        })),
        monthlyDonations: Object.entries(donationData).map(([month, count]) => ({
          month,
          donations: count
        }))
      }
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ message: 'Server Error while fetching dashboard stats' });
  }
};

/**
 * Delete a user (Admin only)
 */
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Don't allow deleting yourself
    if (userId === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account from admin panel' });
    }

    await prisma.bloodRequest.deleteMany({ where: { requesterId: userId } });
    await prisma.blogPost.deleteMany({ where: { authorId: userId } });
    await prisma.user.delete({ where: { id: userId } });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Server Error while deleting user' });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  getDashboardStats,
  deleteUser
};
