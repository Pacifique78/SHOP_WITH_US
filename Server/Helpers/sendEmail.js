/* eslint-disable array-callback-return */
import nodemailer from 'nodemailer';
import path from 'path';
import { Promise } from 'bluebird';

const { EmailTemplate } = require('email-templates');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAILACCOUNT,
    pass: process.env.GMAILPASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const sendMail = (obj) => transporter.sendMail(obj);

const loadTemplate = (templateName, contexts) => {
  const template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
  return Promise.all(contexts.map((context) => new Promise((resolve, reject) => {
    template.render(context, (err, result) => {
      if (err) reject(err);
      else {
        resolve({
          email: result,
          context,
        });
      }
    });
  })));
};

export const sendResetPasswordEmail = (templateName, contexts) => {
  loadTemplate(templateName, contexts).then((results) => Promise.all(results.map((result) => {
    sendMail({
      to: result.context.email,
      from: '"Kigali coding" <kigalicodingacademy@gmail.com>',
      subject: result.email.subject,
      html: result.email.html,
    });
  })));
};
