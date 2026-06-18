import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-xl bg-surface-container mt-xl" id="site-footer">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-lg">
        {/* Brand Column */}
        <div className="space-y-md">
          <Link to="/" className="font-display-lg text-headline-md text-primary block">
            Crema &amp; Co.
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Artisanal roasters dedicated to the craft of exceptional coffee and sustainable sourcing since 2014.
          </p>
        </div>
        {/* Links Column 1 */}
        <div className="flex flex-col gap-sm">
          <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-xs">Explore</h4>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Journal</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Wholesale</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Sustainability</a>
        </div>
        {/* Links Column 2 */}
        <div className="flex flex-col gap-sm">
          <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-xs">Support</h4>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Shipping &amp; Returns</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Contact Us</a>
        </div>
        {/* Social/Loc Column */}
        <div className="space-y-md">
          <h4 class="font-label-md text-label-md text-primary uppercase tracking-wider mb-xs">Connect</h4>
          <div className="flex gap-md">
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a>
          </div>
          <div className="pt-sm">
            <p className="font-caption text-caption text-on-surface-variant">Flagship Roastery:</p>
            <p className="font-body-md text-body-md text-primary">82 Artisan Way, Portland, OR</p>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-gutter mt-xl pt-lg border-t border-outline-variant/30">
        <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left">
          © 2024 Crema &amp; Co. Artisanal Roasters. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
