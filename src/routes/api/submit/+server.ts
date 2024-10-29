import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const POST = async ({ request }) => {
  console.log("DATABASE_URL (runtime check):", process.env.DATABASE_URL);  // Temporary log to check value

  try {
    // Database connection and logic
    await prisma.$connect();
    const formData = await request.formData();
    const email = formData.get('email');
    // Further processing as before...

  } catch (error) {
    console.error("Detailed Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};