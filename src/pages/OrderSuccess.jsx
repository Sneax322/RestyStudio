import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, Download, Share2, Home } from 'lucide-react'

export default function OrderSuccess() {
  const { state } = useLocation()

  if (!state) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-500">No order found.</p>
        <Link to="/" className="btn-primary mt-4 inline-block">Go Home</Link>
      </div>
    </div>
  )

  const { orderId, form, items, total } = state
  const date = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 page-enter">
      <div className="max-w-lg mx-auto text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200 dark:shadow-green-900/30 animate-float">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
          Order Placed! 🎉
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Thank you, <strong className="text-slate-700 dark:text-slate-200">{form.name}</strong>! We'll process your order and send the files shortly.
        </p>

        {/* Receipt card */}
        <div id="receipt" className="glass-card rounded-3xl p-6 text-left mb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <p className="font-black text-lg gradient-text">PaperCraft Studio</p>
              <p className="text-xs text-slate-400">Order Receipt</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">{orderId}</p>
              <p className="text-xs text-slate-400">{date}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={item.cartId} className="flex justify-between text-sm">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{item.productName}</p>
                  <p className="text-xs text-slate-400">
                    {item.design?.name} · {Object.values(item.fields).join(' · ')} · ×{item.qty}
                  </p>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">₱{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700 dark:text-slate-200">Total Paid</span>
              <span className="font-black text-xl gradient-text">₱{total}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">via {form.payment?.toUpperCase()} · Ref: {form.refNo}</p>
          </div>

          {/* Contact */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-xs space-y-1 text-slate-500 dark:text-slate-400">
            <p>📱 {form.contact}</p>
            {form.email && <p>📧 {form.email}</p>}
            {form.notes && <p>📝 {form.notes}</p>}
          </div>

          {/* Status */}
          <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-600 dark:text-green-400 text-xs font-semibold">Processing — files will be sent within 24 hours</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handlePrint}
            className="btn-outline flex-1 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Save / Print Receipt
          </button>
          <Link to="/" className="btn-primary flex-1 flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Questions? Message us on Facebook or send an email. We'll get back to you ASAP! 💕
        </p>
      </div>
    </div>
  )
}
