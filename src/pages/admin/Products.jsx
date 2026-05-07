import React, { useState } from 'react'
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react'



const BRANDS = ['Oakley', 'Prada', 'Cartier', 'Chrome Hearts', 'Diesel', 'Louis Vuitton', 'Lacoste', 'Versace']

const Products = () => {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [formData, setFormData] = useState({
    name: '', brand: 'Oakley', price: '', stock: '', description: '', status: 'active',
  })

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type })
    setTimeout(() => setToastMessage(null), 3000)
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (res.ok) setProducts(data)
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    fetchProducts()
  }, [])

  const openAddForm = () => {
    setEditingProduct(null)
    setFormData({ name: '', brand: 'Oakley', price: '', stock: '', description: '', status: 'active' })
    setShowForm(true)
  }

  const openEditForm = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || '',
      status: product.status || 'active',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    }

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (res.ok) {
          await fetchProducts()
          showToast('Product updated successfully')
        } else {
          showToast('Failed to update product', 'error')
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (res.ok) {
          await fetchProducts()
          showToast('Product added successfully')
        } else {
          showToast('Failed to add product', 'error')
        }
      }
      setShowForm(false)
    } catch (err) {
      console.error(err)
      showToast('Error saving product', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
        if (res.ok) {
          await fetchProducts()
          showToast('Product deleted successfully')
        } else {
          showToast('Failed to delete product', 'error')
        }
      } catch (err) {
        console.error(err)
        showToast('Error deleting product', 'error')
      }
    }
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Products</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Manage your sunglasses inventory
          </p>
        </div>
        <button className="btn-primary" onClick={openAddForm}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: toastMessage.type === 'error' ? 'var(--danger)' : 'var(--success)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '4px',
          fontWeight: 600,
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.3s forwards'
        }}>
          {toastMessage.message}
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--glass-border)',
            padding: '2rem', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700 }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: '100%' }}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Radar EV Path"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <select
                    className="form-select"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  >
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    className="form-input"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="89.99"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product Images</label>
                <div style={{
                  border: '1px dashed var(--glass-border)',
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                }}>
                  <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontSize: '0.85rem' }}>Click to upload or drag and drop</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ fontWeight: 600 }}>{product.name}</td>
                <td>
                  <span style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}>
                    {product.brand}
                  </span>
                </td>
                <td>EGP {product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>
                  <span className="status-badge shipped">{product.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-icon" onClick={() => openEditForm(product)} title="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => deleteProduct(product.id)}
                      title="Delete"
                      style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products
