const prisma = require('../lib/prisma');




const getStats = async (req, res) => {
  try {
    
    const totalUsers = await prisma.user.count();

    
    const fulfilledRequests = await prisma.bloodRequest.count({
      where: {
        status: 'FULFILLED'
      }
    });
    const livesImpacted = fulfilledRequests * 3;

    
    
    const uniqueDistrictsQuery = await prisma.user.findMany({
      select: {
        district: true,
      },
      distinct: ['district'],
      where: {
        district: {
          not: null
        }
      }
    });
    const districtsCovered = uniqueDistrictsQuery.length;

    res.json({
      success: true,
      data: {
        totalUsers,
        livesImpacted,
        districtsCovered,
      }
    });
  } catch (error) {
    console.error('Fetch Stats Error:', error);
    res.status(500).json({ message: 'Server Error while fetching statistics' });
  }
};

module.exports = {
  getStats
};
