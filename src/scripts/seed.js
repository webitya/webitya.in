const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../models/User")
const Course = require("../models/Course")

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Course.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123456", 12)
    const admin = await User.create({
      name: "Admin User",
      email: "admin@webitya.com",
      password: adminPassword,
      role: "admin",
      isVerified: true,
    })

    // Create sample courses
    const courses = [
      {
        title: "Complete Web Development Bootcamp",
        description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course",
        instructor: "John Doe",
        price: 99,
        category: "Web Development",
        level: "Beginner",
        totalDuration: 2400,
        isPublished: true,
        chapters: [
          {
            title: "Introduction to Web Development",
            description: "Overview of web development and course structure",
            duration: 15,
            order: 1,
          },
          {
            title: "HTML Fundamentals",
            description: "Learn the basics of HTML markup",
            duration: 45,
            order: 2,
          },
        ],
      },
      // Add more sample courses...
    ]

    await Course.insertMany(courses)
    console.log("Sample data created successfully")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
