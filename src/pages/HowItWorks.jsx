import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    emoji: '🎨',
    title: 'Choose Your Design',
    desc: 'Browse our collection of beautiful notebook label designs. We have pastel, minimal, ocean, and more aesthetic styles to match your vibe.',
    detail: 'Each design is crafted with Filipino students in mind — colorful, cute, and organized.',
  },
  {
    num: '02',
    emoji: '✏️',
    title: 'Customize Your Label',
    desc: 'Enter your subject name, student name, and section/class. Watch the live preview update in real time as you type!',
    detail: 'Need different labels for each notebook? Add each one separately to your cart.',
  },
  {
    num: '03',
    emoji: '🛒',
    title: 'Add to Cart',
    desc: 'Select your quantity and add your customized label to your cart. You can order multiple designs in one go!',
    detail: 'Each set includes 4 labels per purchase — perfect for one notebook with spares.',
  },
  {
    num: '04',
    emoji: '💸',
    title: 'Pay via GCash or Maya',
    desc: 'Choose GCash or Maya as your payment method. Send the amount to our number, then enter your reference number.',
    detail: 'Payment is easy, safe, and instant — no need for credit cards or sign-ups.',
  },
  {
    num: '05',
    emoji: '🖨️',
    title: 'We Print Your Order',
    desc: 'After payment verification, we’ll print your labels for you.',
    detail: 'We’ll reach out to confirm details and schedule pickup or delivery.',
  },
  {
    num: '06',
    emoji: '📦',
    title: 'Pickup or Delivery',
    desc: 'We print your order and reach out to arrange pickup or delivery.',
    detail: 'If you chose delivery at checkout, please make sure your address is complete.',
  },
]

const faqs = [
  { q: 'How long until my order is ready?', a: 'After payment confirmation, we start printing your order. We’ll message you to arrange pickup or delivery.' },
  { q: 'Do I need to print anything?', a: 'No—RestyStudio prints your order for you. Just choose pickup or delivery at checkout.' },
  { q: 'Can I customize the font or colors?', a: 'Currently, designs come with pre-set fonts and color schemes. Custom design requests are available — message us for a quote!' },
  { q: 'Can I order for someone else?', a: 'Yes! Just enter their details in the customization fields and put their contact details for coordination.' },
  { q: 'What if I made a mistake in my order?', a: 'Contact us ASAP via Messenger or email before we print your order. Revisions are free within 30 minutes of ordering.' },
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 page-enter">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 mb-4">
            How It <span className="gradient-text">Works</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            From browsing to pickup/delivery — it’s super easy and takes less than 5 minutes! ⚡
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fuchsia-200 to-violet-200 dark:from-fuchsia-900 dark:to-violet-900 hidden sm:block" />

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="relative flex gap-5">
                {/* Step circle */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-500 flex flex-col items-center justify-center shadow-md z-10">
                  <span className="text-[10px] font-black text-fuchsia-200 leading-none">{step.num}</span>
                  <span className="text-xl">{step.emoji}</span>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-5 flex-1 hover:-translate-y-0.5 transition-transform duration-200">
                  <h3 className="font-black text-slate-800 dark:text-slate-100 text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-2">{step.desc}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="my-16 text-center glass-card rounded-3xl p-10">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">Ready to get started?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Cute notebooks, here you come!</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-base">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map(faq => (
              <details key={faq.q} className="glass-card rounded-2xl group">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-slate-700 dark:text-slate-300 list-none select-none">
                  <span>{faq.q}</span>
                  <span className="text-fuchsia-500 text-lg group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
