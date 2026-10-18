import { NextResponse } from "next/server";
import { addProduct, deleteProduct, getProducts, updateProduct } from "@/lib/site-data";
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
    const photoUrl = String(body.photoUrl || "").trim();

    if (!name || !category || !description || !priceRange) {
      return NextResponse.json({ error: "Please complete all product fields." }, { status: 400 });
    }

    const product = await addProduct({
      name,
      category,
      description,
      priceRange,
      photoUrl: photoUrl || "",
      featured: Boolean(body.featured),
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "We could not save the product." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isLoggedIn = await isAdminAuthenticated();
  if (!isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = String(body.id || "").trim();
    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const description = String(body.description || "").trim();
    const priceRange = String(body.priceRange || "").trim();
    const photoUrl = String(body.photoUrl || "").trim();

    if (!id || !name || !category || !description || !priceRange) {
      return NextResponse.json({ error: "Please complete all product fields." }, { status: 400 });
    }

    const product = await updateProduct(id, {
      name,
      category,
      description,
      priceRange,
      photoUrl: photoUrl || "",
      featured: Boolean(body.featured),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "We could not update the product." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isLoggedIn = await isAdminAuthenticated();
  if (!isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = String(body.id || "").trim();

    if (!id) {
      return NextResponse.json({ error: "Product id is required." }, { status: 400 });
    }

    const removed = await deleteProduct(id);
    if (!removed) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, removed: true });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: "We could not remove the product." }, { status: 500 });
  }
}
