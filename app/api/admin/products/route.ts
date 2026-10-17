import { NextResponse } from "next/server";
import { addProduct, getProducts } from "@/lib/site-data";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const isLoggedIn = await isAdminAuthenticated();
  if (!isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const isLoggedIn = await isAdminAuthenticated();
  if (!isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const description = String(body.description || "").trim();
    const priceRange = String(body.priceRange || "").trim();

    if (!name || !category || !description || !priceRange) {
      return NextResponse.json({ error: "Please complete all product fields." }, { status: 400 });
    }

    const product = await addProduct({
      name,
      category,
      description,
      priceRange,
      featured: Boolean(body.featured),
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "We could not save the product." }, { status: 500 });
  }
}
