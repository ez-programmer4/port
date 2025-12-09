import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    const formattedSkills = skills.map((skill) => {
      try {
        return {
          ...skill,
          technologies: skill.technologies ? JSON.parse(skill.technologies) : [],
        };
      } catch (parseError) {
        console.error(`Error parsing technologies for skill ${skill.id}:`, parseError);
        return {
          ...skill,
          technologies: [],
        };
      }
    });

    return NextResponse.json(formattedSkills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    // Return empty array on error to prevent client-side crashes
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const skill = await prisma.skill.create({
      data: {
        ...body,
        technologies: JSON.stringify(body.technologies),
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}


