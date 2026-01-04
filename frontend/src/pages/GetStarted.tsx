import Button from '../components/Button'
import Card from '../components/Card'
import './GetStarted.css'

import type { ReactElement } from 'react'

interface Step {
  title: string
  icon: string
  text: string
}

// Intentionally simple: clear steps for a university demo and portfolio.
const steps: Step[] = [
  {
    title: 'Open Detect',
    icon: '1️⃣',
    text: 'Navigate to the Detect page to access the upload interface.',
  },
  {
    title: 'Upload an image',
    icon: '2️⃣',
    text: 'Drag & drop or browse a leaf/crop image from your device.',
  },
  {
    title: 'View the result',
    icon: '3️⃣',
    text: 'See the prediction layout (placeholder until you connect your model/API).',
  },
]

export default function GetStarted(): ReactElement {
  return (
    <section className="section">
      <div className="container">
        <div className="sectionHeader">
          <h2 className="sectionHeader__title">Get Started</h2>
          <p className="sectionHeader__subtitle">A simple, repeatable flow designed for demos and real usage.</p>
        </div>

        <div className="grid grid--3">
          {steps.map((step) => (
            <Card key={step.title} title={step.title} icon={step.icon}>
              <p className="muted">{step.text}</p>
            </Card>
          ))}
        </div>

        <div className="ctaBand">
          <div className="ctaBand__content">
            <h3 className="ctaBand__title">Ready to try it?</h3>
            <p className="ctaBand__text muted">Jump to Detect and upload an image.</p>
          </div>
          <Button to="/detect" variant="primary">
            Go to Detect
          </Button>
        </div>
      </div>
    </section>
  )
}
