const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../models/User")
const Course = require("../models/Course")
const Payment = require("../models/Payment")

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Course.deleteMany({})
    await Payment.deleteMany({})
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

    // Create instructor users
    const instructorPassword = await bcrypt.hash("instructor123", 12)
    const johnDoe = await User.create({
      name: "John Smith",
      email: "john@webitya.com",
      password: instructorPassword,
      role: "instructor",
      isVerified: true,
      bio: "Full-stack developer with 10+ years of experience. Former senior developer at Google and Facebook.",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    })

    const lisaThompson = await User.create({
      name: "Lisa Thompson",
      email: "lisa@webitya.com",
      password: instructorPassword,
      role: "instructor",
      isVerified: true,
      bio: "Digital marketing expert with 8+ years of experience. Helped 500+ businesses grow their online presence.",
      profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    })

    // Create only two courses
    const courses = [
      {
        title: "Complete Web Development Bootcamp 2024",
        slug: "complete-web-development-bootcamp-2024",
        description:
          "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive full-stack development course with real-world projects and career guidance.",
        instructor: "John Smith",
        price: 4999,
        thumbnail:
          "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Web Development",
        level: "Beginner",
        totalDuration: 2520,
        isPublished: true,
        enrolledStudents: 15420,
        rating: 4.8,
        reviews: 2547,
        chapters: [
          {
            title: "Introduction to Web Development",
            description: "Overview of web development and course structure",
            videoUrl: "https://example.com/videos/intro.mp4",
            duration: 45,
            order: 1,
          },
          {
            title: "HTML Fundamentals",
            description: "Learn the basics of HTML markup",
            videoUrl: "https://example.com/videos/html.mp4",
            duration: 120,
            order: 2,
          },
          {
            title: "CSS Styling",
            description: "Master CSS styling techniques",
            videoUrl: "https://example.com/videos/css.mp4",
            duration: 150,
            order: 3,
          },
          {
            title: "JavaScript Basics",
            description: "Introduction to JavaScript programming",
            videoUrl: "https://example.com/videos/js-basics.mp4",
            duration: 180,
            order: 4,
          },
          {
            title: "Building Interactive Websites",
            description: "Combine HTML, CSS, and JavaScript to create interactive websites",
            videoUrl: "https://example.com/videos/interactive.mp4",
            duration: 210,
            order: 5,
          },
        ],
      },
      {
        title: "Digital Marketing Mastery 2024",
        slug: "digital-marketing-mastery",
        description:
          "Complete digital marketing course covering SEO, social media marketing, Google Ads, email marketing, and analytics for business growth.",
        instructor: "Lisa Thompson",
        price: 6999,
        thumbnail:
          "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Digital Marketing",
        level: "Beginner",
        totalDuration: 1500,
        isPublished: true,
        enrolledStudents: 13567,
        rating: 4.5,
        reviews: 2134,
        chapters: [
          {
            title: "Digital Marketing Overview",
            description: "Introduction to digital marketing channels and strategies",
            videoUrl: "https://example.com/videos/digital-marketing-intro.mp4",
            duration: 45,
            order: 1,
          },
          {
            title: "Search Engine Optimization (SEO)",
            description: "Master SEO techniques to improve organic rankings",
            videoUrl: "https://example.com/videos/seo.mp4",
            duration: 180,
            order: 2,
          },
          {
            title: "Search Engine Marketing (SEM)",
            description: "Create effective paid search campaigns",
            videoUrl: "https://example.com/videos/sem.mp4",
            duration: 150,
            order: 3,
          },
          {
            title: "Social Media Marketing",
            description: "Strategies for effective social media campaigns",
            videoUrl: "https://example.com/videos/social-media.mp4",
            duration: 180,
            order: 4,
          },
          {
            title: "Analytics and Measurement",
            description: "Track and analyze marketing performance",
            videoUrl: "https://example.com/videos/analytics.mp4",
            duration: 120,
            order: 5,
          },
        ],
      },
    ]

    await Course.insertMany(courses)
    console.log("Sample courses created successfully")

    // Create regular user
    const userPassword = await bcrypt.hash("user123456", 12)
    const regularUser = await User.create({
      name: "Regular User",
      email: "user@example.com",
      password: userPassword,
      role: "user",
      isVerified: true,
    })

    console.log("Sample data created successfully")
    console.log("Only 2 courses created:")
    console.log("1. Complete Web Development Bootcamp 2024 - ₹4,999")
    console.log("2. Digital Marketing Mastery 2024 - ₹6,999")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
