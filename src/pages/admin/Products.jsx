import React, { useState } from 'react'
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react'

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Radar EV Path', brand: 'Oakley', price: 4499, stock: 25, status: 'active' },
  { id: 2, name: 'SPR 17W Symbole', brand: 'Prada', price: 5999, stock: 15, status: 'active' },
  { id: 3, name: 'Panthère de Cartier', brand: 'Cartier', price: 7499, stock: 10, status: 'active' },
  { id: 4, name: 'Hearts IV', brand: 'Chrome Hearts', price: 8999, stock: 8, status: 'active' },
  { id: 5, name: 'DL0325', brand: 'Diesel', price: 3499, stock: 30, status: 'active' },
  { id: 6, name: 'Millionaires', brand: 'Louis Vuitton', price: 9999, stock: 5, status: 'active' },
]

const BRANDS = ['Oakley', 'Prada', 'Cartier', 'Chrome Hearts', 'Diesel', 'Louis Vuitton', 'Lacoste', 'Versace']

const Products = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '', brand: 'Oakley', price: '', stock: '', description: '',
  })

  const openAddForm = () => {
    setEditingProduct(null)
    setFormData({ name: '', brand: 'Oakley', price: '', stock: '', description: '' })
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
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProduct) {
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
          : p
      ))
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: 'active',
      }
      setProducts(prev => [...prev, newProduct])
    }
    setShowForm(false)
  }

  const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
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
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
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
