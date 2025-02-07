import { useEffect } from 'react';

function RedirectComponent({ to }) {
  useEffect(() => {
    window.location.href = to; // Causes the browser to navigate to the new URL
  }, [to]);

  return null; // Renders nothing, just performs the redirection
}

export default RedirectComponent; // Exports the component for use in other files
