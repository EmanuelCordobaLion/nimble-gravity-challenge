export function isValidGitHubUrl(url: string): boolean {
  if (!url.trim()) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'github.com' && urlObj.pathname.length > 1;
  } catch {
    return false;
  }
}

export function getGitHubUrlError(url: string): string | null {
  if (!url.trim()) {
    return 'Repository URL is required';
  }

  if (!isValidGitHubUrl(url)) {
    return 'Please enter a valid GitHub repository URL';
  }

  return null;
}
