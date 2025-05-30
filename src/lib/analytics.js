export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const trackEvent = (action, category, label, value) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPageView = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_location: url,
    })
  }
}

export const trackPurchase = (transactionId, value, currency = "USD", items = []) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    })
  }
}

export const trackCourseEnrollment = (courseId, courseName, value) => {
  trackEvent("course_enrollment", "engagement", courseName, value)

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: "USD",
      value: value,
      items: [
        {
          item_id: courseId,
          item_name: courseName,
          category: "course",
          quantity: 1,
          price: value,
        },
      ],
    })
  }
}
