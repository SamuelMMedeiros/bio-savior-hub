import nodemailer from "nodemailer";

export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method not allowed" };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        // transporter para envio
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email para Zoonoses
        const emailToZoonoses = {
            from: `"Viva com os Morcegos" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `📩 Novo contato de ${name}`,
            replyTo: email,
            html: `
        <div style="font-family: Arial, sans-serif; color: #1f2937; background-color: #f9fafb; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            <div style="background-color: #2E6221; padding: 20px; text-align: center;">
              <img src="${
                  process.env.SITE_URL
              }/logo.png" alt="Logo Viva com os Morcegos" style="height: 60px;">
            </div>
            <div style="padding: 20px;">
              <h2 style="color: #2E6221;">Nova mensagem recebida 🦇</h2>
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>E-mail:</strong> ${email}</p>
              <p><strong>Mensagem:</strong></p>
              <p style="background:#f0fdf4; padding: 12px; border-radius: 8px;">${message}</p>
              <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">Enviado em ${new Date().toLocaleString(
                  "pt-BR"
              )}</p>
            </div>
          </div>
        </div>
      `,
        };

        // Email automático para o visitante
        const emailAutoReply = {
            from: `"Viva com os Morcegos" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🌿 Recebemos sua mensagem!",
            html: `
        <div style="font-family: Arial, sans-serif; color: #1f2937; background-color: #f9fafb; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            <div style="background-color: #2E6221; padding: 20px; text-align: center;">
              <img src="${process.env.SITE_URL}/logo.png" alt="Logo Viva com os Morcegos" style="height: 60px;">
            </div>
            <div style="padding: 20px;">
              <h2 style="color: #2E6221;">Olá, ${name}! 🦇</h2>
              <p>Ficamos muito felizes por sua mensagem! 🥰</p>
              <p>Nosso time da <strong>Zoonoses</strong> vai analisar sua dúvida e responder em breve no e-mail <strong>${email}</strong>.</p>
              <p>Enquanto isso, você pode visitar nosso site e aprender mais sobre esses incríveis guardiões noturnos da natureza 🌙.</p>
              <div style="margin-top: 20px; text-align: center;">
                <a href="${process.env.SITE_URL}" style="background-color:#2E6221; color:white; text-decoration:none; padding:12px 24px; border-radius:8px; display:inline-block;">Visitar o site</a>
              </div>
              <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">Equipe Viva com os Morcegos<br/>Zoonoses Municipal</p>
            </div>
          </div>
        </div>
      `,
        };

        await transporter.sendMail(emailToZoonoses);
        await transporter.sendMail(emailAutoReply);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "E-mails enviados com sucesso!",
            }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: err.message }),
        };
    }
};
