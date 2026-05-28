import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { useCart } from '../context/CartContext'

const GCASH_NUMBER = '0917-XXX-XXXX'
const MAYA_NUMBER = '0917-XXX-XXXX'
const STORE_NAME = 'PaperCraft Studio'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', contact: '', email: '', payment: 'gcash', refNo: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState('')
  const [payExpanded, setPayExpanded] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.contact.trim()) e.contact = 'Required'
    if (!form.refNo.trim()) e.refNo = 'Required — enter your payment reference number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    const orderId = `PC-${Date.now().toString(36).toUpperCase()}`
    clearCart()
    navigate('/order-success', { state: { orderId, form, items: items.slice(), total } })
  }

  const CopyBtn = ({ text, id }) => (
    <button onClick={() => handleCopy(text, id)}
      className="ml-2 text-fuchsia-500 hover:text-fuchsia-700 transition-colors">
      {copied === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 page-enter">
      <div className="max-w-2xl mx-auto">
        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                step >= s ? 'bg-gradient-to-br from-fuchsia-500 to-violet-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 rounded-full transition-all ${step > s ? 'bg-fuchsia-300' : 'bg-slate-100 dark:bg-slate-800'}`} />}
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8">
          {step === 1 ? 'Your Details' : step === 2 ? 'Payment' : 'Confirm Order'}
        </h1>

        {/* Step 1 — Contact details */}
        {step === 1 && (
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Full Name <span className="text-fuchsia-500">*</span>
              </label>
              <input className={`input-field ${errors.name ? 'border-red-300' : ''}`}
                placeholder="Juan Dela Cruz" value={form.name}
                onChange={e => set('name', e.target.value)} />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Contact Number <span className="text-fuchsia-500">*</span>
              </label>
              <input className={`input-field ${errors.contact ? 'border-red-300' : ''}`}
                placeholder="09XX XXX XXXX" value={form.contact}
                onChange={e => set('contact', e.target.value)} />
              {errors.contact && <p className="text-red-400 text-xs mt-1">{errors.contact}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Email <span className="text-slate-400 font-normal">(optional, for receipt)</span>
              </label>
              <input className="input-field" type="email"
                placeholder="juan@email.com" value={form.email}
                onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Notes</label>
              <textarea className="input-field resize-none" rows={2}
                placeholder="Any special requests?" value={form.notes}
                onChange={e => set('notes', e.target.value)} />
            </div>
            <button onClick={() => { if (form.name && form.contact) setStep(2); else validate() }}
              className="btn-primary w-full mt-2">Continue to Payment →</button>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Order total reminder */}
            <div className="glass-card rounded-2xl p-4 flex justify-between items-center">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Amount to Pay</span>
              <span className="font-black text-2xl gradient-text">₱{total}</span>
            </div>

            {/* Payment method */}
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Choose Payment Method</h3>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { id: 'gcash', label: 'GCash', color: 'from-blue-500 to-cyan-500', number: GCASH_NUMBER },
                  { id: 'maya', label: 'Maya', color: 'from-green-500 to-emerald-500', number: MAYA_NUMBER },
                ].map(m => (
                  <button key={m.id} onClick={() => set('payment', m.id)}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                      form.payment === m.id ? 'border-fuchsia-400 bg-fuchsia-50/50 dark:bg-fuchsia-950/20' : 'border-slate-200 dark:border-slate-700 hover:border-fuchsia-200'
                    }`}>
                    {form.payment === m.id && (
                      <span className="absolute top-2 right-2 w-5 h-5 bg-fuchsia-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-2 text-white font-black text-xs`}>
                      {m.label[0]}
                    </div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{m.label}</div>
                  </button>
                ))}
              </div>

              {/* Payment instructions */}
              <button onClick={() => setPayExpanded(!payExpanded)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-950/30 text-fuchsia-700 dark:text-fuchsia-300 font-semibold text-sm mb-3">
                <span>📱 Payment Instructions</span>
                {payExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {payExpanded && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-sm space-y-2 mb-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>1.</strong> Open your <strong>{form.payment === 'gcash' ? 'GCash' : 'Maya'}</strong> app
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>2.</strong> Send ₱{total} to:{' '}
                    <code className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded font-bold text-fuchsia-600">
                      {form.payment === 'gcash' ? GCASH_NUMBER : MAYA_NUMBER}
                    </code>
                    <CopyBtn text={form.payment === 'gcash' ? GCASH_NUMBER : MAYA_NUMBER} id="number" />
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>3.</strong> Account name: <strong>{STORE_NAME}</strong>
                    <CopyBtn text={STORE_NAME} id="store" />
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong>4.</strong> Enter the <strong>reference number</strong> from your receipt below.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Payment Reference Number <span className="text-fuchsia-500">*</span>
                </label>
                <input className={`input-field ${errors.refNo ? 'border-red-300' : ''}`}
                  placeholder="e.g. 1234567890"
                  value={form.refNo}
                  onChange={e => set('refNo', e.target.value)} />
                {errors.refNo && <p className="text-red-400 text-xs mt-1">{errors.refNo}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline flex-1">← Back</button>
              <button onClick={() => { if (validate()) setStep(3) }} className="btn-primary flex-1">Review Order →</button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Order Review</h3>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.cartId} className="flex justify-between items-center text-sm py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{item.productName} × {item.qty}</p>
                      <p className="text-slate-400 text-xs">{item.design?.name} · {item.fields?.subject}</p>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">₱{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center font-black text-lg pt-1">
                  <span className="text-slate-700 dark:text-slate-200">Total</span>
                  <span className="gradient-text">₱{total}</span>
                </div>
              </div>

              {/* Contact summary */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-sm space-y-1.5">
                <p><span className="text-slate-400">Name:</span> <strong className="text-slate-700 dark:text-slate-200">{form.name}</strong></p>
                <p><span className="text-slate-400">Contact:</span> <strong className="text-slate-700 dark:text-slate-200">{form.contact}</strong></p>
                <p><span className="text-slate-400">Payment:</span> <strong className="text-slate-700 dark:text-slate-200 capitalize">{form.payment} · Ref: {form.refNo}</strong></p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-outline flex-1" disabled={submitting}>← Back</button>
              <button onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-70">
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : (
                  <>✅ Place Order</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
