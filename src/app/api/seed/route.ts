import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    await connectDB();
    await seedDatabase();

    return NextResponse.json(
      { message: "Database seeded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
