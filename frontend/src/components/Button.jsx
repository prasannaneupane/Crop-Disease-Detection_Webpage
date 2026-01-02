import { Link } from 'react-router-dom'

/**
 * Reusable button.
 * - Uses <button> for actions
 * - Uses <Link> for navigation
 * Keeps API small and predictable (no over-engineering).
 */
export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

