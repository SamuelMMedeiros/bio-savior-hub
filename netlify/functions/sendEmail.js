import nodemailer from "nodemailer";

export const handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        // Configuração segura usando variáveis de ambiente do Netlify
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, // true para 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Mensagem que a Zoonoses vai receber
        const mailOptions = {
            from: `"Portal de Zoonoses" <${process.env.SMTP_USER}>`,
            to: "saude.zoonozes@patosdeminas.mg.gov.br",
            subject: `Nova mensagem de ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <img src="https://seusite.netlify.app/logo.png" alt="Logo" width="120" />
          <h2 style="color: #2e6221;">📬 Nova mensagem recebida pelo site</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f4f4f4; padding: 10px; border-radius: 8px;">${message}</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        // Mensagem automática pro remetente
        await transporter.sendMail({
            from: `"Zoonoses Patos de Minas" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Recebemos sua mensagem 🦇",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 16px; text-align:center;">
          <img src="https://biostatsbat.netlify.app/logo.png" alt="Logo" width="100" />
          <h2 style="color: #2e6221;">Olá, ${name}!</h2>
          <p>Recebemos sua mensagem e nossa equipe da Zoonoses entrará em contato em breve.</p>
          <p style="color:#777; font-size:14px;">Obrigado por se interessar pela saúde e bem-estar dos animais! 🐾</p>
        </div>
      `,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "E-mail enviado com sucesso" }),
        };
    } catch (error) {
        console.error("Erro no envio:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Falha ao enviar e-mail" }),
        };
    }
};
