import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { emails, taskTitle } = req.body;
  console.log("Sending email to: ", emails);

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ message: "No emails provided or invalid email list" });
  }



  const messageId = `<${uuidv4()}@sakec.ac.in>`;


  const subject = `Task Assignment: ${taskTitle}`; // Task Title in subject
  const text = `
    You have been assigned a new task: "${taskTitle}".
    
    Please log into your Workflow Manager to view the details and start working on it.

    Thank you!
  `;



  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: emails.join(", "),
    subject: subject,
    text: text,
    messageId: messageId, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully!", info);
    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending emails", error: error.message });
  }
});

export { sendEmail };






//const dueDate = task.dueDate ? `The task is due by ${task.dueDate}.` : '';
//const text = `
  //You have been assigned a new task: "${taskTitle}".
  //${dueDate}

  //Please log into your task management app to view the details and start working on it.

  //Thank you!
//`;
