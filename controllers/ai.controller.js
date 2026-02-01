import openai from '../config/openai.js';

export const chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ reply: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
You are EduBot, the official AI assistant of Edu Aura Institute.

You must answer ONLY about:
- Courses (BCA, BBA, B.Com, MCA, MBA)
- Admissions & eligibility
- Fees & scholarships
- Placements & careers
- Faculty
- Hostel & library
- Campus facilities

Rules:
- Be concise and clear
- No fake information
- Be polite & professional
`,
        },
        ...history,
        { role: 'user', content: message },
      ],
    });

    return res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('AI Error:', error.message);
    return res.status(500).json({
      reply: 'AI service unavailable. Please try again later.',
    });
  }
};
