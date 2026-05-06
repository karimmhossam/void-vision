import React, { useState } from 'react'
import { Printer, Eye, ChevronDown, Search } from 'lucide-react'



const Orders = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      if (res.ok) setOrders(data)
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
        if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder(prev => ({ ...prev, status: newStatus }))
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus)

  const printShippingLabel = (order) => {
    const labelWindow = window.open('', '_blank', 'width=400,height=600')
    labelWindow.document.write(`
      <html>
      <head>
        <title>Shipping Label — ${order.id}</title>
        <style>
          body { font-family: 'Courier New', monospace; padding: 2rem; background: #fff; color: #000; }
          .label { border: 3px solid #000; padding: 2rem; max-width: 350px; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 1rem; margin-bottom: 1rem; }
          .header h1 { font-size: 1.2rem; margin: 0; letter-spacing: 0.2em; }
          .field { margin-bottom: 0.75rem; }
          .field-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #666; }
          .field-value { font-size: 0.9rem; font-weight: bold; margin-top: 0.15rem; }
          .barcode { text-align: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 2px solid #000; }
          .barcode-text { font-size: 1.2rem; letter-spacing: 0.3em; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="header">
            <h1>VOID VISION</h1>
            <p style="font-size:0.75rem; margin-top:0.25rem;">Premium Eyewear</p>
          </div>
          <div class="field">
            <div class="field-label">Ship To</div>
            <div class="field-value">${order.customer}</div>
          </div>
          <div class="field">
            <div class="field-label">Address</div>
            <div class="field-value">${order.address}</div>
          </div>
          <div class="field">
            <div class="field-label">Order</div>
            <div class="field-value">${order.id}</div>
          </div>
          <div class="field">
            <div class="field-label">Item</div>
            <div class="field-value">${order.brand} — ${order.product}</div>
          </div>
          <div class="field">
            <div class="field-label">Date</div>
            <div class="field-value">${order.date}</div>
          </div>
          <div class="barcode">
            <div class="barcode-text">${order.id}</div>
            <p style="font-size:0.6rem; margin-top:0.5rem; color:#999;">HANDLE WITH CARE</p>
          </div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `)
    labelWindow.document.close()
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Orders</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {orders.length} total orders
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ paddingRight: '2rem', minWidth: '140px' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--glass-border)',
            padding: '2rem', width: '100%', maxWidth: '500px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700 }}>Order {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <span className="form-label">Customer</span>
                <p>{selectedOrder.customer}</p>
              </div>
              <div>
                <span className="form-label">Email</span>
                <p>{selectedOrder.email}</p>
              </div>
              <div>
                <span className="form-label">Product</span>
                <p>{selectedOrder.brand} — {selectedOrder.product}</p>
              </div>
              <div>
                <span className="form-label">Address</span>
                <p>{selectedOrder.address}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span className="form-label">Amount</span>
                  <p style={{ fontWeight: 800 }}>EGP {selectedOrder.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="form-label">Status</span>
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--surface-accent)', color: 'var(--text)' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button className="btn-primary" onClick={() => printShippingLabel(selectedOrder)} style={{ flex: 1, justifyContent: 'center' }}>
                <Printer size={16} /> Print Label
              </button>
              <button className="btn-outline" onClick={() => setSelectedOrder(null)} style={{ flex: 1, justifyContent: 'center' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 700 }}>{order.id}</td>
                <td>{order.customer}</td>
                <td>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{order.brand}</span>
                  <br />{order.product}
                </td>
                <td style={{ fontWeight: 700 }}>EGP {order.total_price?.toLocaleString()}</td>
                <td style={{ color: 'var(--text-muted)' }}>{order.created_at?.split(' ')[0]}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>{order.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-icon" onClick={() => setSelectedOrder(order)} title="View Details">
                      <Eye size={14} />
                    </button>
                    <button className="btn-icon" onClick={() => printShippingLabel(order)} title="Print Shipping Label">
                      <Printer size={14} />
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

export default Orders
