import { BookOpen, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg gradient-text">PaperCraft Studio</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Beautiful printable templates for Filipino students. Made with love for organized studying. 🇵🇭
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/products', 'All Products'], ['/how-it-works', 'How It Works'], ['/cart', 'Cart']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-slate-500 hover:text-fuchsia-600 dark:text-slate-400 dark:hover:text-fuchsia-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wider">Payment</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">We accept GCash and Maya.</p>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-900">
                GCash
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 text-xs font-bold border border-green-100 dark:border-green-900">
                Maya
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>© 2025 PaperCraft Studio. All rights reserved.</span>
          <span className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-fuchsia-400 fill-fuchsia-400" /> in the Philippines</span>
        </div>
      </div>
    </footer>
  )
}
