// api/chat.js – with demo mode support
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const demoMode = process.env.DEMO_MODE === 'true';
  const apiKey = process.env.OPENAI_API_KEY;

  // Demo mode: return mock responses based on keywords
  if (demoMode) {
    console.log('Demo mode active – returning mock reply for:', message);
    const reply = generateMockReply(message);
    return res.status(200).json({ reply });
  }

  // Real mode: require API key
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured and demo mode is off' });
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
      // Handle quota or other errors gracefully
      if (data.error?.code === 'insufficient_quota') {
        return res.status(200).json({
          reply: "I'm sorry, our AI assistant is temporarily unavailable. Please contact us directly via phone or WhatsApp."
        });
      }
      return res.status(200).json({
        reply: "I'm having trouble responding right now. Please try again later or contact us directly."
      });
    }

    const reply = data.choices[0].message.content;
    console.log(`User: ${message}`);
    console.log(`Bot: ${reply}`);
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Simple mock response generator
function generateMockReply(message) {
  const lowerMsg = message.toLowerCase();

  // Greetings
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Hello! Welcome to BP Landscapes. How can I assist you with your landscaping needs today?";
  }

  // Services inquiry
  if (lowerMsg.includes('service') || lowerMsg.includes('what do you do')) {
    return "We offer a wide range of landscaping services including landscape design, garden maintenance, irrigation systems, hardscaping, outdoor kitchens, pools, and more. Is there a specific service you're interested in?";
  }

  // Pricing
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
    return "Our pricing depends on the scope of the project. We offer free consultations and quotes. Would you like to schedule a visit from our team?";
  }

  // Contact
  if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email')) {
    return "You can reach us at +254 708 832478 or email bplandsscapes@gmail.com. We're available Mon-Sat 8AM-6PM, Sunday 10AM-4PM.";
  }

  // Specific services
  if (lowerMsg.includes('lawn') || lowerMsg.includes('grass')) {
    return "We provide comprehensive lawn care: mowing, fertilizing, aeration, and weed control. We also install sod and artificial turf. Would you like a quote for your lawn?";
  }
  if (lowerMsg.includes('irrigation') || lowerMsg.includes('sprinkler')) {
    return "We install Rain Bird sprinkler systems and smart irrigation controllers to keep your landscape healthy while saving water. We can design a system tailored to your garden.";
  }
  if (lowerMsg.includes('pool') || lowerMsg.includes('swimming')) {
    return "We design and build custom swimming pools, including landscaping around the pool area. Our team can create a stunning oasis for your home.";
  }
  if (lowerMsg.includes('hardscape') || lowerMsg.includes('patio') || lowerMsg.includes('pavers')) {
    return "Our hardscaping services include patios, walkways, retaining walls, driveways, and outdoor kitchens. We use high-quality materials for lasting beauty.";
  }
  if (lowerMsg.includes('tree') || lowerMsg.includes('trimming') || lowerMsg.includes('pruning')) {
    return "We offer tree trimming, pruning, and removal services, as well as tree planting and landscaping. Let us know what you need!";
  }

  // Fallback
  return "Thank you for your message. A member of our team will get back to you shortly, or you can call us directly at +254 708 832478. How else can I help?";
}