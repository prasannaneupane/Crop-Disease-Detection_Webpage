/**
 * Reusable card container.
 * Used for features, steps, and content blocks.
 */
export default function Card({ title, icon, children, className = '' }) {
  return (
    <div className={`card ${className}`.trim()}>
      {(icon || title) && (
        <div className="card__header">
          {icon && <div className="card__icon">{icon}</div>}
          {title && <h3 className="card__title">{title}</h3>}
        </div>
      )}
      <div className="card__body">{children}</div>
    </div>
  )
}
