import ProductCard from '../components/ProductCard'
import products from '../data/products.json'
import { Sparkles } from 'lucide-react'

export default function Products() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 page-enter">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Printable Templates
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 mb-4">
            All Products
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Customize and print beautiful templates for your school notebooks, books, and planners.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Coming soon note */}
        <div className="mt-12 glass-card rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">More designs coming soon!</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            We're constantly adding new templates. Follow us on social media for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
