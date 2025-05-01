// app/api/auth/login/route.ts
import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { authenticate, type User } from "@/lib/auth";
import { createJwtFor } from "@/lib/jwt";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const user: User | null = await authenticate(username, password);
    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    await transporter.sendMail({
      from: `"Mi Login Card" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Bienvenido!",
      text: `Hola ${user.name}, bienvenido a mi plataforma`,
    });

    const token = createJwtFor(user);
    return NextResponse.json({ token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("ERROR en /api/auth/login:", err.message);
    } else {
      console.error("ERROR desconocido en /api/auth/login:", err);
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
