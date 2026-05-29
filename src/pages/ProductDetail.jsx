import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Check, Minus, Plus, ShoppingCart, ChevronLeft } from 'lucide-react'
import products from '../data/products.json'
import NotebookPreview from '../components/NotebookPreview'
import { useCart } from '../context/CartContext'

const DESIGN_CATEGORIES = [
  { id: 'cartoons', label: 'Cartoons' },
  { id: 'category-2', label: 'Category 2' },
  { id: 'category-3', label: 'Category 3' },
  { id: 'category-4', label: 'Category 4' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = products.find(p => p.id === id)

  const [selectedCategory, setSelectedCategory] = useState(
    product?.designs?.[0]?.category || 'cartoons'
  )

  const designsInCategory = useMemo(() => {
    if (!product?.designs) return []
    return product.designs.filter(d => (d.category || 'cartoons') === selectedCategory)
  }, [product, selectedCategory])

  const [selectedDesign, setSelectedDesign] = useState(
    designsInCategory?.[0] || product?.designs?.[0] || null
  )

  const [values, setValues] = useState({})
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [errors, setErrors] = useState({})

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">😅</div>
        <h2 className="font-bold text-xl text-slate-700 dark:text-slate-300">Product not found</h2>
      </div>
    </div>
  )

  if (product.designs?.length === 0) return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="text-center glass-card rounded-3xl p-10 max-w-sm">
        <div className="text-5xl mb-4">⏳</div>
        <h2 className="font-bold text-xl text-slate-700 dark:text-slate-300 mb-2">{product.name}</h2>
        <p className="text-slate-500 text-sm mb-6">This product is coming soon! We're working on beautiful designs for you.</p>
        <button onClick={() => navigate(-1)} className="btn-outline">← Go Back</button>
      </div>
    </div>
  )

  const validate = () => {
    const e = {}
    product.fields.forEach(f => {
      if (f.required && !values[f.id]?.trim()) e[f.id] = `${f.label} is required`
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleAddToCart = () => {
    if (!validate()) return
    const cartId = `${product.id}-${selectedDesign.id}-${Date.now()}`
    addItem({
      cartId,
      productId: product.id,
      productName: product.name,
      design: selectedDesign,
      fields: values,
      qty,
      price: product.price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 page-enter">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 font-medium mb-8 transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Preview */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="glass-card rounded-3xl p-6">
              <h2 className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Live Preview</h2>
              <NotebookPreview design={selectedDesign} values={values} />
              <p className="text-center text-xs text-slate-400 mt-3">Updates as you type ✨</p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="space-y-6">
            {/* Product info */}
            <div>
              <p className="text-fuchsia-500 font-semibold text-sm uppercase tracking-wider mb-1">{product.category}</p>
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">{product.name}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{product.description}</p>
              <div className="mt-3">
                <span className="font-black text-2xl gradient-text">₱{product.price}</span>
                <span className="text-slate-400 text-sm ml-1">{product.unit}</span>
              </div>
            </div>

            {/* Design selector */}
            <div>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3">Choose a Design</h3>

              {/* 1) Category pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {DESIGN_CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.id)
                      const nextDesign = product.designs.find(d => (d.category || 'cartoons') === c.id)
                      if (nextDesign) setSelectedDesign(nextDesign)
                      else setSelectedDesign(null)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      selectedCategory === c.id
                        ? 'bg-fuchsia-500 text-white border-fuchsia-500'
                        : 'bg-white/40 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-700 hover:border-fuchsia-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* 2) Design thumbnails (filtered by category) */}
              {designsInCategory.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-500 dark:text-slate-400">
                  No designs yet in this category.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {designsInCategory.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDesign(d)}
                      className={`relative rounded-2xl p-2.5 text-left transition-all duration-200 border-2 overflow-hidden ${
                        selectedDesign?.id === d.id
                          ? 'border-fuchsia-400 shadow-md shadow-fuchsia-100 dark:shadow-fuchsia-900/30 scale-[1.02]'
                          : 'border-transparent hover:border-fuchsia-200 hover:scale-[1.01]'
                      }`}
                    >
                      {selectedDesign?.id === d.id && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-fuchsia-500 rounded-full flex items-center justify-center z-10">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      )}

                      <div className="w-full aspect-[2/1] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={`/designs/${d.id}.png`}
                          alt={d.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="mt-2">
                        <div className="text-xs font-bold" style={{ color: d.accent }}>{d.name}</div>
                        <div className="text-xs opacity-70" style={{ color: d.accent }}>{d.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Customization fields */}
            <div>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3">Customize Your Label</h3>
              <div className="space-y-3">
                {product.fields.map(f => (
                  <div key={f.id}>
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      {f.label} {f.required && <span className="text-fuchsia-500">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      maxLength={f.maxLength}
                      value={values[f.id] || ''}
                      onChange={e => {
                        setValues(prev => ({ ...prev, [f.id]: e.target.value }))
                        if (errors[f.id]) setErrors(prev => ({ ...prev, [f.id]: '' }))
                      }}
                      className={`input-field ${errors[f.id] ? 'border-red-300 focus:ring-red-200' : ''}`}
                    />
                    {errors[f.id] && <p className="text-red-400 text-xs mt-1">{errors[f.id]}</p>}
                    <p className="text-slate-300 dark:text-slate-600 text-xs mt-1 text-right">
                      {(values[f.id] || '').length}/{f.maxLength}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40"
                  disabled={qty <= 1}>
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-black text-2xl w-8 text-center text-slate-800 dark:text-slate-100">{qty}</span>
                <button onClick={() => setQty(q => Math.min(20, q + 1))}
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40"
                  disabled={qty >= 20}>
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">
                  Subtotal: <strong className="text-slate-700 dark:text-slate-200">₱{product.price * qty}</strong>
                </span>
              </div>
            </div>

            {/* Add to cart */}
            <button onClick={handleAddToCart}
              disabled={!selectedDesign}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                added
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30 scale-[0.99]'
                  : selectedDesign
                    ? 'btn-primary'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}>
              {added ? (
                <><Check className="w-5 h-5" strokeWidth={3} /> Added to Cart!</>
              ) : (
                <><ShoppingCart className="w-5 h-5" /> Add to Cart — ₱{product.price * qty}</>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {['✅ Print-ready files', '📧 Email delivery', '🔄 Free revision'].map(b => (
                <span key={b} className="text-xs text-slate-500 dark:text-slate-400 font-medium">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
