'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * A utility hook that automatically fixes common RTL issues in the DOM
 * This can be used as a last resort for third-party components or complex layouts
 * that don't properly handle RTL out of the box
 */
export function useRTLAutofix(selector: string = 'body', config = {
  fixMargins: true,
  fixIcons: true,
  fixFlex: true,
  fixPositioning: true,
  fixForms: true
}) {
  const { isRTL } = useLanguage();
  const [fixesApplied, setFixesApplied] = useState(false);

  useEffect(() => {
    if (!isRTL) return;
    
    // Function to apply RTL fixes to the specified elements
    const applyRTLFixes = () => {
      try {
        const elements = document.querySelectorAll(selector);
        if (!elements || elements.length === 0) return;
        
        elements.forEach(element => {
          // Fix margin and padding
          if (config.fixMargins) {
            swapCssProperty(element, 'margin-left', 'margin-right');
            swapCssProperty(element, 'padding-left', 'padding-right');
            
            // Fix any margin or padding classes
            fixMarginPaddingClasses(element);
          }
          
          // Fix icon directions
          if (config.fixIcons) {
            const icons = element.querySelectorAll('.icon, i, svg, .material-symbols-rounded');
            icons.forEach(icon => {
              if (isDirectionalIcon(icon)) {
                (icon as HTMLElement).style.transform = 'scaleX(-1)';
              }
            });
          }
          
          // Fix flex direction
          if (config.fixFlex) {
            const flexStyles = window.getComputedStyle(element);
            if (flexStyles.display === 'flex' && flexStyles.flexDirection === 'row') {
              (element as HTMLElement).style.flexDirection = 'row-reverse';
            }
          }
          
          // Fix absolute positioning
          if (config.fixPositioning) {
            swapCssProperty(element, 'left', 'right');
          }
          
          // Fix form elements
          if (config.fixForms) {
            if (element.tagName === 'LABEL') {
              const input = document.getElementById(element.getAttribute('for') || '');
              if (input && (input.type === 'checkbox' || input.type === 'radio')) {
                element.parentElement?.classList.add('rtl-form-control');
              }
            }
          }
        });
        
        setFixesApplied(true);
      } catch (error) {
        console.error('Error applying RTL fixes:', error);
      }
    };
    
    // Helper functions
    const swapCssProperty = (element: Element, prop1: string, prop2: string) => {
      const styles = window.getComputedStyle(element);
      const prop1Value = styles.getPropertyValue(prop1);
      const prop2Value = styles.getPropertyValue(prop2);
      
      if (prop1Value && prop1Value !== '0px') {
        (element as HTMLElement).style.setProperty(prop2, prop1Value);
        (element as HTMLElement).style.setProperty(prop1, prop2Value);
      }
    };
    
    const fixMarginPaddingClasses = (element: Element) => {
      const classList = Array.from(element.classList);
      
      classList.forEach(className => {
        if (className.startsWith('ml-')) {
          const value = className.split('ml-')[1];
          element.classList.remove(className);
          element.classList.add(`mr-${value}`);
        } else if (className.startsWith('mr-')) {
          const value = className.split('mr-')[1];
          element.classList.remove(className);
          element.classList.add(`ml-${value}`);
        } else if (className.startsWith('pl-')) {
          const value = className.split('pl-')[1];
          element.classList.remove(className);
          element.classList.add(`pr-${value}`);
        } else if (className.startsWith('pr-')) {
          const value = className.split('pr-')[1];
          element.classList.remove(className);
          element.classList.add(`pl-${value}`);
        }
      });
    };
    
    const isDirectionalIcon = (element: Element): boolean => {
      // List of common directional icon classes and text content
      const directionalTerms = [
        'arrow', 'back', 'forward', 'next', 'prev', 'previous', 'chevron', 
        'direction', 'navigate', 'pointer'
      ];
      
      // Check class names
      const classNames = Array.from(element.classList).join(' ').toLowerCase();
      if (directionalTerms.some(term => classNames.includes(term))) {
        return true;
      }
      
      // Check text content for Material Icons
      const text = element.textContent?.toLowerCase() || '';
      return directionalTerms.some(term => text.includes(term));
    };
    
    // Apply fixes and set up observer
    applyRTLFixes();
    
    // Set up mutation observer to fix dynamically added elements
    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldReapply = true;
        }
      });
      
      if (shouldReapply) {
        applyRTLFixes();
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    return () => {
      observer.disconnect();
    };
  }, [isRTL, selector, config]);
  
  return fixesApplied;
}

/**
 * A component that automatically fixes common RTL issues for third-party components
 * or complex layouts that don't properly handle RTL out of the box
 */
export default function RTLAutofix({ 
  selector = 'body',
  children = null,
  fixMargins = true,
  fixIcons = true,
  fixFlex = true,
  fixPositioning = true,
  fixForms = true
}) {
  useRTLAutofix(selector, {
    fixMargins,
    fixIcons,
    fixFlex,
    fixPositioning,
    fixForms
  });
  
  return children;
}
