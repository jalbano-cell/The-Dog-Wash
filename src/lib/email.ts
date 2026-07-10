import nodemailer from "nodemailer";

export type EmailConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
};

function envKeyForSlug(slug: string) {
  return slug.toUpperCase().replace(/-/g, "_");
}

export function getEmailConfigForLocation(slug: string): EmailConfig {
  const key = envKeyForSlug(slug);
  const host = process.env[`EMAIL_HOST_${key}`] || process.env.EMAIL_HOST;
  const port = Number(process.env[`EMAIL_PORT_${key}`] || process.env.EMAIL_PORT || 587);
  const user = process.env[`EMAIL_USER_${key}`] || process.env.EMAIL_USER;
  const password = process.env[`EMAIL_PASSWORD_${key}`] || process.env.EMAIL_PASSWORD;
  const from = process.env[`EMAIL_FROM_${key}`] || process.env.EMAIL_FROM || user;

  if (!host || !user || !password || !from) {
    throw new Error(`Missing email configuration for location "${slug}". Set EMAIL_* env vars in .env.local.`);
  }

  return { host, port, user, password, from };
}

export async function sendMail({
  config,
  to,
  subject,
  text,
  html,
}: {
  config: EmailConfig;
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
  });

  await transporter.sendMail({
    from: config.from,
    to,
    subject,
    text,
    html,
  });
}
