import { Link } from 'react-router-dom'
import { ArrowRight, Star, Printer, Sparkles, Shield, Zap } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'

const testimonials = [
  { name: 'Aira M.', school: 'Grade 9, Pasay City', text: 'Super ganda ng labels! Ang neat ng notebooks ko ngayon 💕', rating: 5 },
  { name: 'Carlo R.', school: 'Grade 11, Quezon City', text: 'Easy to customize and print. Solid quality ng output!', rating: 5 },
  { name: 'Sophia L.', school: 'College Freshman, Manila', text: 'Love the designs! Parang premium ang dating pero tipid lang.', rating: 5 },
]

const features = [
  { icon: Sparkles, title: 'Beautiful Designs', desc: 'Curated aesthetic templates made for students', color: 'from-fuchsia-500 to-violet-500' },
  { icon: Zap, title: 'Instant Preview', desc: 'See your customization live before ordering', color: 'from-orange-400 to-pink-500' },
  { icon: Printer, title: 'Print-Ready', desc: 'High-res files ready to print at home or shop', color: 'from-cyan-500 to-blue-500' },
  { icon: Shield, title: 'Secure & Easy', desc: 'Simple GCash/Maya payment, no sign-up needed', color: 'from-green-500 to-emerald-500' },
]

export default function Home() {
  const featured = products.filter(p => p.featured || p.designs?.length > 0)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-fuchsia-200/40 dark:bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 -left-20 w-80 h-80 bg-violet-200/30 dark:bg-violet-900/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-10 right-1/3 w-64 h-64 bg-pink-200/30 dark:bg-pink-900/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center page-enter">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Printable Templates for Filipino Students
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
            Make Your{' '}
            <span className="gradient-text">Notebooks</span>
            <br />
            <span className="text-slate-700 dark:text-slate-200">Extra Cute ✨</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Customize beautiful printable notebook labels with your name, subject, and section.
            Print at home — same-day ready!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="btn-primary flex items-center justify-center gap-2 text-base">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/how-it-works" className="btn-outline flex items-center justify-center gap-2 text-base">
              How It Works
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex -space-x-2">
              {['🧑‍🎓', '👩‍🎓', '🧑‍🎓', '👩‍🎓'].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-100 to-violet-100 dark:from-fuchsia-900 dark:to-violet-900 flex items-center justify-center text-sm border-2 border-white dark:border-slate-800">
                  {e}
                </div>
              ))}
            </div>
            <span><strong className="text-slate-700 dark:text-slate-200">500+</strong> happy students</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              <span className="ml-1">5.0</span>
            </div>
          </div>
        </div>

        {/* Floating label previews */}
        <div className="relative max-w-4xl mx-auto mt-16 grid grid-cols-2 sm:grid-cols-3 gap-3 px-4">
          {products[0]?.designs.slice(0, 3).map((d, i) => (
            <div key={d.id} className="glass-card rounded-2xl p-3 animate-float"
              style={{ animationDelay: `${i * 0.4}s` }}>
              <div className="rounded-xl h-16 flex items-center justify-center text-2xl mb-2"
                style={{ background: `linear-gradient(135deg, ${d.colorA}, ${d.colorB})` }}>
                {d.emoji}
              </div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 text-center">{d.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-transparent to-fuchsia-50/50 dark:to-fuchsia-950/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-slate-800 dark:text-slate-100 mb-12">
            Why students <span className="gradient-text">love us</span> 💕
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform duration-200">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-fuchsia-500 font-semibold text-sm mb-1 uppercase tracking-wider">Our Products</p>
              <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">Printable Templates</h2>
            </div>
            <Link to="/products" className="text-fuchsia-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* How it works quick */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-950/20 dark:to-violet-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-12">
            Ready in <span className="gradient-text">3 easy steps</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Choose a Design', desc: 'Pick from our beautiful notebook label templates', emoji: '🎨' },
              { num: '02', title: 'Customize It', desc: 'Enter your name, subject, and section — see it live!', emoji: '✏️' },
              { num: '03', title: 'Print & Enjoy', desc: 'Pay via GCash or Maya, download, and print!', emoji: '🖨️' },
            ].map(step => (
              <div key={step.num} className="glass-card rounded-2xl p-6">
                <div className="text-4xl mb-3">{step.emoji}</div>
                <div className="text-xs font-black text-fuchsia-400 uppercase tracking-widest mb-2">{step.num}</div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 mt-10">
            Start Ordering <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-slate-800 dark:text-slate-100 mb-10">
            What students say 💬
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map(t => (
              <div key={t.name} className="glass-card rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
