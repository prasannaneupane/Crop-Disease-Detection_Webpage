import Button from '../components/Button'

export default function Home() {
  return (
    <section className="section section--hero">
      <div className="container hero">
        <div className="hero__content">
          <p className="badge">AI/ML • Agriculture • Vision</p>
          <h1 className="hero__title">
            Detect crop diseases early
            <span className="hero__accent"> with AI</span>
          </h1>
          <p className="hero__subtitle">
            A clean, university-ready prototype UI for image-based disease detection.
            Upload a leaf image, get a prediction, and understand the likely impact.
          </p>

          <div className="hero__actions">
            <Button to="/detect" variant="primary">Detect Crop Disease</Button>
            <Button to="/features" variant="secondary">Explore Features</Button>
          </div>

          <div className="hero__meta">
            <div className="hero__stat">
              <p className="hero__statValue">Fast</p>
              <p className="hero__statLabel">Instant UI feedback</p>
            </div>
            <div className="hero__stat">
              <p className="hero__statValue">Minimal</p>
              <p className="hero__statLabel">Clear academic layout</p>
            </div>
            <div className="hero__stat">
              <p className="hero__statValue">Demo-ready</p>
              <p className="hero__statLabel">Portfolio + showcase</p>
            </div>
          </div>
        </div>

        {/* Visual placeholder (no flashy animation) */}
        <div className="hero__panel" aria-hidden="true">
          <div className="hero__panelTop">
            <div className="pill" />
            <div className="pill pill--muted" />
            <div className="pill pill--muted" />
          </div>
          <div className="hero__panelBody">
            <div className="skeletonLine" />
            <div className="skeletonLine skeletonLine--short" />
            <div className="skeletonCard">
              <div className="skeletonLine" />
              <div className="skeletonLine skeletonLine--short" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
