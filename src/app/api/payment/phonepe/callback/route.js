import { NextResponse } from "next/server"
import crypto from "crypto"
import { logger } from "@/lib/logger"

export async function POST(request) {
  try {
    const body = await request.json()
    const { response } = body

    // Decode the base64 response
    const decodedResponse = Buffer.from(response, "base64").toString("utf-8")
    const responseData = JSON.parse(decodedResponse)

    const merchantId = process.env.PHONEPE_MERCHANT_ID
    const saltKey = process.env.PHONEPE_SALT_KEY
    const saltIndex = process.env.PHONEPE_SALT_INDEX || "1"

    // Verify checksum
    const stringToHash = response + "/pg/v1/status/" + merchantId + "/" + responseData.transactionId + saltKey
    const sha256Hash = crypto.createHash("sha256").update(stringToHash).digest("hex")
    const expectedChecksum = sha256Hash + "###" + saltIndex

    const receivedChecksum = request.headers.get("X-VERIFY")

    if (expectedChecksum !== receivedChecksum) {
      logger.error("PhonePe callback checksum verification failed")
      return NextResponse.json({ error: "Invalid checksum" }, { status: 400 })
    }

    logger.info("PhonePe callback received", {
      transactionId: responseData.transactionId,
      status: responseData.state,
    })

    // Process the payment status
    if (responseData.state === "COMPLETED") {
      // Payment successful - redirect to success page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?paymentId=${responseData.transactionId}&gateway=phonepe`,
      )
    } else {
      // Payment failed - redirect to failure page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed?reason=${responseData.responseCodeDescription}`,
      )
    }
  } catch (error) {
    logger.error("PhonePe callback processing failed", { error: error.message })
    return NextResponse.json({ error: "Callback processing failed" }, { status: 500 })
  }
}
