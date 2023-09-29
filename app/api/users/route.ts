import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Check if username already exists
    const userExist = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const userEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (userEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    // remove password from response
    const { password: _, ...rest } = newUser;

    return NextResponse.json(
      {
        user: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
