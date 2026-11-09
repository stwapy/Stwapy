import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Cloudinary Media Upload API Route
 * Handles secure server-side image upload to Cloudinary.
 * Keeps CLOUDINARY_API_SECRET safe and shielded on the server.
 */
export async function POST(req: NextRequest) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'nyopaljc';
    const apiKey = process.env.CLOUDINARY_API_KEY || '989416683993129';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'OxpHutxuFbJn99UspDFqXMoCsqQ';

    let fileData: string | null = null;
    let folder = 'stwapy/listings';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      fileData = body.file || body.image || null;
      if (body.folder) folder = body.folder;
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file');
      const folderParam = formData.get('folder');
      if (folderParam && typeof folderParam === 'string') {
        folder = folderParam;
      }

      if (file instanceof Blob) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString('base64');
        const mimeType = file.type || 'image/jpeg';
        fileData = `data:${mimeType};base64,${base64}`;
      } else if (typeof file === 'string') {
        fileData = file;
      }
    }

    if (!fileData) {
      return NextResponse.json(
        { success: false, error: 'No image file provided for upload' },
        { status: 400 }
      );
    }

    // If already a hosted URL (e.g. Unsplash, existing Cloudinary), return directly
    if (fileData.startsWith('http://') || fileData.startsWith('https://')) {
      return NextResponse.json({
        success: true,
        url: fileData,
        source: 'existing_url',
      });
    }

    const timestamp = Math.round(Date.now() / 1000);
    // Cloudinary requires signing sorted parameter key=value string + api_secret
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

    const uploadPayload = new FormData();
    uploadPayload.append('file', fileData);
    uploadPayload.append('api_key', apiKey);
    uploadPayload.append('timestamp', timestamp.toString());
    uploadPayload.append('signature', signature);
    uploadPayload.append('folder', folder);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadPayload,
      }
    );

    const data = await cloudRes.json();

    if (!cloudRes.ok) {
      console.error('[Cloudinary API Error]', data);
      return NextResponse.json(
        { success: false, error: data?.error?.message || 'Failed to upload image to Cloudinary' },
        { status: cloudRes.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url || data.url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    });
  } catch (error: any) {
    console.error('[Upload Route Exception]', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error while processing image upload' },
      { status: 500 }
    );
  }
}
