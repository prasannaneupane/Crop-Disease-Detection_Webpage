import Card from '../components/Card'

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="sectionHeader">
          <h2 className="sectionHeader__title">About</h2>
          <p className="sectionHeader__subtitle">
            Crop Disease Detection is an AI/ML-focused project that demonstrates how computer vision can support
            early identification of plant diseases.
          </p>
        </div>

        <div className="grid grid--2">
          <Card title="Purpose" icon="🎯">
            <p className="muted">
              The goal is to assist farmers, students, and researchers with a fast, accessible tool for diagnosing
              common crop diseases from images.
            </p>
          </Card>

          <Card title="Impact" icon="🌱">
            <p className="muted">
              Early detection reduces crop loss and improves yield quality. In the long term, AI-enabled decision
              support can help optimize pesticide use and promote more sustainable farming.
            </p>
          </Card>
        </div>

        <div className="spacer" />

        <Card title="Notes" icon="📌">
          <p className="muted">
            This repository currently contains a frontend-only interface for demos and portfolio presentation.
            You can connect your trained model through an API later without changing the overall UI.
          </p>
        </Card>
      </div>
    </section>
  )
}
