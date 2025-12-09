import { getApiUrl } from './urlUtils';

/**
 * Upload utility class for handling file uploads to the server.
 * Provides methods for uploading files and receiving their stored paths.
 */
export class Upload {
  /** The API endpoint for file uploads. */
  private static endpoint: string = getApiUrl('/upload');

  /**
   * Uploads a file to the server.
   * 
   * @async
   * @param {File} file - The file object to upload (from file input or drag-drop).
   * @returns {Promise<{ path: string }>} Promise resolving to an object containing the stored path.
   * @throws {Error} Throws an error if the upload fails (e.g., HTTP error response).
   * 
   * @example
   * const file = fileInput.files[0];
   * const result = await Upload.upload(file);
   * console.log('File uploaded to:', result.path); // e.g., '/uploads/1764357163890-525509.png'
   */
  static async upload(file: File): Promise<{ path: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(Upload.endpoint, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data; // { path: "/uploads/1764357163890-525509.png" }
  }
}
