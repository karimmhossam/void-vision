import React from 'react'
import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, Users } from 'lucide-react'

const Dashboard = () => {
  const [productsCount, setProductsCount] = React.useState(0)
  const [recentOrders, setRecentOrders] = React.useState([])
  const [revenue, setRevenue] = React.useState(0)

  React.useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/orders').then(r => r.json())
    ]).then(([products, orders]) => {
      if (Array.isArray(products)) setProductsCount(products.length)
      if (Array.isArray(orders)) {
        setRecentOrders(orders.slice(0, 5))
        const total = orders.reduce((sum, order) => sum + (order.total_price || 0), 0)
        setRevenue(total)
      }
    }).catch(console.error)
  }, [])

  const stats = [
    { label: 'Revenue', value: `EGP ${revenue.toLocaleString()}`, change: '+0%', positive: true, icon: DollarSign },
    { label: 'Orders', value: recentOrders.length.toString(), change: '+0%', positive: true, icon: ShoppingCart },
    { label: 'Products', value: productsCount.toString(), change: 'Active', positive: true, icon: Package },
    { label: 'Visitors', value: '1', change: 'Today', positive: true, icon: Users },
  ]

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Welcome back. Here's what's happening with your store.
          </p>
        </div>
      </div>

      <div className="admin-stats">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-card-label">{stat.label}</span>
              <stat.icon size={16} style={{ color: 'var(--text-dim)' }} />
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className={`stat-card-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.positive ? <TrendingUp size={12} style={{ marginRight: 4 }} /> : <TrendingDown size={12} style={{ marginRight: 4 }} />}
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
            <ShoppingCart size={32} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p>No orders yet. They'll appear here once customers start purchasing.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.product_id}</td>
                  <td>EGP {order.total_price?.toLocaleString()}</td>
                  <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Dashboard
