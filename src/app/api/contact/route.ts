import { NextResponse } from "next/server";

const WEB3FORMS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY || "46215670-4f8e-4b77-a8ad-1ea4bb42673c";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validasi ketentuan input
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama wajib diisi dan minimal 2 karakter sesuai ketentuan.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Format email tidak valid. Harap masukkan email yang benar (contoh: nama@email.com).",
        },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Pesan wajib diisi dan minimal 5 karakter sesuai ketentuan.",
        },
        { status: 400 }
      );
    }

    // 2. Kirim via Web3Forms
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; Portfolio-App/1.0)",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Pesan Baru dari Portfolio: ${name.trim()}`,
          from_name: name.trim(),
        }),
        signal: AbortSignal.timeout(8000),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        return NextResponse.json({
          success: true,
          message: "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya.",
        });
      } else {
        const errorMsg = data?.message || "Gagal mengirim pesan melalui penyedia layanan.";
        return NextResponse.json(
          {
            success: false,
            message: errorMsg,
          },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Web3Forms error / timeout:", err);
      return NextResponse.json(
        {
          success: false,
          serviceDown: true,
          message: "Gagal terhubung ke server pengiriman email. Silakan coba kembali atau gunakan tombol kirim langsung.",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal pada server saat memproses pesan Anda.",
      },
      { status: 500 }
    );
  }
}
