import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";

export const sendMail = async (name, subject, to) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "rodriguez.rios.roberto@gmail.com",
      pass: envsConfig.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "rodriguez.rios.roberto@gmail.com",
    to: to,
    subject: subject,
    html: `<h1>Fienfenido ${name}</h1>
<div>
  <p>Fracias for fu fomfra</p>
  <img src="cid:firanofaurio" />
</div>`,
    attachments: [
      {
        filename: ".jpg",
        path: "public/images/firanofaurio.jpeg",
        cid: "firanofaurio",
      },
    ],
  });
};

export const sendTicketMail = async (to, ticket) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "rodriguez.rios.roberto@gmail.com",
      pass: envsConfig.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "rodriguez.rios.roberto@gmail.com",
    to: to,
    subject: `Ticket de compra`,
    html: `<h1>Ticket de compra</h1>
<div>
  <p>Total de compra: ${ticket.amount}</p>
  <p>Código: ${ticket.code}</p>
</div>`,
  });
};
