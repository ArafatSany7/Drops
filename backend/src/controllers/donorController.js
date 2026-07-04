const prisma = require('../lib/prisma');




const getDonors = async (req, res) => {
  try {
    const { bloodGroup, district } = req.query;

    
    const query = {
      where: {}
    };

    if (bloodGroup) {
      query.where.bloodGroup = bloodGroup;
    }

    if (district) {
      query.where.district = {
        contains: district,
        mode: 'insensitive' 
      };
    }

    
    const donors = await prisma.user.findMany({
      where: query.where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        bloodGroup: true,
        district: true,
        gender: true,
        lastDonationDate: true,
        isVerified: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    
    const totalCount = await prisma.user.count({
      where: query.where
    });

    res.json({
      success: true,
      count: totalCount,
      data: donors
    });
  } catch (error) {
    console.error('Fetch Donors Error:', error);
    res.status(500).json({ message: 'Server Error while fetching donors' });
  }
};

module.exports = {
  getDonors
};
