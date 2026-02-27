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
          { role: 'system', content: 'You are a helpful landscaping consultant for BP Landscapes, a landscaping company in Kenya. Answer questions about their services, provide advice, and be friendly. Keep responses concise and professional.' },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();

    // Handle OpenAI API errors gracefully
    if (!response.ok) {
      console.error('OpenAI error:', data);

      // Check for insufficient quota
      if (data.error?.code === 'insufficient_quota') {
        return res.status(200).json({
          reply: "I'm sorry, our AI assistant is temporarily unavailable. Please contact us directly via phone or WhatsApp."
        });
      }

      // For other errors, return a generic message
      return res.status(200).json({
        reply: "I'm having trouble responding right now. Please try again later or contact us directly."
      });
    }

    const reply = data.choices[0].message.content;
    console.log(`User: ${message}`);
    console.log(`Bot: ${reply}`);

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}