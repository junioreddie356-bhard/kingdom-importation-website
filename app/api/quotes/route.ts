import { NextResponse } from "next/server";
import { saveQuoteRequest } from "@/lib/site-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const requiredFields = [
      "fullName",
      "organisation",
      "email",
      "phone",
      "clientType",
      "productNeeded",
      "deliveryLocation",
    ];

    const missing = requiredFields.filter((field) => !String(body[field] || "").trim());
    if (missing.length) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const quote = await saveQuoteRequest({
      fullName: String(body.fullName),
      organisation: String(body.organisation),
      email: String(body.email),
      phone: String(body.phone),
      clientType: String(body.clientType),
      productNeeded: String(body.productNeeded),
      quantity: String(body.quantity || ""),
      deliveryLocation: String(body.deliveryLocation),
      additionalDetails: String(body.additionalDetails || ""),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you. We have received your request and will respond within 24 hours.",
      quote,
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json({
      success: false,
      error: "We could not submit your request. Please try again.",
    }, { status: 500 });
  }
}
