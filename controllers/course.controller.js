import Course from '../models/Course.js';

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error('Get Courses Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
    });
  }
};

/**
 * @desc    Seed courses (run once)
 * @route   POST /api/courses/seed
 * @access  Admin / Dev
 */
export const seedCourses = async (req, res) => {
  try {
    await Course.deleteMany();

    const courses = await Course.insertMany([
      {
        title: 'Full Stack Web Development',
        description:
          'Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB with real-world projects.',
        duration: '6 Months',
        level: 'Beginner',
        category: 'Development',
        image:
          'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
        price: 24999,
      },
      {
        title: 'Frontend Development with React',
        description:
          'Master React, Hooks, Context API, Tailwind CSS, and modern UI development.',
        duration: '3 Months',
        level: 'Intermediate',
        category: 'Frontend',
        image:
          'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
        price: 14999,
      },
      {
        title: 'Backend Development with Node.js',
        description:
          'Build scalable REST APIs using Node.js, Express, MongoDB, and JWT authentication.',
        duration: '4 Months',
        level: 'Intermediate',
        category: 'Backend',
        image:
          'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        price: 17999,
      },
      {
        title: 'UI/UX Design',
        description:
          'Learn UI principles, Figma, wireframing, prototyping, and user experience design.',
        duration: '2 Months',
        level: 'Beginner',
        category: 'Design',
        image:
          'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg',
        price: 9999,
      },
      {
        title: 'Data Structures & Algorithms',
        description:
          'Strengthen problem-solving skills with DSA using JavaScript and real interview problems.',
        duration: '3 Months',
        level: 'Advanced',
        category: 'Programming',
        image:
          'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
        price: 12999,
      },
    ]);

    res.status(201).json({
      success: true,
      message: 'Courses seeded successfully',
      data: courses,
    });
  } catch (error) {
    console.error('Seed Courses Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to seed courses',
    });
  }
};
