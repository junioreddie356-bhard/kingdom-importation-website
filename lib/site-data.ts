import fs from "node:fs";
import path from "node:path";

import { hasSupabase, supabaseAdmin } from "@/lib/supabase";

export type ProductRecord = {
  id: string;
  name: string;
  category: string;
  description: string;
  priceRange: string;
  photoUrl?: string | null;
  featured?: boolean;
};

export type QuoteRequestRecord = {
  id: string;
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  clientType: string;
  productNeeded: string;
  quantity?: string;
  deliveryLocation: string;
  additionalDetails?: string;
  status: string;
  notes?: string;
  createdAt: string;
};

const supabaseReady = hasSupabase();

function asString(value: unknown, fallback = "") {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

function normalizeProduct(row: Record<string, unknown>): ProductRecord {
  return {
    id: asString(row.id),
    name: asString(row.name),
    category: asString(row.category),
    description: asString(row.description),
    priceRange: asString(row.price_range ?? row.priceRange, "N/A"),
    photoUrl: asString(row.photo_url ?? row.photoUrl, ""),
    featured: Boolean(row.featured),
  };
}

function normalizeQuote(row: Record<string, unknown>): QuoteRequestRecord {
  return {
    id: asString(row.id),
    fullName: asString(row.full_name ?? row.fullName),
    organisation: asString(row.organisation),
    email: asString(row.email),
    phone: asString(row.phone),
    clientType: asString(row.client_type ?? row.clientType),
    productNeeded: asString(row.product_needed ?? row.productNeeded),
    quantity: asString(row.quantity, ""),
    deliveryLocation: asString(row.delivery_location ?? row.deliveryLocation),
    additionalDetails: asString(row.additional_details ?? row.additionalDetails, ""),
    status: asString(row.status, "New"),
    notes: asString(row.notes, ""),
    createdAt: asString(row.created_at ?? row.createdAt, new Date().toISOString()),
  };
}

export const fallbackProducts: ProductRecord[] = [
  {
    id: "edu-books",
    name: "Exercise Books and Stationery",
    category: "Educational Materials",
    description: "Exercise books, pencils, pens and classroom essentials for schools and institutions.",
    priceRange: "GHS 120 - GHS 1,500",
    photoUrl: "",
    featured: true,
  },
  {
    id: "school-furniture",
    name: "School Furniture",
    category: "Educational Materials",
    description: "Desks, chairs, whiteboards and classroom furniture designed for long-term use.",
    priceRange: "GHS 180 - GHS 4,800",
    photoUrl: "",
    featured: true,
  },
  {
    id: "solar-systems",
    name: "Solar Systems",
    category: "Solar and Renewable Energy",
    description: "3KW to 30KW systems with panels, inverters, batteries and complete installations.",
    priceRange: "GHS 4,500 - GHS 220,000",
    photoUrl: "",
    featured: true,
  },
  {
    id: "medical-equipment",
    name: "Medical Equipment",
    category: "Medical Equipment",
    description: "Autoclaves, monitors, consumables and hospital furniture for clinics and health facilities.",
    priceRange: "GHS 600 - GHS 52,000",
    photoUrl: "",
    featured: true,
  },
  {
    id: "wash-supplies",
    name: "WASH Supplies",
    category: "WASH Supplies",
    description: "Pumps, pipes, filtration kits, testing equipment and reliable water access systems.",
    priceRange: "GHS 220 - GHS 16,500",
    photoUrl: "",
    featured: true,
  },
  {
    id: "agri-tools",
    name: "Agricultural Tools",
    category: "Agricultural Equipment",
    description: "Solar irrigation systems, hand tools, maize shellers, mills and farm equipment.",
    priceRange: "GHS 180 - GHS 30,000",
    photoUrl: "",
    featured: true,
  },
  {
    id: "car-fleet",
    name: "Passenger Cars",
    category: "Vehicles",
    description: "Fuel-efficient and commercial cars for operations, transport and institutional mobility.",
    priceRange: "GHS 24,000 - GHS 220,000",
    photoUrl: "",
    featured: true,
  },
  {
    id: "motorbike-fleet",
    name: "Motorbikes",
    category: "Vehicles",
    description: "Reliable motorcycles for fast transport, logistics and daily commercial movement.",
    priceRange: "GHS 3,200 - GHS 18,000",
    photoUrl: "",
    featured: true,
  },
  {
    id: "truck-fleet",
    name: "Heavy Duty Trucks",
    category: "Vehicles",
    description: "Utility trucks and cargo vehicles for distribution, trade and project logistics.",
    priceRange: "GHS 42,000 - GHS 320,000",
    photoUrl: "",
    featured: true,
  },
  {
    id: "bus-fleet",
    name: "Passenger Buses",
    category: "Vehicles",
    description: "Mini and mid-size buses for transport services, schools and institutional mobility.",
    priceRange: "GHS 55,000 - GHS 260,000",
    photoUrl: "",
    featured: true,
  },
  {
    id: "other-vehicles",
    name: "Other Vehicles",
    category: "Vehicles",
    description: "Special purpose transport, utility vehicles and additional fleet requirements.",
    priceRange: "GHS 8,000 - GHS 180,000",
    photoUrl: "",
    featured: true,
  },
];

export const fallbackCertifications = [
  { id: "ce", title: "CE Certificate (Solar Panels)", description: "Certifies compliance for imported solar equipment and quality assurance documentation.", fileUrl: "/request-quote", active: true },
  { id: "emc", title: "EMC Test Report (Lithium Battery)", description: "Battery safety and compatibility documentation for technical compliance review.", fileUrl: "/request-quote", active: true },
  { id: "iso", title: "ISO 9001 Certificate", description: "Quality management compliance for partner supplier assurance.", fileUrl: "/request-quote", active: true },
  { id: "un38", title: "UN38.3 Certificate (Battery)", description: "International battery safety certification available on request for qualified buyers.", fileUrl: "/request-quote", active: true },
];

export const fallbackTestimonials = [
  { id: "1", name: "Mariam Abubakari", role: "School Administrator", quote: "Kingz & Amazing Import helped us deliver quality classroom materials ahead of the term." },
  { id: "2", name: "Dr. Daniel Tetteh", role: "Clinic Director", quote: "Their import coordination and documentation saved us time and reduced stress during procurement." },
  { id: "3", name: "Aziz Nuhu", role: "NGO Program Manager", quote: "The team was transparent, compliant and dependable from sourcing to final delivery in Tamale." },
];

export const fallbackSettings = {
  businessName: "KINGZ & AMAZING IMPORT",
  heroTitle: "We Bring What You Need From China — Delivered to Your Door in Tamale",
  heroSubtitle: "Import management for schools, clinics, NGOs and businesses across Northern Ghana.",
  companyPhone: "055 188 9999",
  whatsapp: "+233 55 188 9999",
  email: "kingzamazingimport@gmail.com",
  address: "BA288 Chinkara Street, Gumani, Tamale",
  officeHours: "Monday to Friday, 8am to 6pm",
};

const dataFilePath = path.join(process.cwd(), "data", "site-data.json");

function readStore() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify({
      products: fallbackProducts,
      certifications: fallbackCertifications,
      testimonials: fallbackTestimonials,
      settings: fallbackSettings,
      quoteRequests: [],
    }, null, 2));
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  }
}

function writeStore(data: Record<string, unknown>) {
  fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

async function getProductsFromSupabase(): Promise<ProductRecord[] | null> {
  if (!supabaseReady || !supabaseAdmin) return null;

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase product read error:", error.message);
    return null;
  }

  return (data ?? []).map((row) => normalizeProduct(row as Record<string, unknown>));
}

async function getQuoteRequestsFromSupabase(): Promise<QuoteRequestRecord[] | null> {
  if (!supabaseReady || !supabaseAdmin) return null;

  const { data, error } = await supabaseAdmin
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase quote read error:", error.message);
    return null;
  }

  return (data ?? []).map((row) => normalizeQuote(row as Record<string, unknown>));
}

export async function getProducts(): Promise<ProductRecord[]> {
  const fromSupabase = await getProductsFromSupabase();
  if (fromSupabase) return fromSupabase;

  const data = readStore() as { products?: ProductRecord[] };
  return data.products?.length ? (data.products as ProductRecord[]) : fallbackProducts;
}

export async function getCertifications(): Promise<Array<{ id: string; title: string; description: string | null; fileUrl: string; active: boolean }>> {
  if (supabaseReady && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from("certifications").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      return (data ?? []).map((row) => ({
        id: asString(row.id),
        title: asString(row.title),
        description: asString(row.description, ""),
        fileUrl: asString(row.file_url ?? row.fileUrl, "/request-quote"),
        active: Boolean(row.active),
      }));
    }
  }

  const data = readStore() as { certifications?: Array<{ id: string; title: string; description: string | null; fileUrl: string; active: boolean }> };
  return data.certifications?.length ? data.certifications : fallbackCertifications;
}

export async function getTestimonials(): Promise<Array<{ id: string; name: string; role: string; quote: string }>> {
  if (supabaseReady && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from("testimonials").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      return (data ?? []).map((row) => ({
        id: asString(row.id),
        name: asString(row.name),
        role: asString(row.role),
        quote: asString(row.quote),
      }));
    }
  }

  const data = readStore() as { testimonials?: Array<{ id: string; name: string; role: string; quote: string }> };
  return data.testimonials?.length ? data.testimonials : fallbackTestimonials;
}

export async function getSettings() {
  if (supabaseReady && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from("site_settings").select("key, value");
    if (!error && data) {
      const values = (data ?? []).reduce<Record<string, string>>((acc, row) => {
        const record = row as { key?: string; value?: Record<string, string> | string };
        if (record.key && record.value && typeof record.value === "object") {
          Object.assign(acc, record.value as Record<string, string>);
        }
        return acc;
      }, {});

      return { ...fallbackSettings, ...values };
    }
  }

  const data = readStore() as { settings?: Record<string, string> };
  return { ...fallbackSettings, ...(data.settings || {}) };
}

export async function getQuoteRequests(): Promise<QuoteRequestRecord[]> {
  const fromSupabase = await getQuoteRequestsFromSupabase();
  if (fromSupabase) return fromSupabase;

  const data = readStore();
  return Array.isArray(data.quoteRequests) ? data.quoteRequests : [];
}

export async function saveQuoteRequest(input: Record<string, string>) {
  if (supabaseReady && supabaseAdmin) {
    const payload = {
      full_name: String(input.fullName || "").trim(),
      organisation: String(input.organisation || "").trim(),
      email: String(input.email || "").trim(),
      phone: String(input.phone || "").trim(),
      client_type: String(input.clientType || "").trim(),
      product_needed: String(input.productNeeded || "").trim(),
      quantity: String(input.quantity || "").trim(),
      delivery_location: String(input.deliveryLocation || "").trim(),
      additional_details: String(input.additionalDetails || "").trim(),
      status: "New",
      notes: "",
    };

    const { data, error } = await supabaseAdmin.from("quote_requests").insert(payload).select().single();
    if (!error && data) {
      return normalizeQuote(data as Record<string, unknown>);
    }
    console.error("Supabase quote insert error:", error?.message);
  }

  const data = readStore();
  const quote: QuoteRequestRecord = {
    id: `quote-${Date.now()}`,
    fullName: input.fullName,
    organisation: input.organisation,
    email: input.email,
    phone: input.phone,
    clientType: input.clientType,
    productNeeded: input.productNeeded,
    quantity: input.quantity || "",
    deliveryLocation: input.deliveryLocation,
    additionalDetails: input.additionalDetails || "",
    status: "New",
    notes: "",
    createdAt: new Date().toISOString(),
  };

  data.quoteRequests = [quote, ...(data.quoteRequests || [])];
  writeStore(data);
  return quote;
}

export async function addProduct(input: {
  name: string;
  category: string;
  description: string;
  priceRange: string;
  featured?: boolean;
  photoUrl?: string | null;
}) {
  if (supabaseReady && supabaseAdmin) {
    const payload = {
      name: String(input.name || "").trim(),
      category: String(input.category || "").trim(),
      description: String(input.description || "").trim(),
      price_range: String(input.priceRange || "").trim(),
      photo_url: String(input.photoUrl || "").trim(),
      featured: Boolean(input.featured),
    };

    const { data, error } = await supabaseAdmin.from("products").insert(payload).select().single();
    if (!error && data) {
      return normalizeProduct(data as Record<string, unknown>);
    }
    console.error("Supabase product insert error:", error?.message);
  }

  const data = readStore();
  const product: ProductRecord = {
    id: `product-${Date.now()}`,
    name: input.name.trim(),
    category: input.category.trim(),
    description: input.description.trim(),
    priceRange: input.priceRange.trim(),
    featured: Boolean(input.featured),
    photoUrl: input.photoUrl || "",
  };

  data.products = [product, ...(Array.isArray(data.products) ? data.products : [])];
  writeStore(data);
  return product;
}

export async function updateProduct(productId: string, input: {
  name: string;
  category: string;
  description: string;
  priceRange: string;
  featured?: boolean;
  photoUrl?: string | null;
}) {
  if (supabaseReady && supabaseAdmin) {
    const payload = {
      name: String(input.name || "").trim(),
      category: String(input.category || "").trim(),
      description: String(input.description || "").trim(),
      price_range: String(input.priceRange || "").trim(),
      photo_url: String(input.photoUrl || "").trim(),
      featured: Boolean(input.featured),
    };

    const { data, error } = await supabaseAdmin.from("products").update(payload).eq("id", productId).select().single();
    if (!error && data) {
      return normalizeProduct(data as Record<string, unknown>);
    }
    console.error("Supabase product update error:", error?.message);
  }

  const data = readStore() as { products?: ProductRecord[] };
  const products: ProductRecord[] = Array.isArray(data.products) ? data.products : [];
  const index = products.findIndex((product: ProductRecord) => product.id === productId);

  if (index === -1) return null;

  const updated: ProductRecord = {
    ...products[index],
    name: input.name.trim(),
    category: input.category.trim(),
    description: input.description.trim(),
    priceRange: input.priceRange.trim(),
    featured: Boolean(input.featured),
    photoUrl: input.photoUrl || "",
  };

  products[index] = updated;
  data.products = products;
  writeStore(data);
  return updated;
}

export async function deleteProduct(productId: string) {
  if (supabaseReady && supabaseAdmin) {
    const { error } = await supabaseAdmin.from("products").delete().eq("id", productId);
    if (!error) {
      return true;
    }
    console.error("Supabase product delete error:", error.message);
  }

  const data = readStore() as { products?: ProductRecord[] };
  const products: ProductRecord[] = Array.isArray(data.products) ? data.products : [];
  const beforeLength = products.length;
  data.products = products.filter((product: ProductRecord) => product.id !== productId);

  if (data.products.length === beforeLength) {
    return false;
  }

  writeStore(data);
  return true;
}
