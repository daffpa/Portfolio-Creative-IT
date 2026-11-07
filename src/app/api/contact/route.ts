import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validasi ketentuan input
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama wajib diisi dan minimal harus memiliki 2 karakter sesuai ketentuan.",
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

    // Kirim pesan ke email via formsubmit.co
    try {
      const response = await fetch("https://formsubmit.co/ajax/daffagyanza@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _subject: `Pesan Baru dari Portfolio: ${name.trim()}`,
          _captcha: "false",
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== "false") {
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
      console.error("Gagal mengirim email:", err);
      return NextResponse.json(
        {
          success: false,
          message: "Koneksi ke server pengiriman gagal. Silakan coba lagi atau kirim via email langsung.",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal saat memproses pesan Anda.",
      },
      { status: 500 }
    );
  }
}
