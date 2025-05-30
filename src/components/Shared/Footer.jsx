"use client"

import { School, Email, Phone, LocationOn } from "@mui/icons-material"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <School className="text-blue-400 text-3xl" />
              <span className="text-2xl font-bold">Webitya</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering learners worldwide with quality education and innovative learning experiences.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Email className="text-sm" />
                <span>info@webitya.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="text-sm" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <LocationOn className="text-sm" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/courses" className="block text-gray-400 hover:text-white transition-colors">
                Courses
              </Link>
              <Link href="/about-us" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact-us" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <div className="space-y-3">
              <Link href="/privacy-policy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="block text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/faqs" className="block text-gray-400 hover:text-white transition-colors">
                FAQs
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and courses.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Webitya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
