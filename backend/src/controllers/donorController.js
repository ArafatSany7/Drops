const prisma = require('../lib/prisma');

/**
 * Get donors with pagination, search, filtering, and sorting
 */
const getDonors = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      bloodGroup,
      district,
      gender,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      bloodGroup: { not: null }
    };

    if (bloodGroup && bloodGroup !== 'All groups') {
      where.bloodGroup = bloodGroup;
    }

    if (district && district.trim()) {
      where.district = {
        contains: district.trim(),
        mode: 'insensitive'
      };
    }

    if (gender && gender !== 'All') {
      where.gender = gender;
    }

    if (search && search.trim()) {
      where.OR = [
        { firstName: { contains: search.trim(), mode: 'insensitive' } },
        { lastName: { contains: search.trim(), mode: 'insensitive' } }
      ];
      // If other filters are already set, we need to restructure
      if (where.bloodGroup || where.district || where.gender) {
        const andConditions = [];
        if (where.bloodGroup) {
          andConditions.push({ bloodGroup: where.bloodGroup });
          delete where.bloodGroup;
        }
        if (where.district) {
          andConditions.push({ district: where.district });
          delete where.district;
        }
        if (where.gender) {
          andConditions.push({ gender: where.gender });
          delete where.gender;
        }
        where.AND = andConditions;
      }
    }

    // Map frontend sort options to Prisma fields
    const validSortFields = ['createdAt', 'firstName', 'lastName', 'bloodGroup', 'district'];
    const finalSortBy = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const finalSortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    const [donors, totalCount] = await Promise.all([
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
          lastDonationDate: true,
          isVerified: true,
          availableForDonation: true,
          createdAt: true
        },
        skip,
        take,
        orderBy: { [finalSortBy]: finalSortOrder }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      count: totalCount,
      data: donors,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / take),
        totalCount,
        limit: take
      }
    });
  } catch (error) {
    console.error('Fetch Donors Error:', error);
    res.status(500).json({ message: 'Server Error while fetching donors' });
  }
};

/**
 * Get single donor by ID (public)
 */
const getDonorById = async (req, res) => {
  try {
    const { id } = req.params;

    const donor = await prisma.user.findUnique({
      where: { id },
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
        isVerified: true,
        availableForDonation: true,
        createdAt: true
      }
    });

    if (!donor || !donor.bloodGroup) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Get related donors (same blood group, same district, exclude current)
    const relatedDonors = await prisma.user.findMany({
      where: {
        id: { not: id },
        bloodGroup: donor.bloodGroup,
        district: donor.district ? { contains: donor.district, mode: 'insensitive' } : undefined,
        availableForDonation: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bloodGroup: true,
        district: true,
        gender: true,
        availableForDonation: true
      },
      take: 6
    });

    res.json({
      success: true,
      data: donor,
      relatedDonors
    });
  } catch (error) {
    console.error('Get Donor By ID Error:', error);
    res.status(500).json({ message: 'Server Error while fetching donor' });
  }
};

module.exports = {
  getDonors,
  getDonorById
};
