import emailjs from '@emailjs/browser'

// Replace these with your actual EmailJS credentials:
// 1. Sign up at https://emailjs.com
// 2. Create a service (e.g., Gmail) → note the Service ID
// 3. Create an email template → note the Template ID
// 4. Copy your Public Key from Account > API Keys
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

/**
 * Send a custom order form via EmailJS.
 * @param {Object} data - Form fields matching the EmailJS template variables.
 * @returns {Promise}
 */
export function sendOrderEmail(data) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
}
