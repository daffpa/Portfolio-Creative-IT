import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validasi ketentuan input
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

    // 2. Jika ada Web3Forms API Key di environment variable
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            subject: `Pesan Baru dari Portfolio: ${name.trim()}`,
          }),
          signal: AbortSignal.timeout(6000),
        });

        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          return NextResponse.json({
            success: true,
            message: "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya.",
          });
        }
      } catch (e) {
        console.error("Web3Forms error:", e);
      }
    }

    // 3. Coba kirim via FormSubmit dengan batas timeout 6 detik
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
        signal: AbortSignal.timeout(6000),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== "false") {
        return NextResponse.json({
          success: true,
          message: "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya.",
        });
      }
    } catch (err) {
      console.error("FormSubmit timeout / offline:", err);
    }

    // 4. Jika server pihak ketiga (formsubmit.co) sedang down / offline (misal Cloudflare 522)
    return NextResponse.json(
      {
        success: false,
        serviceDown: true,
        message:
          "Server relay email pihak ketiga (formsubmit.co) saat ini sedang down/gangguan jaringan (Cloudflare 522). Gunakan tombol langsung 'Kirim via Gmail' atau 'Aplikasi Email' di bawah agar pesan Anda langsung terkirim.",
      },
      { status: 503 }
    );
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
