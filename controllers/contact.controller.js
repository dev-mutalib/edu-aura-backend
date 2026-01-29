import Contact from "../models/Contact.js"

export const sendContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Contact message received',
      data: contact,
    });
  } catch (error) {
    console.error('CONTACT ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to save contact message',
    });
  }
};
