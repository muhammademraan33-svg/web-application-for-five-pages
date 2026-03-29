import { useState, type FormEvent, type SVGProps } from 'react'

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

const inputClass =
  'w-full rounded-lg border border-zinc-800 bg-zinc-950/80 px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-shadow focus:border-brand-500/60 focus:shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_0_24px_rgba(168,85,247,0.22)]'

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    company: '',
    email: '',
    phone: '',
    topic: 'general',
    message: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div id="top" className="min-h-svh bg-black text-zinc-200">
      {/* subtle grid + vignette */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.18),transparent)]" />

      <header className="relative z-20 border-b border-zinc-900/80 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-baseline gap-0 font-extrabold tracking-tight">
            <span className="text-lg text-white sm:text-xl">TRUST</span>
            <span className="text-lg text-brand-500 sm:text-xl">INC</span>
          </a>

          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-200 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen ? (
          <div
            id="mobile-nav"
            className="border-t border-zinc-900 bg-black/95 px-4 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-widest">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-2 text-zinc-300 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative z-10 px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-400/90">
            Software & cybersecurity
          </p>
          <h1 className="bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Get in touch for expert cybersecurity solutions and support.
          </p>
        </section>

        {/* Trust strip — adds credibility beyond the original mock */}
        <section id="services" className="relative z-10 border-y border-zinc-900/80 bg-zinc-950/50">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              {
                icon: IconHeadset,
                title: '24/7 security desk',
                text: 'Critical incidents escalated in minutes.',
              },
              {
                icon: IconClock,
                title: 'Avg. response under 2h',
                text: 'Business-hours quotes same day.',
              },
              {
                icon: IconShield,
                title: 'Enterprise-grade trust',
                text: 'SOC 2 aligned processes & NDAs on request.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-zinc-800/80 bg-black/40 p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-500/40 text-brand-400">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div id="solution">
              <h2 className="text-left text-xl font-bold text-white sm:text-2xl">Send a message</h2>
              <p className="mt-2 text-left text-sm text-zinc-500">
                Share a few details—we’ll route your request to the right specialist.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="company" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Company name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Corp"
                    required
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className={inputClass}
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
                    onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                    className={`${inputClass} appearance-none bg-zinc-950 pr-10`}
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
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your environment, timelines, and goals…"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputClass} min-h-[140px] resize-y`}
                  />
                </div>

                {submitted ? (
                  <p className="rounded-lg border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-left text-sm text-brand-200" role="status">
                    Thanks—your message is received. This is a front-end demo; wire your API here to send email or CRM
                    tickets.
                  </p>
                ) : null}

                <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                  >
                    Get a quote
                  </button>
                  <p className="text-center text-xs text-zinc-500 sm:text-left">
                    By submitting, you agree to our{' '}
                    <a className="text-brand-400 underline-offset-2 hover:underline" href="#privacy">
                      privacy terms
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-white sm:text-2xl">Direct lines</h2>
              <p className="text-sm text-zinc-500">
                Prefer email or phone? Reach us directly—our team operates across North America and EMEA.
              </p>

              {[
                {
                  icon: IconEnvelope,
                  label: 'Email',
                  value: 'email@cybersecurity.com',
                  href: 'mailto:email@cybersecurity.com',
                },
                {
                  icon: IconPhone,
                  label: 'Phone',
                  value: '+1 (0123) 456-7890',
                  href: 'tel:+101234567890',
                },
                {
                  icon: IconMap,
                  label: 'Office Location',
                  value: '123 Cybersecurity, 22170',
                  href: 'https://maps.google.com',
                },
              ].map((row) => (
                <a
                  key={row.label}
                  href={row.href}
                  className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 transition hover:border-brand-500/40 hover:bg-zinc-900/50"
                  {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-500/50 text-brand-400">
                    <row.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{row.label}</p>
                    <p className="mt-1 text-sm font-medium text-white">{row.value}</p>
                  </div>
                </a>
              ))}

              <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/40 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Business hours</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Mon–Fri · 8:00–20:00 PT · Emergency line for contracted clients 24/7
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Lightweight FAQ — improves page without clutter */}
        <section id="resources" className="relative z-10 scroll-mt-28 border-t border-zinc-900 bg-zinc-950/30 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-white">Common questions</h2>
            <dl className="mt-10 space-y-6 text-left">
              {[
                {
                  q: 'Do you sign NDAs and security questionnaires?',
                  a: 'Yes. We routinely work under mutual NDAs and complete vendor assessments for enterprise procurement.',
                },
                {
                  q: 'Can you help with both product engineering and security operations?',
                  a: 'TRUST INC delivers software delivery and managed detection—one partner for build and protect.',
                },
                {
                  q: 'What regions do you support?',
                  a: 'Primary coverage in North America and EMEA with follow-the-sun escalation for critical issues.',
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-xl border border-zinc-800/90 bg-black/50 px-5 py-4">
                  <dt className="font-semibold text-white">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-zinc-500">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-8 overflow-hidden border-t border-zinc-900/80">
        {/* Footer-only atmosphere: distinct from main page (texture + purple network + haze) */}
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
  )
}
