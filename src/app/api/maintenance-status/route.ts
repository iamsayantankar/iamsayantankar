import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";

export const dynamic = "force-dynamic";

const OFF_RESPONSE = {
  maintenance: false,
  title: "",
  message: "",
  endDate: null as string | null,
};

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.findOne();
    if (!settings) return NextResponse.json(OFF_RESPONSE);

    const now = new Date();
    const endDate: Date | null = settings.maintenanceEndDate
      ? new Date(settings.maintenanceEndDate)
      : null;

    if (settings.maintenanceMode && endDate && endDate.getTime() <= now.getTime()) {
      settings.maintenanceMode = false;
      await settings.save();
      return NextResponse.json(OFF_RESPONSE);
    }

    const active = !!settings.maintenanceMode;
    return NextResponse.json({
      maintenance: active,
      title: settings.maintenanceTitle || "We'll Be Back Soon!",
      message: settings.maintenanceMessage || "",
      endDate: endDate ? endDate.toISOString() : null,
    });
  } catch {
    return NextResponse.json(OFF_RESPONSE);
  }
}
