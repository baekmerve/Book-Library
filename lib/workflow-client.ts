import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
})

export async function sendEmail({
  email,
  subject,
  message,
}: {
  email: string
  subject: string
  message: string
}) {
  const payload = {
    service_id: config.env.emailjs.service_id,
    template_id: config.env.emailjs.template_id,
    // user_id: config.env.emailjs.publicKey,
    accessToken: config.env.emailjs.apiKey,

    template_params: {
      to_email: email,
      subject,
      message,
    },
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`EmailJS error: ${error}`)
  }

  console.log(`✅ Email sent to ${email}`)
}
