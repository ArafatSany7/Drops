const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  const adminPasswordHash = await bcrypt.hash('admin123', 10);

  // Demo User
  await prisma.user.upsert({
    where: { email: 'user@drops.com' },
    update: { password: passwordHash },
    create: {
      firstName: 'Demo',
      lastName: 'User',
      email: 'user@drops.com',
      password: passwordHash,
      bloodGroup: 'O+',
      district: 'Dhaka',
      gender: 'Male',
      availableForDonation: true,
      role: 'USER',
    },
  });

  // Demo Admin
  await prisma.user.upsert({
    where: { email: 'admin@drops.com' },
    update: { password: adminPasswordHash, role: 'ADMIN' },
    create: {
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@drops.com',
      password: adminPasswordHash,
      bloodGroup: 'AB+',
      district: 'Dhaka',
      gender: 'Male',
      availableForDonation: false,
      role: 'ADMIN',
    },
  });

  console.log('Demo accounts created/updated successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
