import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");

    const where: { isFeatured?: boolean; category?: string } = {};

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (category && category !== "All") {
      where.category = category;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { isFeatured: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    // Parse JSON strings
    const formattedProjects = projects.map((project) => ({
      ...project,
      technologies: JSON.parse(project.technologies),
      features: project.features ? JSON.parse(project.features) : [],
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST new project (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const project = await prisma.project.create({
      data: {
        ...body,
        technologies: JSON.stringify(body.technologies),
        features: body.features ? JSON.stringify(body.features) : null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

