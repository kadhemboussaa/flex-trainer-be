import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendMail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'boussaakadhem0@gmail.com',
        pass: 'faxl auqf kcrz aivi',
      },
    });

    const mailOptions = {
      from: 'boussaakadhem0@gmail.com',
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  }
}
