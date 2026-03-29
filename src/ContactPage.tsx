import { useCallback, useEffect, useId, useState, type FormEvent, type SVGProps } from 'react'
import GalaxyBackdrop from './components/GalaxyBackdrop'

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Solution', href: '#solution' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
] as const

function IconEnvelope(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M4 6h16v12H4V6z" strokeLinejoin="round" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path
        d="M6.5 4.5h3l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2 4.5 1.5v3a2 2 0 01-2 2A17 17 0 016.5 6.5a2 2 0 012-2z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconMap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  )
}

function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M12 3l8 4v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" strokeLinecap="round" />
    </svg>
  )
}

function IconHeadset(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M5 14a3 3 0 013-3h1v6H8a3 3 0 01-3-3v-1zM19 14a3 3 0 00-3-3h-1v6h1a3 3 0 003-3v-1z" />
      <path d="M8 11V9a4 4 0 018 0v2" strokeLinecap="round" />
    </svg>
  )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormState = {
  company: string
  email: string
  phone: string
  topic: string
  message: string
}

type FieldKey = 'company' | 'email' | 'message'

type FieldErrors = Partial<Record<FieldKey, string>>

function validateForm(values: FormState): FieldErrors {
  const errors: FieldErrors = {}
  if (!values.company.trim()) errors.company = 'Company name is required.'
  if (!values.email.trim()) errors.email = 'Work email is required.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Please describe your request.'
  else if (values.message.trim().length < 12) errors.message = 'Add a bit more detail (at least 12 characters).'
  return errors
}

const panelInner =
  'rounded-2xl border border-zinc-800/90 bg-zinc-950/55 p-6 shadow-[0_0_0_1px_rgba(24,24,27,0.5)] backdrop-blur-xl sm:p-8'

export default function ContactPage() {
  const formErrorsId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [form, setForm] = useState<FormState>({
    company: '',
    email: '',
    phone: '',
    topic: 'general',
    message: '',
  })

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  function fieldClass(name: FieldKey) {
    const invalid = attemptedSubmit && errors[name]
    return [
      'w-full rounded-xl border bg-zinc-950/90 px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-shadow',
      invalid
        ? 'border-red-500/50 focus:border-red-400/70 focus:shadow-[0_0_0_1px_rgba(248,113,113,0.35)]'
        : 'border-zinc-800 focus:border-brand-500/60 focus:shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_0_24px_rgba(168,85,247,0.18)]',
    ].join(' ')
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (attemptedSubmit && (key === 'company' || key === 'email' || key === 'message')) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key as FieldKey]
        return next
      })
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setAttemptedSubmit(true)
    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 450))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const directContact = [
    {
      icon: IconEnvelope,
      label: 'Email',
      value: 'contact@cybershield.io',
      href: 'mailto:contact@cybershield.io',
    },
    {
      icon: IconPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: IconMap,
      label: 'Office',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com/?q=San+Francisco+CA',
    },
  ] as const

  return (
    <div id="top" className="relative min-h-svh text-zinc-200">
      <GalaxyBackdrop />

      {/* Foreground stack: above GalaxyBackdrop z-0 */}
      <div className="relative z-10 bg-transparent">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-lg opacity-0 pointer-events-none transition-opacity focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-30 border-b border-zinc-800/60 bg-black/55 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-baseline gap-0 font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400">
            <span className="text-lg text-white sm:text-xl">TRUST</span>
            <span className="text-lg text-brand-500 sm:text-xl">INC</span>
          </a>

          <nav className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400 md:flex lg:gap-9" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-950/80 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen ? (
          <div id="mobile-nav" className="border-t border-zinc-800/80 bg-black/90 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-widest" aria-label="Mobile primary">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-2 py-3 text-zinc-300 hover:bg-zinc-900/80 hover:text-white"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="relative z-10 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-brand-400/95">
              Enterprise software &amp; cybersecurity
            </p>
            <h1
              id="hero-heading"
              className="bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-[3.25rem] md:leading-tight"
            >
              Contact Us
            </h1>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-brand-500/70 to-transparent" aria-hidden />
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
              Partner with specialists for assessments, architecture, and ongoing protection. Share your context—we’ll
              respond with a clear next step.
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section
          id="services"
          className="relative z-10 scroll-mt-28 border-y border-zinc-800/50 bg-zinc-950/25 backdrop-blur-sm"
          aria-labelledby="capabilities-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
            <div className="mb-10 max-w-2xl">
              <h2 id="capabilities-heading" className="text-lg font-bold tracking-tight text-white sm:text-xl">
                How we support you
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Consistent engagement model from first conversation through delivery.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: IconHeadset,
                  title: '24/7 security desk',
                  text: 'Critical incidents triaged and escalated without delay.',
                },
                {
                  icon: IconClock,
                  title: 'Rapid response',
                  text: 'Business-hours inquiries answered the same day.',
                },
                {
                  icon: IconShield,
                  title: 'Enterprise assurance',
                  text: 'NDAs, questionnaires, and compliance-friendly workflows.',
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="group flex gap-4 rounded-2xl border border-zinc-800/80 bg-black/35 p-5 transition hover:border-brand-500/25 hover:bg-black/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-500/35 bg-brand-500/5 text-brand-400 transition group-hover:border-brand-500/50">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact workspace */}
        <section id="contact" className="relative z-10 scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-6xl">
            <header className="mb-10 max-w-2xl lg:mb-12">
              <h2 id="contact-heading" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Start a conversation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
                Use the secure form for structured requests, or reach us directly if you already know what you need.
              </p>
            </header>

            <div className="rounded-[1.35rem] border border-zinc-800/70 bg-gradient-to-b from-zinc-950/80 to-black/60 p-1 shadow-[0_0_80px_-20px_rgba(168,85,247,0.25)] backdrop-blur-xl sm:p-1.5">
              {/* No overflow-hidden — it can clip form fields above the submit button in some browsers */}
              <div className="grid gap-px rounded-[1.2rem] bg-zinc-800/40 lg:grid-cols-[1.05fr_0.95fr]">
                <div id="solution" className={`${panelInner} rounded-b-none rounded-t-[1.15rem] lg:rounded-bl-[1.15rem] lg:rounded-br-none lg:rounded-tr-[1.15rem]`}>
                  <h3 className="text-lg font-semibold text-white">Project inquiry</h3>
                  <p className="mt-1 text-sm text-zinc-500">Fields marked with * are required.</p>

                  <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate aria-describedby={attemptedSubmit ? formErrorsId : undefined}>
                    <div id={formErrorsId} className="sr-only" aria-live="polite">
                      {attemptedSubmit && Object.keys(errors).length > 0
                        ? `Please fix ${Object.keys(errors).length} field${Object.keys(errors).length > 1 ? 's' : ''} before submitting.`
                        : ''}
                    </div>

                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Company name <span className="text-brand-400">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Organization legal name"
                        required
                        value={form.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        className={fieldClass('company')}
                        aria-invalid={attemptedSubmit && !!errors.company}
                        aria-describedby={attemptedSubmit && errors.company ? 'company-error' : undefined}
                      />
                      {attemptedSubmit && errors.company ? (
                        <p id="company-error" className="mt-1.5 text-left text-xs text-red-400/90" role="alert">
                          {errors.company}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                          Work email <span className="text-brand-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@company.com"
                          required
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={fieldClass('email')}
                          aria-invalid={attemptedSubmit && !!errors.email}
                          aria-describedby={attemptedSubmit && errors.email ? 'email-error' : undefined}
                        />
                        {attemptedSubmit && errors.email ? (
                          <p id="email-error" className="mt-1.5 text-left text-xs text-red-400/90" role="alert">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                          Phone <span className="text-zinc-600">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/90 px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-shadow focus:border-brand-500/60 focus:shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_0_24px_rgba(168,85,247,0.18)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="topic" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Inquiry type
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        value={form.topic}
                        onChange={(e) => updateField('topic', e.target.value)}
                        className="w-full cursor-pointer appearance-none rounded-xl border border-zinc-800 bg-zinc-950/90 bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3.5 pr-11 text-sm text-zinc-100 outline-none transition-shadow focus:border-brand-500/60 focus:shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_0_24px_rgba(168,85,247,0.18)]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="general">General inquiry</option>
                        <option value="quote">Request a quote</option>
                        <option value="demo">Schedule a demo</option>
                        <option value="support">Technical support</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Message <span className="text-brand-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Scope, systems, compliance needs, and timeline…"
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className={`${fieldClass('message')} min-h-[150px] resize-y`}
                        aria-invalid={attemptedSubmit && !!errors.message}
                        aria-describedby={attemptedSubmit && errors.message ? 'message-error' : undefined}
                      />
                      {attemptedSubmit && errors.message ? (
                        <p id="message-error" className="mt-1.5 text-left text-xs text-red-400/90" role="alert">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>

                    {submitted ? (
                      <p
                        className="rounded-xl border border-brand-500/35 bg-brand-500/10 px-4 py-3.5 text-left text-sm leading-relaxed text-brand-100"
                        role="status"
                      >
                        Thank you. Your inquiry has been recorded. Connect this form to your API, email service, or CRM
                        to complete delivery.
                      </p>
                    ) : null}

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-h-[3.25rem] min-w-[12rem] items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-10 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_48px_rgba(168,85,247,0.3)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? 'Sending…' : 'Get a quote'}
                      </button>
                      <p className="text-center text-xs leading-relaxed text-zinc-500 sm:max-w-xs sm:text-left">
                        By submitting, you agree to our{' '}
                        <a className="text-brand-400 underline-offset-2 hover:underline" href="#privacy">
                          privacy terms
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                </div>

                <aside
                  className={`${panelInner} rounded-none rounded-b-[1.15rem] border-t-0 lg:rounded-bl-none lg:rounded-br-[1.15rem] lg:rounded-tr-none lg:border-l lg:border-t-0 lg:border-zinc-800/80`}
                >
                  <h3 className="text-lg font-semibold text-white">Direct contact</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                    Prefer a direct line? Our team covers North America and EMEA business hours.
                  </p>

                  <ul className="mt-8 space-y-3">
                    {directContact.map((row) => (
                      <li key={row.label}>
                        <a
                          href={row.href}
                          className="flex gap-4 rounded-xl border border-zinc-800/90 bg-black/30 p-4 transition hover:border-brand-500/35 hover:bg-black/45"
                          {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-500/40 text-brand-400">
                            <row.icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 text-left">
                            <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                              {row.label}
                            </span>
                            <span className="mt-1 block text-sm font-medium text-white">{row.value}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-xl border border-dashed border-zinc-700/90 bg-black/25 p-5 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-400">Office hours</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      Monday–Friday · 08:00–20:00 PT · Contracted clients: 24/7 escalation path
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="resources"
          className="relative z-10 scroll-mt-28 border-t border-zinc-800/50 bg-black/20 py-16 backdrop-blur-[2px] sm:py-20"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-center text-xl font-bold text-white sm:text-2xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
              Straight answers before your first call.
            </p>
            <div className="mt-10 space-y-3">
              {[
                {
                  q: 'Do you sign NDAs and complete security questionnaires?',
                  a: 'Yes. We routinely execute mutual NDAs and support vendor risk assessments for enterprise procurement.',
                },
                {
                  q: 'Can you combine product delivery with security operations?',
                  a: 'TRUST INC offers secure engineering and detection-focused operations so you have one accountable partner.',
                },
                {
                  q: 'Which regions do you support?',
                  a: 'Primary coverage in North America and EMEA, with structured handoffs for after-hours critical issues.',
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-zinc-800/90 bg-zinc-950/40 px-5 py-1 transition open:border-zinc-700/90 open:bg-zinc-950/55"
                >
                  <summary className="cursor-pointer list-none py-4 text-left text-sm font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {faq.q}
                      <span className="text-brand-400 transition group-open:rotate-180" aria-hidden>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </summary>
                  <p className="border-t border-zinc-800/60 pb-4 pt-3 text-sm leading-relaxed text-zinc-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-6 overflow-hidden border-t border-zinc-900/80">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#07050f_0%,#030208_45%,#010103_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-soft-light"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_80%,rgba(147,51,234,0.14),transparent_50%),radial-gradient(ellipse_60%_45%_at_0%_90%,rgba(168,85,247,0.1),transparent_45%)]"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(420px,55%)] w-full opacity-[0.55]"
          viewBox="0 0 1200 320"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="fn-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
            <filter id="fn-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g fill="none" stroke="url(#fn-edge)" strokeWidth="0.75" opacity="0.85" filter="url(#fn-glow)">
            <path d="M80 240 L220 180 L380 200 L520 140 L680 190 L840 120 L1000 160 L1120 90" />
            <path d="M120 280 L260 230 L420 250 L560 200 L720 240 L900 200 L1040 140" />
            <path d="M60 180 L200 120 L340 150 L500 90 L660 130 L780 70 L940 110" />
            <path d="M180 300 L320 260 L480 280 L640 230 L800 270 L960 220" />
          </g>
          {[
            [80, 240],
            [220, 180],
            [380, 200],
            [520, 140],
            [680, 190],
            [840, 120],
            [1000, 160],
            [1120, 90],
            [120, 280],
            [260, 230],
            [420, 250],
            [560, 200],
            [720, 240],
            [900, 200],
            [1040, 140],
            [60, 180],
            [200, 120],
            [340, 150],
            [500, 90],
            [660, 130],
            [780, 70],
            [940, 110],
            [180, 300],
            [320, 260],
            [480, 280],
            [640, 230],
            [800, 270],
            [960, 220],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill="#c084fc" fillOpacity="0.35" stroke="#e9d5ff" strokeOpacity="0.45" strokeWidth="0.6" />
          ))}
        </svg>
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-baseline gap-0 font-extrabold">
                <span className="text-white">TRUST</span>
                <span className="text-brand-500">INC</span>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-zinc-100">
                Trusted cybersecurity protection for secure digital frontier.
              </p>
              <form
                className="mt-6 flex overflow-hidden rounded-full border border-brand-500/70 bg-black/50 shadow-[0_0_22px_rgba(168,85,247,0.28),inset_0_0_0_1px_rgba(168,85,247,0.15)] ring-1 ring-brand-400/25 backdrop-blur-sm"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="newsletter" className="sr-only">
                  Your email
                </label>
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Your Email"
                  className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40"
                />
                <button
                  type="submit"
                  className="shrink-0 px-5 py-3 text-sm font-semibold text-brand-300 transition hover:text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white">Quick links</p>
              <ul className="mt-4 space-y-2 text-sm">
                {(
                  [
                    ['Home', '#top'],
                    ['Services', '#services'],
                    ['About', '#resources'],
                    ['Contact', '#contact'],
                  ] as const
                ).map(([t, href]) => (
                  <li key={t}>
                    <a className="text-zinc-300 transition hover:text-white" href={href}>
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white">Services</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {[
                  'Network Security',
                  'Cloud Security',
                  'Threat Detection',
                  'Endpoint Protection',
                  'Incident Response',
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div id="privacy">
              <p className="text-xs font-bold uppercase tracking-widest text-white">Contact us</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>
                  <a className="transition hover:text-white" href="mailto:contact@cybershield.io">
                    contact@cybershield.io
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-white" href="tel:+15551234567">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-brand-500/50 pt-8 text-xs text-zinc-400 shadow-[0_-1px_24px_rgba(168,85,247,0.22)] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-zinc-400">© 2026 CYBER SHIELD. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <a className="transition hover:text-brand-300" href="#privacy">
                Privacy Policy
              </a>
              <span className="text-brand-500/60" aria-hidden>
                |
              </span>
              <a className="transition hover:text-brand-300" href="#terms">
                Terms &amp; Conditions
              </a>
              <span className="text-brand-500/60" aria-hidden>
                |
              </span>
              <a className="transition hover:text-brand-300" href="#legal">
                Legal Notices
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
