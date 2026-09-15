const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const browserHostname = typeof window === 'undefined' ? '' : window.location.hostname;
const codespaceHost = browserHostname.replace(
  /-\d+\.app\.github\.dev$/,
  '-8000.app.github.dev'
);

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : codespaceHost !== browserHostname
    ? `https://${codespaceHost}`
    : 'http://localhost:8000';

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/`);
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`);
  }

  const payload = await response.json();
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
}
