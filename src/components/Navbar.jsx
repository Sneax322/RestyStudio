import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Sun, Moon, Menu, X, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { count, dark, setDark } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/how-it-works', label: 'How It Works' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-sm shadow-fuchsia-100/50 dark:shadow-slate-900/50' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-lg gradient-text">RestyStudio</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === l.to
                  ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300'
                  : 'text-slate-600 hover:text-fuchsia-600 hover:bg-fuchsia-50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-fuchsia-600 hover:bg-fuchsia-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-all">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link to="/cart" className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-fuchsia-600 hover:bg-fuchsia-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-all">
            <ShoppingCart className="w-4 h-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
                {count}
              </span>
            )}
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-all">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/50 dark:border-slate-700/50 px-4 py-3 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                location.pathname === l.to
                  ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
