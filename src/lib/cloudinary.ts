/**
 * Cloudinary Client Upload Helper
 * Sends image data (File or base64) to server-side /api/upload endpoint
 * Returns persistent Cloudinary CDN URL (e.g. https://res.cloudinary.com/nyopaljc/image/upload/...)
 */
export async function uploadToCloudinary(
  fileOrBase64: File | Blob | string,
  folder: 'stwapy/listings' | 'stwapy/verifications' | 'stwapy/avatars' = 'stwapy/listings'
): Promise<string> {
  // If already a remote CDN URL, don't re-upload
  if (typeof fileOrBase64 === 'string' && (fileOrBase64.startsWith('http://') || fileOrBase64.startsWith('https://'))) {
    return fileOrBase64;
  }

  let body: string | FormData;
  let headers: HeadersInit = {};

  if (typeof fileOrBase64 === 'string') {
    body = JSON.stringify({ file: fileOrBase64, folder });
    headers = { 'Content-Type': 'application/json' };
  } else {
    const formData = new FormData();
    formData.append('file', fileOrBase64);
    formData.append('folder', folder);
    body = formData;
  }

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers,
    body,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to upload photo to Cloudinary');
  }

  return data.url;
}

/**
 * Batch upload multiple photos to Cloudinary
 */
export async function uploadMultipleToCloudinary(
  items: (File | Blob | string)[],
  folder: 'stwapy/listings' | 'stwapy/verifications' = 'stwapy/listings',
  onProgress?: (completed: number, total: number) => void
): Promise<string[]> {
  const results: string[] = [];
  let completed = 0;

  for (const item of items) {
    const url = await uploadToCloudinary(item, folder);
    results.push(url);
    completed++;
    if (onProgress) onProgress(completed, items.length);
  }

  return results;
}
