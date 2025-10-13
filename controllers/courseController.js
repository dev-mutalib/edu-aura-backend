import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching course",
      error: error.message,
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.status(200).json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Enrollment failed",
      error: error.message,
    });
  }
};
