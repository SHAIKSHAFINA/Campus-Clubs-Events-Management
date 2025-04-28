
/**
 * Safely triggers a click event on a DOM element
 * Use this instead of element.click() for better TypeScript compatibility
 */
export const safeClick = (element: Element | null) => {
  if (element) {
    element.dispatchEvent(new MouseEvent('click', { 
      bubbles: true,
      cancelable: true,
      view: window
    }));
  }
};
