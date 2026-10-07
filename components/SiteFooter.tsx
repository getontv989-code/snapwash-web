import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <a className="logo foot-logo" href="/" aria-label="Snapwash home">
            <Logo />
            <span className="sr-only">Snapwash</span>
          </a>
          <p>Laundry and dry cleaning pickup and delivery from the cleaners in your neighborhood. Serving New York, New Jersey and Connecticut.</p>
        </div>
        <div className="foot-links">
          <nav className="f-col" aria-labelledby="f1">
            <h2 id="f1">Snapwash</h2>
            <ul>
              <li><a href="/">For customers</a></li>
              <li><a href="/drive">Drive with us</a></li>
              <li><a href="/cleaners">For cleaners</a></li>
              <li><a href="/#pricing">Pricing</a></li>
            </ul>
          </nav>
          <nav className="f-col" aria-labelledby="f2">
            <h2 id="f2">Company</h2>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
          <nav className="f-col" aria-labelledby="f3">
            <h2 id="f3">Get the app</h2>
            <ul>
              <li><a href="https://apps.apple.com/us/search?term=snapwash" target="_blank" rel="noopener">App Store</a></li>
              <li><a href="https://play.google.com/store/search?q=snapwash&c=apps" target="_blank" rel="noopener">Google Play</a></li>
            </ul>
          </nav>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Snapwash. All rights reserved.</span>
          <span><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/cookies">Cookies</a></span>
        </div>
      </div>
    </footer>
  );
}
