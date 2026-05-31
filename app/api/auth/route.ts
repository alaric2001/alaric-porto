import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@alaric.dev";
const ADMIN_PASSWORD = "AlaricAdmin2025";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as { email: string; password: string };
    if (!email || !password)
      return NextResponse.json({ success: false, message: "Email dan password wajib diisi." }, { status: 400 });

    await new Promise((r) => setTimeout(r, 600));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const res = NextResponse.json({
        success: true,
        role: "admin",
        user: { email: ADMIN_EMAIL, name: "Alaric Rasendriya Aniko", role: "admin" },
        message: "Selamat datang kembali, Admin.",
      });
      res.cookies.set("portfolio_role", "admin", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 4,
        path: "/",
      });
      return res;
    }

    return NextResponse.json({ success: false, message: "Email atau password salah." }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("portfolio_role");
  return res;
}
