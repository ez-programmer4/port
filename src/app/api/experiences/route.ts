import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    const formattedExperiences = experiences.map((exp) => ({
      ...exp,
      achievements: JSON.parse(exp.achievements),
      technologies: JSON.parse(exp.technologies),
      highlights: JSON.parse(exp.highlights),
    }));

    return NextResponse.json(formattedExperiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const experience = await prisma.experience.create({
      data: {
        ...body,
        achievements: JSON.stringify(body.achievements),
        technologies: JSON.stringify(body.technologies),
        highlights: JSON.stringify(body.highlights),
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

