require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('./lib/prisma');

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.contactMessage.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.bloodRequest.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  const adminHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'Drops',
      email: 'admin@drops.com',
      passwordHash: adminHash,
      phone: '+8801700000001',
      gender: 'Male',
      bloodGroup: 'O+',
      district: 'Dhaka',
      role: 'ADMIN',
      isVerified: true,
      availableForDonation: true,
      dob: new Date('1990-01-15'),
    }
  });

  // Create Demo User
  const userHash = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.create({
    data: {
      firstName: 'Rahim',
      lastName: 'Uddin',
      email: 'user@drops.com',
      passwordHash: userHash,
      phone: '+8801700000002',
      gender: 'Male',
      bloodGroup: 'A+',
      district: 'Dhaka',
      role: 'USER',
      isVerified: true,
      availableForDonation: true,
      dob: new Date('1995-06-20'),
      lastDonationDate: new Date('2026-05-10'),
    }
  });

  // Create sample donors
  const donors = [
    { firstName: 'Sumaiya', lastName: 'Noor', email: 'sumaiya@example.com', phone: '+8801711111111', gender: 'Female', bloodGroup: 'B+', district: 'Chittagong', dob: new Date('1998-03-12') },
    { firstName: 'Tasnim', lastName: 'Hosain', email: 'tasnim@example.com', phone: '+8801722222222', gender: 'Female', bloodGroup: 'O-', district: 'Dhaka', dob: new Date('1997-09-05') },
    { firstName: 'Armaan', lastName: 'Rahim', email: 'armaan@example.com', phone: '+8801733333333', gender: 'Male', bloodGroup: 'A+', district: 'Sylhet', dob: new Date('1996-11-22') },
    { firstName: 'Fahim', lastName: 'Chowdhury', email: 'fahim@example.com', phone: '+8801744444444', gender: 'Male', bloodGroup: 'AB+', district: 'Rajshahi', dob: new Date('1994-07-18') },
    { firstName: 'Nadia', lastName: 'Rahman', email: 'nadia@example.com', phone: '+8801755555555', gender: 'Female', bloodGroup: 'B-', district: 'Dhaka', dob: new Date('1999-01-30') },
    { firstName: 'Hasan', lastName: 'Mahmud', email: 'hasan@example.com', phone: '+8801766666666', gender: 'Male', bloodGroup: 'O+', district: 'Khulna', dob: new Date('1993-04-14') },
    { firstName: 'Rima', lastName: 'Akter', email: 'rima@example.com', phone: '+8801777777777', gender: 'Female', bloodGroup: 'A-', district: 'Barisal', dob: new Date('2000-08-25') },
    { firstName: 'Kamal', lastName: 'Hossain', email: 'kamal@example.com', phone: '+8801788888888', gender: 'Male', bloodGroup: 'AB-', district: 'Rangpur', dob: new Date('1991-12-03') },
    { firstName: 'Shirin', lastName: 'Sultana', email: 'shirin@example.com', phone: '+8801799999999', gender: 'Female', bloodGroup: 'O+', district: 'Comilla', dob: new Date('1995-05-17') },
    { firstName: 'Rafiq', lastName: 'Islam', email: 'rafiq@example.com', phone: '+8801700000003', gender: 'Male', bloodGroup: 'B+', district: 'Dhaka', dob: new Date('1992-02-28'), lastDonationDate: new Date('2026-07-01') },
    { firstName: 'Mitu', lastName: 'Begum', email: 'mitu@example.com', phone: '+8801700000004', gender: 'Female', bloodGroup: 'A+', district: 'Mymensingh', dob: new Date('1997-10-11') },
    { firstName: 'Jamal', lastName: 'Ahmed', email: 'jamal@example.com', phone: '+8801700000005', gender: 'Male', bloodGroup: 'O-', district: 'Sylhet', dob: new Date('1990-06-09') },
  ];

  const donorHash = await bcrypt.hash('donor123', 10);
  for (const donor of donors) {
    await prisma.user.create({
      data: {
        ...donor,
        passwordHash: donorHash,
        isVerified: true,
        availableForDonation: true,
        lastDonationDate: donor.lastDonationDate || null,
      }
    });
  }

  // Create blood requests
  const bloodRequests = [
    { patientName: 'Abdul Karim', bloodGroupNeeded: 'O+', hospitalName: 'Square Hospital', district: 'Dhaka', urgencyLevel: 'CRITICAL', status: 'ACTIVE' },
    { patientName: 'Fatema Khatun', bloodGroupNeeded: 'B+', hospitalName: 'Evercare Hospital', district: 'Chittagong', urgencyLevel: 'HIGH', status: 'ACTIVE' },
    { patientName: 'Mohammad Ali', bloodGroupNeeded: 'A-', hospitalName: 'Apollo Hospital', district: 'Sylhet', urgencyLevel: 'CRITICAL', status: 'ACTIVE' },
    { patientName: 'Sadia Jahan', bloodGroupNeeded: 'AB+', hospitalName: 'United Hospital', district: 'Dhaka', urgencyLevel: 'MEDIUM', status: 'FULFILLED' },
    { patientName: 'Iqbal Hossain', bloodGroupNeeded: 'O-', hospitalName: 'Labaid Hospital', district: 'Rajshahi', urgencyLevel: 'HIGH', status: 'FULFILLED' },
  ];

  for (const request of bloodRequests) {
    await prisma.bloodRequest.create({
      data: {
        ...request,
        requesterId: demoUser.id,
      }
    });
  }

  // Create blog posts
  const blogPosts = [
    {
      title: 'Why Regular Blood Donation Matters',
      slug: 'why-regular-blood-donation-matters',
      excerpt: 'Discover the life-saving impact of regular blood donations and why your contribution is more important than ever.',
      content: `Blood donation is one of the most impactful ways to contribute to your community. Every two seconds, someone in the world needs blood. A single donation can save up to three lives, making it one of the most efficient acts of generosity.\n\n## The Growing Need\n\nHospitals across Bangladesh require over 8 million units of blood annually, yet only about 6 million units are collected. This gap puts thousands of patients at risk, particularly those undergoing surgeries, cancer treatments, or emergency procedures.\n\n## Health Benefits for Donors\n\nContrary to common misconceptions, donating blood actually has health benefits for the donor:\n\n- **Reduces iron overload**: Excess iron can damage organs. Regular donation helps maintain healthy iron levels.\n- **Free health screening**: Every donation includes a mini physical exam and blood tests.\n- **Burns calories**: Donating one pint of blood burns approximately 650 calories.\n- **Reduces heart attack risk**: Studies show regular donors have a 33% lower risk of cardiovascular events.\n\n## How Often Can You Donate?\n\nHealthy adults can donate whole blood every 56 days (about 8 weeks). Platelet donors can give every 7 days, up to 24 times per year.\n\n## Take Action Today\n\nJoin the Drops community and register as a donor. Your regular contributions create a reliable blood supply that saves lives every single day.`,
      coverImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop',
      category: 'Health',
      tags: ['donation', 'health', 'community'],
    },
    {
      title: 'Understanding Blood Types: A Complete Guide',
      slug: 'understanding-blood-types-complete-guide',
      excerpt: 'Learn about the different blood types, compatibility charts, and why knowing your blood type could save your life.',
      content: `Understanding blood types is crucial for safe transfusions and emergency preparedness. The ABO system and Rh factor together determine your blood type.\n\n## The ABO System\n\nThere are four main blood groups:\n\n- **Type A**: Has A antigens on red blood cells, anti-B antibodies in plasma\n- **Type B**: Has B antigens on red blood cells, anti-A antibodies in plasma\n- **Type AB**: Has both A and B antigens, no antibodies (universal recipient)\n- **Type O**: Has no antigens, both anti-A and anti-B antibodies (universal donor)\n\n## The Rh Factor\n\nThe Rh factor (positive or negative) adds another layer:\n- **Rh Positive (+)**: Has the Rh protein\n- **Rh Negative (-)**: Lacks the Rh protein\n\n## Compatibility Chart\n\n| Blood Type | Can Donate To | Can Receive From |\n|-----------|---------------|------------------|\n| O-        | All types     | O- only          |\n| O+        | O+, A+, B+, AB+ | O+, O-        |\n| A-        | A-, A+, AB-, AB+ | A-, O-        |\n| A+        | A+, AB+       | A+, A-, O+, O-  |\n| B-        | B-, B+, AB-, AB+ | B-, O-        |\n| B+        | B+, AB+       | B+, B-, O+, O-  |\n| AB-       | AB-, AB+      | AB-, A-, B-, O- |\n| AB+       | AB+ only      | All types        |\n\n## Why It Matters in Bangladesh\n\nIn Bangladesh, the most common blood types are B+ (35%) and O+ (30%). Rare types like AB- and O- are critically important to maintain in blood banks.\n\nKnowing your blood type and registering as a donor on Drops ensures that you can be reached quickly when someone with a compatible type needs help.`,
      coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop',
      category: 'Education',
      tags: ['blood types', 'education', 'compatibility'],
    },
    {
      title: 'How Drops is Transforming Emergency Blood Access',
      slug: 'drops-transforming-emergency-blood-access',
      excerpt: 'See how technology is bridging the gap between blood donors and patients in critical need across Bangladesh.',
      content: `When Aisha needed O- blood urgently at 2 AM for her mother's emergency surgery, traditional methods would have taken hours. With Drops, she found a verified donor within 12 minutes.\n\n## The Problem We Solve\n\nBefore Drops, finding blood donors during emergencies meant:\n- Posting frantically on social media\n- Calling dozens of contacts\n- Visiting multiple blood banks\n- Precious hours lost when minutes matter\n\n## Our Technology\n\nDrops uses an intelligent matching algorithm that considers:\n\n1. **Blood type compatibility**: Exact and compatible matches\n2. **Geographic proximity**: Nearest available donors first\n3. **Availability status**: Only contacts willing and eligible donors\n4. **Response history**: Prioritizes donors with faster response times\n\n## Impact Numbers\n\nSince launch, Drops has:\n- Connected over 24,000 active donors\n- Facilitated blood access in 42 districts\n- Reduced average donor finding time to under 15 minutes\n- Maintained a 94% successful match rate\n\n## What's Next\n\nWe're working on:\n- Real-time GPS-based donor matching\n- Integration with hospital blood bank systems\n- Predictive analytics for blood demand forecasting\n- Mobile app with push notifications for urgent requests\n\nJoin us in making blood scarcity a thing of the past.`,
      coverImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop',
      category: 'Technology',
      tags: ['technology', 'innovation', 'emergency'],
    },
    {
      title: 'Preparing for Your First Blood Donation',
      slug: 'preparing-first-blood-donation',
      excerpt: 'Everything first-time donors need to know, from eligibility requirements to post-donation care tips.',
      content: `Donating blood for the first time can feel daunting, but with the right preparation, it's a simple, safe, and deeply rewarding experience.\n\n## Before Your Donation\n\n### Eligibility Check\n- Be at least 18 years old\n- Weigh at least 50 kg (110 lbs)\n- Be in good general health\n- Not have donated blood in the last 56 days\n\n### The Day Before\n- Drink plenty of water (at least 2 liters)\n- Get a good night's sleep (7-8 hours)\n- Eat iron-rich foods (spinach, red meat, lentils)\n\n### Day of Donation\n- Eat a healthy meal 2-3 hours before\n- Wear comfortable clothing with sleeves that roll up easily\n- Bring a valid ID\n- Avoid alcohol and caffeine\n\n## During the Donation\n\nThe actual blood draw takes only 8-10 minutes. Here's what happens:\n\n1. **Registration**: Fill out a health questionnaire\n2. **Mini physical**: Blood pressure, temperature, hemoglobin check\n3. **Donation**: Comfortable reclined position, small needle insertion\n4. **Rest**: 10-15 minutes of rest with refreshments\n\n## After Your Donation\n\n- Drink extra fluids for the next 24 hours\n- Avoid strenuous exercise for 24 hours\n- Keep the bandage on for 4-5 hours\n- If you feel dizzy, lie down with feet elevated\n- Enjoy the feeling of knowing you may have saved up to 3 lives!\n\n## Common Myths Debunked\n\n**Myth**: Donating blood makes you weak.\n**Fact**: Your body replaces the donated blood volume within 24 hours.\n\n**Myth**: You can get diseases from donating.\n**Fact**: All equipment is sterile and single-use. Zero infection risk.\n\n**Myth**: It's very painful.\n**Fact**: You'll feel a brief pinch. Most donors describe it as less painful than a mosquito bite.`,
      coverImage: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=800&auto=format&fit=crop',
      category: 'Guide',
      tags: ['first-time', 'preparation', 'guide'],
    },
    {
      title: 'Blood Donation Camps: Community Impact Stories',
      slug: 'blood-donation-camps-community-impact',
      excerpt: 'Highlights from recent blood donation camps organized by Drops volunteers across Bangladesh.',
      content: `Our volunteer network has been organizing blood donation camps across Bangladesh, bringing the gift of life directly to communities.\n\n## Dhaka University Camp – March 2026\n\nOver 200 students participated in our largest campus drive. The event collected 180 units of blood, enough to potentially save 540 lives. Student volunteer coordinator Mehedi Hasan noted: "The response was overwhelming. Many students donated for the first time."\n\n## Chittagong Community Drive – April 2026\n\nPartnering with Evercare Hospital, we set up a weekend camp in the Agrabad commercial area. The camp specifically targeted rare blood types (AB- and O-) and successfully registered 45 new donors with these types.\n\n## Rural Outreach – Sylhet Division\n\nOur most impactful initiative has been reaching rural communities where blood access is extremely limited. In partnership with local health centers, we:\n\n- Visited 12 upazila health complexes\n- Registered 300+ new donors\n- Conducted free health screenings\n- Distributed blood donation awareness materials\n\n## Upcoming Events\n\nWe have camps planned in:\n- Rajshahi University – August 2026\n- Khulna Medical College – September 2026\n- Cox's Bazar Community Center – October 2026\n\nWant to organize a camp in your area? Contact us through the Drops platform and our volunteer team will support you every step of the way.`,
      coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop',
      category: 'Community',
      tags: ['camps', 'community', 'volunteers'],
    },
    {
      title: 'The Science Behind Blood Storage and Shelf Life',
      slug: 'science-blood-storage-shelf-life',
      excerpt: 'Learn how donated blood is processed, stored, and why regular donations are crucial to maintaining supply.',
      content: `After you donate blood, it goes through a fascinating journey before reaching a patient. Understanding this process highlights why continuous donations are essential.\n\n## Processing\n\nWithin hours of collection, your donated whole blood is separated into three components:\n\n1. **Red Blood Cells (RBCs)**: Carry oxygen throughout the body\n2. **Platelets**: Help blood clot and stop bleeding\n3. **Plasma**: Contains proteins, antibodies, and clotting factors\n\nThis means one donation can help up to three different patients!\n\n## Storage and Shelf Life\n\nEach component has a different shelf life:\n\n| Component | Storage Temperature | Shelf Life |\n|-----------|-------------------|------------|\n| Red Blood Cells | 1-6°C | 42 days |\n| Platelets | 20-24°C (with agitation) | 5 days |\n| Plasma | Below -18°C | 1 year |\n\n## Why Shelf Life Matters\n\nPlatelet shelf life of just 5 days creates a constant need. Blood banks must continuously replenish their supply, especially for:\n- Cancer patients (platelet transfusions)\n- Surgery patients (RBC transfusions)\n- Trauma victims (all components)\n\n## Quality Control\n\nEvery donation undergoes rigorous testing:\n- Blood type verification\n- Screening for infectious diseases (HIV, Hepatitis B/C, Syphilis)\n- Antibody screening\n- Complete blood count\n\nOnly after passing all tests is the blood cleared for patient use.\n\n## The Supply Chain Challenge\n\nBangladesh's blood supply chain faces unique challenges including power outages affecting cold storage, limited transportation in rural areas, and seasonal drops in donations during monsoon and Ramadan.\n\nThis is exactly why platforms like Drops are vital – by maintaining a large, active donor database, we can ensure rapid response even when blood bank supplies run low.`,
      coverImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=800&auto=format&fit=crop',
      category: 'Education',
      tags: ['science', 'storage', 'blood-bank'],
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: {
        ...post,
        authorId: admin.id,
      }
    });
  }

  console.log('✅ Seeding complete!');
  console.log('');
  console.log('📋 Demo Credentials:');
  console.log('  Admin: admin@drops.com / admin123');
  console.log('  User:  user@drops.com / password123');
  console.log('');
  console.log(`  Created ${donors.length + 2} users (${donors.length} donors + admin + demo user)`);
  console.log(`  Created ${bloodRequests.length} blood requests`);
  console.log(`  Created ${blogPosts.length} blog posts`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
