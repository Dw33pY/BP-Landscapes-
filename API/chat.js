// api/chat.js (for Vercel)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  const apiKey = process.env.OPENAI_API_KEY; // Set in Vercel environment variables
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
    if (!response.ok) {
      console.error('OpenAI error:', data);
      return res.status(500).json({ error: 'OpenAI API error' });
    }
    
    const reply = data.choices[0].message.content;
    
    // Log conversation (you can expand to email later)
    console.log(`User: ${message}`);
    console.log(`Bot: ${reply}`);
    
    // Optionally, you could send an email here with a service like Resend
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
