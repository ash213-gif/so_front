import './Form.css'

const Header = () => {
  return (
    <header className="header">

      {/* Brand Pill */}
      <div className="header__brand">
        <div className="header__brand-icon">S</div>
        <div className="header__brand-text">
          <p className="header__brand-name">Shravan Singh</p>
          <span className="header__brand-label">Society</span>
        </div>
      </div>

      {/* Eyebrow */}
      <p className="header__eyebrow">Make a Difference</p>

      {/* Heading */}
      <h1 className="header__heading">
        Your generosity{' '}
        <span className="header__heading-accent">changes lives.</span>
      </h1>

      {/* Divider */}
      <div className="header__divider" />

      {/* Sub-text */}
      <p className="header__sub">
        Every rupee you donate goes directly toward campaigns that uplift
        communities and create lasting change.
      </p>

    </header>
  )
}

export default Header