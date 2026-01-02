import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import type { ComponentPropsWithoutRef, MouseEvent, ReactElement, ReactNode } from 'react'
import type { LinkProps } from 'react-router-dom'

// One-time CSS injection (keeps it minimalist without adding new files)
const STYLE_ID = 'app-btn-styles'
const CSS = `
  .btn{
    --btn-bg:#0a8f2b;
    --btn-fg:#fff;
    --btn-bd:transparent;
    --btn-shadow: 0 6px 18px rgba(10,143,43,.18);
    display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
    border:1px solid var(--btn-bd);
    background:var(--btn-bg);
    color:var(--btn-fg);
    text-decoration:none;
    font-weight:700;
    border-radius:999px;
    transition:transform .12s ease, box-shadow .12s ease, background-color .12s ease, border-color .12s ease, opacity .12s ease;
    user-select:none;
    -webkit-tap-highlight-color: transparent;
  }
  .btn:hover{ transform: translateY(-1px); box-shadow: var(--btn-shadow); }
  .btn:active{ transform: translateY(0px); box-shadow: none; }
  .btn:focus-visible{ outline: none; box-shadow: 0 0 0 4px rgba(10,143,43,.22); }
  .btn[aria-disabled="true"], .btn:disabled{ opacity:.55; pointer-events:none; transform:none; box-shadow:none; }

  .btn--primary{ --btn-bg:#0a8f2b; --btn-fg:#fff; }
  .btn--secondary{
    --btn-bg: transparent;
    --btn-fg:#0a8f2b;
    --btn-bd: rgba(10,143,43,.35);
    --btn-shadow: 0 10px 26px rgba(0,0,0,.06);
  }
  .btn--secondary:hover{ border-color: rgba(10,143,43,.55); background: rgba(10,143,43,.06); }

  .btn--sm{ padding:.45rem .85rem; font-size:.9rem; }
  .btn--md{ padding:.6rem 1.05rem; font-size:1rem; }
  .btn--lg{ padding:.78rem 1.25rem; font-size:1.05rem; }

  .btn__icon{ line-height:1; display:inline-flex; }
`

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type RightIcon = 'arrow' | ReactNode

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  rightIcon?: RightIcon
  children?: ReactNode
  className?: string
  disabled?: boolean
}

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<LinkProps, 'to' | 'className' | 'children' | 'onClick'> & {
    to: LinkProps['to']
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  }

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    to?: undefined
    type?: 'button' | 'submit' | 'reset'
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  }

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps

/**
 * Reusable button.
 * - Uses <button> for actions
 * - Uses <Link> for navigation
 * Keeps API small and predictable (no over-engineering).
 */
export default function Button({
  ...props
}: ButtonProps): ReactElement {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(STYLE_ID)) return
    const tag = document.createElement('style')
    tag.id = STYLE_ID
    tag.appendChild(document.createTextNode(CSS))
    document.head.appendChild(tag)
  }, [])

  if ('to' in props && props.to !== undefined) {
    const {
      to,
      onClick,
      variant = 'primary',
      size = 'md',
      rightIcon,
      children,
      className = '',
      disabled,
      ...linkProps
    } = props

    const classes = `btn btn--${variant} btn--${size} ${className}`.trim()
    const icon =
      rightIcon === 'arrow' ? (
        <span className="btn__icon" aria-hidden="true">
          →
        </span>
      ) : (
        rightIcon
      )

    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled ? 'true' : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
          }
          onClick?.(e)
        }}
        {...linkProps}
      >
        <span>{children}</span>
        {icon}
      </Link>
    )
  }

  const {
    type = 'button',
    variant = 'primary',
    size = 'md',
    rightIcon,
    children,
    className = '',
    disabled,
    ...buttonProps
  } = props

  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()
  const icon =
    rightIcon === 'arrow' ? (
      <span className="btn__icon" aria-hidden="true">
        →
      </span>
    ) : (
      rightIcon
    )

  return (
    <button className={classes} type={type} disabled={disabled} {...buttonProps}>
      <span>{children}</span>
      {icon}
    </button>
  )
}
