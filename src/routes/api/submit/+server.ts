import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const POST = async ({ request }) => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("Database connection successful.");

    const formData = await request.formData();
    const email = formData.get('email');
    const facebook = formData.get('facebook');
    const instagram = formData.get('instagram');
    const twitter = formData.get('twitter');

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const tempPassword = Math.random().toString(36).slice(-8);

    const account = await prisma.account.create({
      data: {
        email: email.toString(),
        password: tempPassword,
        properties: {
          create: [
            facebook ? { socialMediaPlatform: 'facebook', socialMediaUrl: facebook.toString() } : null,
            instagram ? { socialMediaPlatform: 'instagram', socialMediaUrl: instagram.toString() } : null,
            twitter ? { socialMediaPlatform: 'twitter', socialMediaUrl: twitter.toString() } : null,
          ].filter(Boolean),
        },
      },
    });

    return new Response(JSON.stringify({ account }), { status: 201 });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
