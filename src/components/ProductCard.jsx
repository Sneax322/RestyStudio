import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock } from 'lucide-react'

export default function ProductCard({ product }) {
  const isAvailable = product.designs?.length > 0
  const firstDesign = product.designs?.[0]

  return (
    <div className={`glass-card rounded-3xl p-6 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      isAvailable ? 'hover:shadow-fuchsia-100/50 dark:hover:shadow-fuchsia-900/20' : 'opacity-75'
    }`}>
      {/* Preview area */}
      <div className="relative rounded-2xl overflow-hidden h-40 flex items-center justify-center"
        style={{
          background: firstDesign
            ? `linear-gradient(135deg, ${firstDesign.colorA}, ${firstDesign.colorB})`
            : 'linear-gradient(135deg, #f8fafc, #f1f5f9)'
        }}>
        {firstDesign ? (
          <div className="text-center">
            <div className="text-4xl mb-1">{firstDesign.emoji}</div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/60"
              style={{ color: firstDesign.accent }}>
              +{product.designs.length} designs
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <span className="text-xs font-medium">Coming Soon</span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
            product.badge === 'Best Seller'
              ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white shadow-md'
              : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
          }`}>
            {product.badge === 'Best Seller' && <Star className="w-3 h-3 inline mr-1 fill-current" />}
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{product.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed line-clamp-2">{product.tagline}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
        <div>
          <span className="font-black text-xl gradient-text">₱{product.price}</span>
          <span className="text-slate-400 text-xs ml-1">{product.unit}</span>
        </div>
        {isAvailable ? (
          <Link to={`/products/${product.id}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 group-hover:gap-2.5 transition-all">
            Order <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="text-xs text-slate-400 font-medium">Notify Me</span>
        )}
      </div>
    </div>
  )
}
