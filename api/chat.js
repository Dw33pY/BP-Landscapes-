// api/chat.js (for Vercel)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful landscaping consultant for BP Landscapes, a professional landscaping company in Kenya. Answer questions about their services (landscape design, lawn care, irrigation, hardscaping, pools, outdoor kitchens, artificial turf, tree services), provide advice, and be friendly. Keep responses concise and professional. Always encourage the user to contact BP Landscapes via phone (+254 708 832 478) or WhatsApp for quotes.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();

    // FIX: Quota check is now INSIDE the try block so it can actually execute
    if (!response.ok) {
      console.error('OpenAI error:', data);

      // Handle quota exceeded gracefully — show friendly message instead of error
      if (data.error?.code === 'insufficient_quota' || data.error?.type === 'insufficient_quota') {
        return res.status(200).json({
          reply: "I'm sorry, our AI assistant is temporarily unavailable. Please contact us directly via WhatsApp or call +254 708 832 478 — we'd love to help!"
        });
      }

      // Handle rate limiting
      if (response.status === 429) {
        return res.status(200).json({
          reply: "We're experiencing high demand right now. Please reach out via WhatsApp or call us at +254 708 832 478 for immediate assistance."
        });
      }

      return res.status(500).json({ error: 'OpenAI API error' });
    }

    const reply = data.choices[0].message.content;

    // Log conversation
    console.log(`User: ${message}`);
    console.log(`Bot: ${reply}`);

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
