const prisma = require('../lib/prisma');




const getUrgentRequests = async (req, res) => {
  try {
    const requests = await prisma.bloodRequest.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        requester: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 
    });

    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('Fetch Urgent Requests Error:', error);
    res.status(500).json({ message: 'Server Error while fetching urgent requests' });
  }
};




const createRequest = async (req, res) => {
  try {
    const { patientName, bloodGroupNeeded, hospitalName, district, urgencyLevel } = req.body;
    
    
    const requesterId = req.user.id; 

    if (!patientName || !bloodGroupNeeded || !hospitalName || !district || !urgencyLevel) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newRequest = await prisma.bloodRequest.create({
      data: {
        patientName,
        bloodGroupNeeded,
        hospitalName,
        district,
        urgencyLevel,
        requesterId,
      }
    });

    res.status(201).json({
      success: true,
      message: 'Blood request created successfully',
      data: newRequest
    });
  } catch (error) {
    console.error('Create Request Error:', error);
    res.status(500).json({ message: 'Server Error while creating request' });
  }
};

module.exports = {
  getUrgentRequests,
  createRequest
};
