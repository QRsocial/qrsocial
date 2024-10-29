import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const POST = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const facebook = formData.get('facebook');
  const instagram = formData.get('instagram');
  const twitter = formData.get('twitter');

  // Generate a temporary password (can be improved or randomized)
  const tempPassword = Math.random().toString(36).slice(-8);

  // Create an account with the submitted email
  const account = await prisma.account.create({
    data: {
      email,
      password: tempPassword,
      properties: {
        create: [
          { socialMediaPlatform: 'facebook', socialMediaUrl: facebook },
          { socialMediaPlatform: 'instagram', socialMediaUrl: instagram },
          { socialMediaPlatform: 'twitter', socialMediaUrl: twitter }
        ]
      }
    }
  });

  return new Response(JSON.stringify({ account }), { status: 201 });
};
