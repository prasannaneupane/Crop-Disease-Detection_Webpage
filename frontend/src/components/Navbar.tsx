import { NavLink } from 'react-router-dom'

import type { ReactElement } from 'react'

interface NavItem {
  label: string
  to: string
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Detect', to: '/detect' },
  { label: 'About', to: '/about' },
  { label: 'Get Started', to: '/get-started' },
]

export default function Navbar(): ReactElement {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <NavLink to="/" className="nav__brand" aria-label="Crop Disease Detection home">
          <span className="nav__mark" aria-hidden="true" />
          <span className="nav__brandText">Crop Disease Detection</span>
        </NavLink>

        <nav className="nav__links" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
