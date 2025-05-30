import mongoose from "mongoose"

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  videoUrl: String,
  duration: Number,
  order: {
    type: Number,
    required: true,
  },
})

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: String,
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    chapters: [ChapterSchema],
    totalDuration: Number,
    isPublished: {
      type: Boolean,
      default: false,
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
