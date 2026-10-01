import { useEffect, useRef, useState } from 'react'
import './App.css'

type ProgramId = 'strength' | 'conditioning' | 'mobility'
type PlanId = 'plan-one' | 'plan-two' | 'plan-three'
type FormStatus = 'idle' | 'loading' | 'error' | 'success'

type Program = {
  id: ProgramId
  index: string
  label: string
  title: string
  description: string
}

type Plan = {
  id: PlanId
  index: string
  label: string
  title: string
  description: string
  price: string
  terms: string
}

const programs: Program[] = [
  {
    id: 'strength',
    index: '01',
    label: 'Foundation',
    title: 'Build strength you can return to.',
    description:
      'A coached barbell and machine practice for people who want a clear weekly rhythm.',
  },
  {
    id: 'conditioning',
    index: '02',
    label: 'Engine Room',
    title: 'Raise the pace without losing form.',
    description:
      'Intervals, carries, and conditioning blocks built around repeatable effort.',
  },
  {
    id: 'mobility',
    index: '03',
    label: 'Reset',
    title: 'Make room for better movement.',
    description:
      'Mobility-led sessions for joints, range, and the work between hard days.',
  },
]

const plans: Plan[] = [
  {
    id: 'plan-one',
    index: 'A',
    label: 'Open Floor',
    title: 'Train on your own schedule.',
    description: 'Flexible training-floor access for members who already know their routine.',
    price: 'Rp 650.000 / month',
    terms: 'Month to month',
  },
  {
    id: 'plan-two',
    index: 'B',
    label: 'Coached Week',
    title: 'Three sessions with a plan.',
    description: 'A structured option for members who want coaching built into their week.',
    price: 'Rp 1.200.000 / month',
    terms: 'Three coached sessions / week',
  },
  {
    id: 'plan-three',
    index: 'C',
    label: '1:1 Block',
    title: 'Work around one clear goal.',
    description: 'Focused coaching for a defined block of training and a more personal pace.',
    price: 'Rp 1.800.000 / block',
    terms: 'Four coached sessions',
  },
]

const imageSources = {
  hero: {
    src: '/images/gym-hero.jpg',
    avifSrcSet: '/images/gym-hero-720.avif 720w, /images/gym-hero-1200.avif 1200w',
    sizes: '(max-width: 58rem) calc(100vw - 2rem), 50vw',
    alt: 'Athlete pressing a barbell overhead in a dimly lit gym.',
    href: 'https://unsplash.com/es/fotos/hombre-en-pantalones-negros-levantando-el-cuerpo-de-la-varilla-de-metal-uJxjimIRKlk',
  },
  programs: {
    src: '/images/gym-programs.jpg',
    avifSrcSet: '/images/gym-programs-720.avif 720w, /images/gym-programs-1200.avif 1200w',
    sizes: '(max-width: 58rem) calc(100vw - 2rem), 100vw',
    alt: 'Athlete preparing for a barbell squat in a gym.',
    href: 'https://unsplash.com/photos/a-man-squatting-on-a-bench-in-a-gym-XTktUgGYEkI',
  },
  visit: {
    src: '/images/gym-visit.jpg',
    avifSrcSet: '/images/gym-visit-720.avif 720w, /images/gym-visit-1200.avif 1200w',
    sizes: '(max-width: 58rem) calc(100vw - 2rem), 50vw',
    alt: 'Dark gym interior with strength-training equipment and exposed beams.',
    href: 'https://unsplash.com/pt-br/s/fotografias/gin%C3%A1sio-escuro',
  },
} as const

type FormValues = {
  name: string
  email: string
  interest: string
}

const initialFormValues: FormValues = {
  name: '',
  email: '',
  interest: '',
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeProgram, setActiveProgram] = useState<ProgramId>('strength')
  const [activePlan, setActivePlan] = useState<PlanId>('plan-one')
  const [modalOpen, setModalOpen] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formMessage, setFormMessage] = useState('')
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const dialogTriggerRef = useRef<HTMLButtonElement>(null)
  const programTabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const selectedProgram = programs.find((program) => program.id === activeProgram) ?? programs[0]
  const selectedPlan = plans.find((plan) => plan.id === activePlan) ?? plans[0]

  useEffect(() => {
    if (mobileMenuOpen) {
      firstNavLinkRef.current?.focus()
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (modalOpen) {
      dialogCloseRef.current?.focus()
      document.body.classList.add('modal-is-open')
    } else {
      document.body.classList.remove('modal-is-open')
    }

    return () => document.body.classList.remove('modal-is-open')
  }, [modalOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      if (modalOpen) {
        closeModal()
      } else if (mobileMenuOpen) {
        closeMobileMenu()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [modalOpen, mobileMenuOpen])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    requestAnimationFrame(() => menuToggleRef.current?.focus())
  }

  const openModal = (trigger: HTMLButtonElement | null = null) => {
    dialogTriggerRef.current = trigger ?? (document.activeElement instanceof HTMLButtonElement ? document.activeElement : null)
    setFormValues(initialFormValues)
    setFormStatus('idle')
    setFormMessage('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    requestAnimationFrame(() => dialogTriggerRef.current?.focus())
  }

  const updateFormValue = (field: keyof FormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }))
    if (formStatus !== 'idle') {
      setFormStatus('idle')
      setFormMessage('')
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.interest) {
      setFormStatus('error')
      setFormMessage('Complete your name, email, and training interest to continue.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      setFormStatus('error')
      setFormMessage('Enter a valid email address so the gym can reply.')
      return
    }

    setFormStatus('loading')
    setFormMessage('Saving this local demo request...')

    window.setTimeout(() => {
      setFormStatus('success')
      setFormMessage('Request saved for this demo. Connect the form to the gym inbox when ready.')
    }, 500)
  }

  const handleProgramKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % programs.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + programs.length) % programs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = programs.length - 1
    else return

    event.preventDefault()
    const nextProgram = programs[nextIndex]
    setActiveProgram(nextProgram.id)
    programTabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className={`site-header${mobileMenuOpen ? ' is-open' : ''}`}>
        <div className="container site-header__inner">
          <a className="wordmark" href="#top" onClick={() => setMobileMenuOpen(false)}>
            <span className="wordmark__name">NORTHLINE</span>
            <span className="wordmark__descriptor">Training club</span>
          </a>

          <nav
            id="primary-navigation"
            className={`primary-nav${mobileMenuOpen ? ' is-open' : ''}`}
            aria-label="Primary navigation"
          >
            <a ref={firstNavLinkRef} href="#programs" onClick={closeMobileMenu}>Programs</a>
            <a href="#plans" onClick={closeMobileMenu}>Plans</a>
            <a href="#visit" onClick={closeMobileMenu}>Visit</a>
            <button className="button button--small button--outline nav-action" type="button" onClick={() => openModal()}>
              Request a visit
            </button>
          </nav>

          <button
            ref={menuToggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => {
              if (mobileMenuOpen) closeMobileMenu()
              else setMobileMenuOpen(true)
            }}
          >
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            <span className="menu-toggle__icon" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">Training club concept / NORTHLINE</p>
              <h1 id="hero-title">Build a practice that stays with you.</h1>
              <p className="hero__intro">
                A focused training club for strength, conditioning, and the work that keeps both honest.
              </p>
              <div className="hero__actions">
                <button className="button button--accent" type="button" onClick={(event) => openModal(event.currentTarget)}>
                  Request a visit
                </button>
                <a className="text-link" href="#programs">View programs <span aria-hidden="true">↘</span></a>
              </div>
            </div>

            <figure className="media-placeholder media-placeholder--image media-placeholder--hero">
              <picture className="media-placeholder__picture">
                <source type="image/avif" srcSet={imageSources.hero.avifSrcSet} sizes={imageSources.hero.sizes} />
                <img className="media-placeholder__image" src={imageSources.hero.src} srcSet={`${imageSources.hero.src} 1800w`} sizes={imageSources.hero.sizes} alt={imageSources.hero.alt} fetchPriority="high" />
              </picture>
              <span className="media-placeholder__shade" aria-hidden="true" />
              <span className="media-placeholder__index">[01]</span>
              <span className="media-placeholder__label">Training floor / NORTHLINE</span>
              <span className="media-placeholder__note"><a href={imageSources.hero.href} target="_blank" rel="noreferrer">Image source: Unsplash ↗</a></span>
            </figure>
          </div>
          <div className="hero__footer container" aria-hidden="true">
            <span>Concept draft</span>
            <span className="rule" />
            <span>Jakarta / concept location</span>
          </div>
        </section>

        <section className="section section--programs" id="programs" aria-labelledby="programs-title">
          <div className="container">
            <div className="section-heading">
              <span className="section-index">01</span>
              <span className="section-rule" />
              <p className="eyebrow">The work</p>
            </div>
            <div className="section-heading__body">
              <h2 id="programs-title">Train around a reason.</h2>
              <p>Three ways into the week, each with a clear job.</p>
            </div>

            <div className="program-layout">
              <div className="program-tabs" role="tablist" aria-label="Training programs">
                {programs.map((program, index) => (
                  <button
                    key={program.id}
                    ref={(element) => { programTabRefs.current[index] = element }}
                    className={`program-tab${activeProgram === program.id ? ' is-active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={activeProgram === program.id}
                    aria-controls={`program-panel-${program.id}`}
                    tabIndex={activeProgram === program.id ? 0 : -1}
                    onClick={() => setActiveProgram(program.id)}
                    onKeyDown={(event) => handleProgramKeyDown(event, index)}
                  >
                    <span>{program.index}</span>
                    <strong>{program.label}</strong>
                    <span className="program-tab__mark" aria-hidden="true">+</span>
                  </button>
                ))}
              </div>

              <div className="program-detail" id={`program-panel-${selectedProgram.id}`} role="tabpanel" tabIndex={0}>
                <div>
                  <p className="eyebrow">{selectedProgram.index} / {selectedProgram.label}</p>
                  <h3>{selectedProgram.title}</h3>
                  <p>{selectedProgram.description}</p>
                </div>
                <dl className="placeholder-list">
                  <div><dt>Format</dt><dd>{selectedProgram.id === 'strength' ? 'Small-group' : selectedProgram.id === 'conditioning' ? 'Intervals' : 'Mobility'}</dd></div>
                  <div><dt>Schedule</dt><dd>{selectedProgram.id === 'strength' ? 'Tue + Thu' : selectedProgram.id === 'conditioning' ? 'Mon + Sat' : 'Wed evenings'}</dd></div>
                  <div><dt>Access</dt><dd>{selectedProgram.id === 'strength' ? 'Coach-led' : selectedProgram.id === 'conditioning' ? 'Small-group' : 'All levels'}</dd></div>
                </dl>
              </div>
            </div>

            <figure className="media-placeholder media-placeholder--image media-placeholder--wide">
              <picture className="media-placeholder__picture">
                <source type="image/avif" srcSet={imageSources.programs.avifSrcSet} sizes={imageSources.programs.sizes} />
                <img className="media-placeholder__image" src={imageSources.programs.src} srcSet={`${imageSources.programs.src} 1800w`} sizes={imageSources.programs.sizes} alt={imageSources.programs.alt} loading="lazy" />
              </picture>
              <span className="media-placeholder__shade" aria-hidden="true" />
              <span className="media-placeholder__index">[02]</span>
              <span className="media-placeholder__label">A practice you can see.</span>
              <span className="media-placeholder__note"><a href={imageSources.programs.href} target="_blank" rel="noreferrer">Image source: Unsplash ↗</a></span>
            </figure>
          </div>
        </section>

        <section className="statement-section" aria-labelledby="statement-title">
          <div className="container statement-section__grid">
            <p className="statement-section__index">02 / 04</p>
            <div>
              <h2 id="statement-title">The details make the difference.</h2>
              <p>
                Use this editorial break for the gym point of view, a short founder note, or a verified statement about the training environment.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--plans" id="plans" aria-labelledby="plans-title">
          <div className="container">
            <div className="section-heading">
              <span className="section-index">03</span>
              <span className="section-rule" />
              <p className="eyebrow">Membership</p>
            </div>
            <div className="section-heading__body">
              <h2 id="plans-title">Choose the shape of your week.</h2>
              <p>Pick the amount of structure you want. Rates shown are concept pricing for this prototype.</p>
            </div>

            <div className="plan-layout">
              <div className="plan-list" role="group" aria-label="Membership plan options">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    className={`plan-option${activePlan === plan.id ? ' is-active' : ''}`}
                    type="button"
                    aria-pressed={activePlan === plan.id}
                    onClick={() => setActivePlan(plan.id)}
                  >
                    <span className="plan-option__index">{plan.index}</span>
                    <span>{plan.label}</span>
                    <span className="plan-option__mark" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>

              <article className="plan-detail">
                <div className="plan-detail__topline">
                  <p className="eyebrow">Selected option / {selectedPlan.index}</p>
                  <span className="plan-detail__status">Concept rate</span>
                </div>
                <h3>{selectedPlan.title}</h3>
                <p>{selectedPlan.description}</p>
                <dl className="placeholder-list placeholder-list--two-column">
                  <div><dt>Price</dt><dd>{selectedPlan.price}</dd></div>
                  <div><dt>Terms</dt><dd>{selectedPlan.terms}</dd></div>
                </dl>
                <button className="button button--accent" type="button" onClick={(event) => openModal(event.currentTarget)}>
                  Ask about this option
                </button>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--visit" id="visit" aria-labelledby="visit-title">
          <div className="container visit-layout">
            <div className="visit-copy">
              <div className="section-heading">
                <span className="section-index">04</span>
                <span className="section-rule" />
                <p className="eyebrow">Your first visit</p>
              </div>
              <h2 id="visit-title">Start with a question.</h2>
              <p>Tell us what you want to train, and we will shape the first conversation around it.</p>
              <dl className="visit-details">
                <div><dt>Address</dt><dd>17 Rawa Kerja, Jakarta</dd></div>
                <div><dt>Opening hours</dt><dd>Mon to Sat / 06:00 to 21:00</dd></div>
                <div><dt>Email</dt><dd>hello@northline.example</dd></div>
              </dl>
              <button className="button button--accent" type="button" onClick={(event) => openModal(event.currentTarget)}>
                Request a visit
              </button>
            </div>
            <figure className="media-placeholder media-placeholder--image media-placeholder--visit">
              <picture className="media-placeholder__picture">
                <source type="image/avif" srcSet={imageSources.visit.avifSrcSet} sizes={imageSources.visit.sizes} />
                <img className="media-placeholder__image" src={imageSources.visit.src} srcSet={`${imageSources.visit.src} 1800w`} sizes={imageSources.visit.sizes} alt={imageSources.visit.alt} loading="lazy" />
              </picture>
              <span className="media-placeholder__shade" aria-hidden="true" />
              <span className="media-placeholder__index">[04]</span>
              <span className="media-placeholder__label">The room matters.</span>
              <span className="media-placeholder__note"><a href={imageSources.visit.href} target="_blank" rel="noreferrer">Image source: Unsplash ↗</a></span>
            </figure>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p><span>NORTHLINE</span> / Training club concept</p>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeModal()
        }}>
          <div className="dialog-card" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div className="dialog-card__header">
              <div>
                <p className="eyebrow">Local demo form</p>
                <h2 id="dialog-title">Request a visit.</h2>
              </div>
              <button ref={dialogCloseRef} className="icon-button" type="button" aria-label="Close request form" onClick={closeModal}>×</button>
            </div>

            {formStatus === 'success' ? (
              <div className="form-feedback form-feedback--success" role="status">
                <p>{formMessage}</p>
                <button className="button button--outline" type="button" onClick={closeModal}>Close form</button>
              </div>
            ) : (
              <form className="visit-form" onSubmit={handleFormSubmit} noValidate>
                <p className="dialog-intro">This form is local to the NORTHLINE concept. A live version would connect it to the gym inbox.</p>
                <label htmlFor="visit-name">
                  Name
                  <input
                    id="visit-name"
                    name="name"
                    type="text"
                    value={formValues.name}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={formStatus === 'error' && !formValues.name.trim()}
                    onChange={(event) => updateFormValue('name', event.target.value)}
                  />
                </label>
                <label htmlFor="visit-email">
                  Email
                  <input
                    id="visit-email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    placeholder="email@example.com"
                    autoComplete="email"
                    aria-invalid={formStatus === 'error' && (!formValues.email.trim() || !/^\S+@\S+\.\S+$/.test(formValues.email))}
                    onChange={(event) => updateFormValue('email', event.target.value)}
                  />
                </label>
                <label htmlFor="visit-interest">
                  Training interest
                  <select id="visit-interest" name="interest" value={formValues.interest} onChange={(event) => updateFormValue('interest', event.target.value)}>
                    <option value="">Select an option</option>
                    <option value="program">Foundation program</option>
                    <option value="membership">Coached Week membership</option>
                    <option value="visit">A first visit</option>
                  </select>
                </label>
                {formMessage && <p className="form-feedback form-feedback--error" role="alert">{formMessage}</p>}
                <button className="button button--accent button--full" type="submit" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Saving request...' : 'Save request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
