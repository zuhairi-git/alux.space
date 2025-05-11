/**
 * RTL Debugging Utilities
 * 
 * These utilities help identify and debug RTL rendering issues
 */

/**
 * Logs RTL-related attributes and classes of the current document
 * Useful for debugging RTL layout issues
 */
export function debugRTLStatus() {
  if (typeof document === 'undefined') return;
  
  // Log document direction
  const dir = document.documentElement.getAttribute('dir');
  console.group('RTL Debug Information');
  console.log(`HTML dir attribute: ${dir}`);
  
  // Log document language
  const lang = document.documentElement.getAttribute('lang');
  console.log(`HTML lang attribute: ${lang}`);
  
  // Log relevant CSS classes
  const classes = document.documentElement.className;
  console.log(`HTML classes: ${classes}`);
  
  // Check body text direction
  const bodyDirection = window.getComputedStyle(document.body).direction;
  console.log(`Body computed direction: ${bodyDirection}`);
  
  // Check footer direction
  const footerEl = document.querySelector('footer');
  if (footerEl) {
    const footerDirection = window.getComputedStyle(footerEl).direction;
    console.log(`Footer computed direction: ${footerDirection}`);
    
    // Check footer text alignment
    const footerTextAlign = window.getComputedStyle(footerEl).textAlign;
    console.log(`Footer text alignment: ${footerTextAlign}`);
  }
  
  console.groupEnd();
}

/**
 * Adds debugging outlines to RTL elements
 * Useful for visually identifying RTL container boundaries
 */
export function enableRTLDebugOutlines() {
  if (typeof document === 'undefined') return;
  
  // Add a debug class to the HTML element
  document.documentElement.classList.add('rtl-debug');
  
  // Create a style element for debug outlines
  const style = document.createElement('style');
  style.id = 'rtl-debug-styles';
  style.textContent = `
    .rtl-debug [dir="rtl"] * {
      outline: 1px dashed rgba(255, 0, 0, 0.3) !important;
    }
    .rtl-debug [dir="rtl"] [lang="ar"] {
      outline: 2px solid rgba(0, 255, 0, 0.3) !important;
    }
    .rtl-debug .rtl-text {
      background-color: rgba(0, 0, 255, 0.1) !important;
    }
  `;
  
  document.head.appendChild(style);
  console.log('RTL debug outlines enabled. Add ?debug=rtl to URL to enable automatically.');
}

/**
 * Disables RTL debug outlines
 */
export function disableRTLDebugOutlines() {
  if (typeof document === 'undefined') return;
  
  document.documentElement.classList.remove('rtl-debug');
  const style = document.getElementById('rtl-debug-styles');
  if (style) {
    style.remove();
  }
  console.log('RTL debug outlines disabled.');
}

/**
 * Initializes RTL debugging based on URL parameters
 * Add ?debug=rtl to the URL to enable debug outlines
 */
export function initRTLDebug() {
  if (typeof window === 'undefined') return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const debug = urlParams.get('debug');
  
  if (debug === 'rtl') {
    console.log('RTL debug mode activated via URL');
    enableRTLDebugOutlines();
    debugRTLStatus();
  }
}
