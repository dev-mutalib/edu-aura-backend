import Faculty from '../models/faculty.model.js';

/**
 * @desc Get all faculty
 * @route GET /api/faculty
 */
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty,
    });
  } catch (error) {
    console.error('Faculty Fetch Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch faculty',
    });
  }
};

/**
 * @desc Seed faculty (one-time)
 * @route POST /api/faculty/seed
 */
export const seedFaculty = async (req, res) => {
  try {
    await Faculty.deleteMany();

    const faculty = await Faculty.insertMany([
      {
        name: 'Dr. Amit Sharma',
        designation: 'Professor',
        subject: 'Computer Science',
        experience: '12 Years',
        image:
          'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg',
      },
      {
        name: 'Ms. Neha Verma',
        designation: 'Senior Lecturer',
        subject: 'Mathematics',
        experience: '8 Years',
        image:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      },
      {
        name: 'Mr. Rahul Singh',
        designation: 'Assistant Professor',
        subject: 'Physics',
        experience: '6 Years',
        image:
          'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      },
      {
        name: 'Dr. Pooja Mehta',
        designation: 'HOD – Biology',
        subject: 'Biology',
        experience: '15 Years',
        image:
          'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg',
      },
    ]);

    res.status(201).json({
      success: true,
      message: 'Faculty seeded successfully',
      data: faculty,
    });
  } catch (error) {
    console.error('Faculty Seed Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to seed faculty',
    });
  }
};
