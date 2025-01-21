import express from 'express';
import { sendEmail } from '../controllers/emailController.js';

const router = express.Router();

// Define the POST route for sending emails
router.post('/', sendEmail);

export default router;
