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
      name: "John Doe",
      email: "john@webitya.com",
      password: instructorPassword,
      role: "instructor",
      isVerified: true,
      bio: "Senior Web Developer with 10+ years of experience in full-stack development.",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    })

    const janeSmith = await User.create({
      name: "Jane Smith",
      email: "jane@webitya.com",
      password: instructorPassword,
      role: "instructor",
      isVerified: true,
      bio: "Digital Marketing Specialist with expertise in SEO, SEM, and Social Media Marketing.",
      profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    })

    const michaelJohnson = await User.create({
      name: "Michael Johnson",
      email: "michael@webitya.com",
      password: instructorPassword,
      role: "instructor",
      isVerified: true,
      bio: "AI and Machine Learning expert with a PhD in Computer Science.",
      profilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
    })

    // Create sample courses
    const courses = [
      {
        title: "Complete Web Development Bootcamp 2024",
        slug: "complete-web-development-bootcamp-2024",
        description:
          "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course. Build real-world projects and gain the skills needed to become a full-stack web developer.",
        instructor: "John Doe",
        price: 4999,
        thumbnail:
          "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Web Development",
        level: "Beginner",
        totalDuration: 4200,
        isPublished: true,
        enrolledStudents: 1245,
        rating: 4.8,
        reviews: 328,
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
        title: "Advanced React & Redux 2024",
        slug: "advanced-react-redux-2024",
        description:
          "Take your React skills to the next level with advanced patterns, hooks, context API, and Redux. Build complex applications with best practices and modern techniques.",
        instructor: "John Doe",
        price: 5999,
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Web Development",
        level: "Advanced",
        totalDuration: 3600,
        isPublished: true,
        enrolledStudents: 842,
        rating: 4.9,
        reviews: 215,
        chapters: [
          {
            title: "React Fundamentals Recap",
            description: "Quick review of React fundamentals",
            videoUrl: "https://example.com/videos/react-recap.mp4",
            duration: 60,
            order: 1,
          },
          {
            title: "Advanced React Hooks",
            description: "Deep dive into React hooks",
            videoUrl: "https://example.com/videos/advanced-hooks.mp4",
            duration: 180,
            order: 2,
          },
          {
            title: "Context API & State Management",
            description: "Managing state with Context API",
            videoUrl: "https://example.com/videos/context-api.mp4",
            duration: 150,
            order: 3,
          },
          {
            title: "Redux Fundamentals",
            description: "Introduction to Redux state management",
            videoUrl: "https://example.com/videos/redux-basics.mp4",
            duration: 210,
            order: 4,
          },
          {
            title: "Advanced Redux Patterns",
            description: "Redux middleware, thunks, and sagas",
            videoUrl: "https://example.com/videos/redux-advanced.mp4",
            duration: 240,
            order: 5,
          },
        ],
      },
      {
        title: "Digital Marketing Masterclass",
        slug: "digital-marketing-masterclass",
        description:
          "Master digital marketing strategies including SEO, SEM, social media marketing, content marketing, email marketing, and analytics. Learn to create effective campaigns and measure results.",
        instructor: "Jane Smith",
        price: 3999,
        thumbnail:
          "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Digital Marketing",
        level: "Intermediate",
        totalDuration: 3000,
        isPublished: true,
        enrolledStudents: 1876,
        rating: 4.7,
        reviews: 423,
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
      {
        title: "AI and Machine Learning Fundamentals",
        slug: "ai-machine-learning-fundamentals",
        description:
          "Learn the fundamentals of artificial intelligence and machine learning. Understand key algorithms, neural networks, deep learning, and practical applications of AI.",
        instructor: "Michael Johnson",
        price: 6999,
        thumbnail:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Data Science",
        level: "Intermediate",
        totalDuration: 4500,
        isPublished: true,
        enrolledStudents: 1024,
        rating: 4.9,
        reviews: 287,
        chapters: [
          {
            title: "Introduction to AI and ML",
            description: "Overview of artificial intelligence and machine learning",
            videoUrl: "https://example.com/videos/ai-intro.mp4",
            duration: 60,
            order: 1,
          },
          {
            title: "Data Preprocessing",
            description: "Techniques for preparing data for ML models",
            videoUrl: "https://example.com/videos/data-preprocessing.mp4",
            duration: 150,
            order: 2,
          },
          {
            title: "Supervised Learning Algorithms",
            description: "Understanding classification and regression algorithms",
            videoUrl: "https://example.com/videos/supervised-learning.mp4",
            duration: 210,
            order: 3,
          },
          {
            title: "Neural Networks",
            description: "Building and training neural networks",
            videoUrl: "https://example.com/videos/neural-networks.mp4",
            duration: 240,
            order: 4,
          },
          {
            title: "Deep Learning Applications",
            description: "Practical applications of deep learning",
            videoUrl: "https://example.com/videos/deep-learning.mp4",
            duration: 180,
            order: 5,
          },
        ],
      },
      {
        title: "UI/UX Design Principles",
        slug: "ui-ux-design-principles",
        description:
          "Master the principles of UI/UX design. Learn to create user-centered designs, wireframes, prototypes, and conduct usability testing for exceptional user experiences.",
        instructor: "Jane Smith",
        price: 4499,
        thumbnail:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Design",
        level: "Beginner",
        totalDuration: 2800,
        isPublished: true,
        enrolledStudents: 1532,
        rating: 4.8,
        reviews: 356,
        chapters: [
          {
            title: "Introduction to UI/UX Design",
            description: "Understanding the fundamentals of user interface and user experience design",
            videoUrl: "https://example.com/videos/uiux-intro.mp4",
            duration: 45,
            order: 1,
          },
          {
            title: "User Research Methods",
            description: "Techniques for understanding user needs and behaviors",
            videoUrl: "https://example.com/videos/user-research.mp4",
            duration: 120,
            order: 2,
          },
          {
            title: "Wireframing and Prototyping",
            description: "Creating wireframes and interactive prototypes",
            videoUrl: "https://example.com/videos/wireframing.mp4",
            duration: 180,
            order: 3,
          },
          {
            title: "Visual Design Principles",
            description: "Color theory, typography, and layout principles",
            videoUrl: "https://example.com/videos/visual-design.mp4",
            duration: 150,
            order: 4,
          },
          {
            title: "Usability Testing",
            description: "Methods for testing and improving user experiences",
            videoUrl: "https://example.com/videos/usability-testing.mp4",
            duration: 120,
            order: 5,
          },
        ],
      },
      {
        title: "Python for Data Science",
        slug: "python-for-data-science",
        description:
          "Learn Python programming for data science. Master data manipulation, visualization, statistical analysis, and machine learning using Python libraries like Pandas, NumPy, and Scikit-learn.",
        instructor: "Michael Johnson",
        price: 5499,
        thumbnail:
          "https://images.unsplash.com/photo-1526379879527-8559ecfcb970?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Data Science",
        level: "Beginner",
        totalDuration: 3600,
        isPublished: true,
        enrolledStudents: 2145,
        rating: 4.9,
        reviews: 512,
        chapters: [
          {
            title: "Python Basics for Data Science",
            description: "Introduction to Python programming for data analysis",
            videoUrl: "https://example.com/videos/python-basics.mp4",
            duration: 90,
            order: 1,
          },
          {
            title: "Data Manipulation with Pandas",
            description: "Working with data using the Pandas library",
            videoUrl: "https://example.com/videos/pandas.mp4",
            duration: 180,
            order: 2,
          },
          {
            title: "Data Visualization",
            description: "Creating visualizations with Matplotlib and Seaborn",
            videoUrl: "https://example.com/videos/data-viz.mp4",
            duration: 150,
            order: 3,
          },
          {
            title: "Statistical Analysis",
            description: "Performing statistical analysis with Python",
            videoUrl: "https://example.com/videos/stats-analysis.mp4",
            duration: 180,
            order: 4,
          },
          {
            title: "Machine Learning with Scikit-learn",
            description: "Building machine learning models with Scikit-learn",
            videoUrl: "https://example.com/videos/scikit-learn.mp4",
            duration: 210,
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
    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
