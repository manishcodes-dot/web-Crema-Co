import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-inverse-surface mt-section-gap" id="site-footer">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-stack-lg gap-gutter max-w-container-max mx-auto">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <Link to="/" className="text-headline-sm font-headline-md text-secondary dark:text-secondary-fixed">
            Crema & Co
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-inverse-on-surface text-center md:text-left">
            © 2024 Crema & Co. Artisanal Coffee Roasters.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-stack-lg">
          <a 
            className="text-on-surface-variant/80 dark:text-on-surface-variant font-body-md text-body-md hover:text-tertiary dark:hover:text-tertiary-fixed underline transition-all" 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a 
            className="text-on-surface-variant/80 dark:text-on-surface-variant font-body-md text-body-md hover:text-tertiary dark:hover:text-tertiary-fixed underline transition-all" 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a 
            className="text-on-surface-variant/80 dark:text-on-surface-variant font-body-md text-body-md hover:text-tertiary dark:hover:text-tertiary-fixed underline transition-all" 
            href="#contact"
          >
            Contact Us
          </a>
          <a 
            className="text-on-surface-variant/80 dark:text-on-surface-variant font-body-md text-body-md hover:text-tertiary dark:hover:text-tertiary-fixed underline transition-all" 
            href="#privacy"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
