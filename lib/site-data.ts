import fs from "node:fs";
import path from "node:path";

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

export async function getProducts(): Promise<ProductRecord[]> {
  const data = readStore() as { products?: ProductRecord[] };
  return data.products?.length ? (data.products as ProductRecord[]) : fallbackProducts;
}

export async function getCertifications(): Promise<Array<{ id: string; title: string; description: string | null; fileUrl: string; active: boolean }>> {
  const data = readStore() as { certifications?: Array<{ id: string; title: string; description: string | null; fileUrl: string; active: boolean }> };
  return data.certifications?.length ? data.certifications : fallbackCertifications;
}

export async function getTestimonials(): Promise<Array<{ id: string; name: string; role: string; quote: string }>> {
  const data = readStore() as { testimonials?: Array<{ id: string; name: string; role: string; quote: string }> };
  return data.testimonials?.length ? data.testimonials : fallbackTestimonials;
}

export async function getSettings() {
  const data = readStore() as { settings?: Record<string, string> };
  return { ...fallbackSettings, ...(data.settings || {}) };
}

export async function getQuoteRequests(): Promise<QuoteRequestRecord[]> {
  const data = readStore();
  return Array.isArray(data.quoteRequests) ? data.quoteRequests : [];
}

export async function saveQuoteRequest(input: Record<string, string>) {
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
