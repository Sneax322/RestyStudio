import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import NotebookPreview from '../components/NotebookPreview'

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 page-enter">
      <div className="text-center">
        <div className="text-6xl mb-6 animate-float">🛒</div>
        <h2 className="font-black text-2xl text-slate-800 dark:text-slate-100 mb-3">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Start shopping for cute printed notebook labels!</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 page-enter">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">
            Your Cart <span className="gradient-text">({items.length})</span>
          </h1>
          <button onClick={clearCart} className="text-sm text-slate-400 hover:text-red-400 transition-colors font-medium">
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.cartId} className="glass-card rounded-2xl p-4 flex gap-4">
                {/* Mini preview */}
                <div className="w-24 flex-shrink-0">
                  <NotebookPreview design={item.design} values={item.fields} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{item.productName}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.design?.name}</p>
                    </div>
                    <button onClick={() => removeItem(item.cartId)}
                      className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Field values */}
                  <div className="mt-2 space-y-0.5">
                    {Object.entries(item.fields).map(([k, v]) => (
                      <p key={k} className="text-xs text-slate-500 dark:text-slate-400">
                        <span className="capitalize font-medium">{k}:</span> {v}
                      </p>
                    ))}
                  </div>

                  {/* Qty & price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.cartId, item.qty - 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-sm w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.cartId, item.qty + 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-black gradient-text">₱{item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item.cartId} className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 truncate mr-2">
                      {item.productName} × {item.qty}
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex-shrink-0">₱{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-3 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Total</span>
                  <span className="font-black text-2xl gradient-text">₱{total}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">+ delivery fee (if applicable)</p>
              </div>

              <button onClick={() => navigate('/checkout')}
                className="btn-primary w-full flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <Link to="/products" className="block text-center text-sm text-slate-400 hover:text-fuchsia-600 mt-3 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
