import { AdminProductManager } from "@/components/admin-product-manager";
import { getProducts, getQuoteRequests } from "@/lib/site-data";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const quoteRequests = await getQuoteRequests();
  const products = await getProducts();

  return (
    <div className="admin-page">
      <div className="container admin-container">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin Panel</p>
            <h1>Quote Requests</h1>
          </div>
          <a href="/" className="button secondary">
            View public site
          </a>
        </header>

        <div className="admin-stat-grid">
          <div className="stat-card">
            <strong>{quoteRequests.length}</strong>
            <span>Total requests</span>
          </div>
          <div className="stat-card">
            <strong>{quoteRequests.filter((item) => item.status === "New").length}</strong>
            <span>New</span>
          </div>
          <div className="stat-card">
            <strong>{quoteRequests.filter((item) => item.status === "Contacted").length}</strong>
            <span>Contacted</span>
          </div>
        </div>

        <div className="admin-product-section">
          <AdminProductManager initialProducts={products} />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Organisation</th>
                <th>Client</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {quoteRequests.map((quote) => (
                <tr key={quote.id}>
                  <td>{quote.fullName}</td>
                  <td>{quote.organisation}</td>
                  <td>{quote.clientType}</td>
                  <td>{quote.productNeeded}</td>
                  <td><span className="status-pill">{quote.status}</span></td>
                  <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
