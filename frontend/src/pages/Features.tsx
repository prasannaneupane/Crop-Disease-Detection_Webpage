import Card from '../components/Card'

import type { ReactElement } from 'react'

interface Feature {
  title: string
  icon: string
  text: string
}

const features: Feature[] = [
  {
    title: 'Image-based detection',
    icon: '🖼️',
    text: 'Upload a crop/leaf image and get a model-driven disease prediction (UI placeholder).',
  },
  {
    title: 'Research-friendly workflow',
    icon: '🧪',
    text: 'Designed for academic demos: clear sections, repeatable steps, and clean presentation.',
  },
  {
    title: 'Farmer-first clarity',
    icon: '🌿',
    text: 'Communicates results in plain language with confidence and next-step guidance placeholders.',
  },
  {
    title: 'Scalable foundation',
    icon: '⚙️',
    text: 'Frontend structure supports future API integration without UI redesign.',
  },
]

export default function Features(): ReactElement {
  return (
    <section className="section">
      <div className="container">
        <div className="sectionHeader">
          <h2 className="sectionHeader__title">Features</h2>
          <p className="sectionHeader__subtitle">
            A minimal, professional UI that fits both university evaluation and real-world product direction.
          </p>
        </div>

        <div className="grid grid--4">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title} icon={feature.icon}>
              <p className="muted">{feature.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
