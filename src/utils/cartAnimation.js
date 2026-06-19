/**
 * Animates a product image flying from the clicked button/product card to the cart icon.
 * @param {Event} event - The click event of the "Add to Cart" button.
 * @param {string} [customImageSrc] - Optional image URL if the image cannot be found in the DOM.
 * @param {Function} [onComplete] - Callback to execute once the animation completes.
 */
export function animateFlyToCart(event, customImageSrc = null, onComplete = null) {
  // Find cart target element in the Navbar
  const cartIcon = document.getElementById('nav-cart');
  if (!cartIcon) {
    if (onComplete) onComplete();
    return;
  }

  const cartRect = cartIcon.getBoundingClientRect();
  
  let startRect = null;
  let imageSrc = customImageSrc;

  if (event && event.currentTarget) {
    const button = event.currentTarget;
    
    // 1. Try to find the image in the parent group/card
    // On the menu page, each product is inside a card with the class 'group'
    const card = button.closest('.group') || button.closest('a') || button.closest('section') || button.parentElement;
    const img = card ? card.querySelector('img') : null;
    
    if (img) {
      startRect = img.getBoundingClientRect();
      if (!imageSrc) imageSrc = img.src;
    } else {
      // 2. Try to find the main product detail image if on detail page
      const mainImg = document.querySelector('#product-detail-page img') || document.querySelector('img');
      if (mainImg) {
        startRect = mainImg.getBoundingClientRect();
        if (!imageSrc) imageSrc = mainImg.src;
      } else {
        startRect = button.getBoundingClientRect();
      }
    }
  }

  // Fallback to center of viewport if startRect is still null
  if (!startRect) {
    startRect = {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      width: 0,
      height: 0
    };
  }

  if (!imageSrc) {
    imageSrc = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=300'; // fallback
  }

  // Create flyer element
  const flyer = document.createElement('img');
  flyer.src = imageSrc;
  flyer.className = 'cart-flyer';
  
  const flyerSize = 70; // px (slightly larger for better visibility, premium feel)
  flyer.style.width = `${flyerSize}px`;
  flyer.style.height = `${flyerSize}px`;
  
  // Set initial position centered at startRect (without transition initially)
  const startX = startRect.left + startRect.width / 2 - flyerSize / 2;
  const startY = startRect.top + startRect.height / 2 - flyerSize / 2;
  
  flyer.style.left = `${startX}px`;
  flyer.style.top = `${startY}px`;
  
  document.body.appendChild(flyer);

  // We use double requestAnimationFrame to ensure the browser has fully rendered 
  // the flyer at its initial position before starting the transition.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const targetX = cartRect.left + cartRect.width / 2 - flyerSize / 2;
      const targetY = cartRect.top + cartRect.height / 2 - flyerSize / 2;

      // Apply target positions and class to start flying
      flyer.style.left = `${targetX}px`;
      flyer.style.top = `${targetY}px`;
      flyer.classList.add('flying');
    });
  });

  // Cleanup and trigger cart icon update/bounce after transition
  setTimeout(() => {
    flyer.remove();
    if (onComplete) {
      onComplete();
    }
  }, 750); // Matches the 0.75s transition duration
}
