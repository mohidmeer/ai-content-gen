'use server';

import { googleCloudCreds } from '@/service_account_key';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: googleCloudCreds
      ,
});
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

// Define the MIME type mapping
interface MimeTypeInfo {
    folder: string;
    extension: string;
}

const mimeTypeMapping: { [key: string]: MimeTypeInfo } = {
    'audio/mpeg': { folder: 'audio/mp3', extension: 'mp3' },
    'audio/wav': { folder: 'audio/wav', extension: 'wav' },
};

// Function to upload to Google Cloud Storage
export async function uploadToGCS(buffer: Buffer, mimeType: string): Promise<string> {
    if (!buffer) {
        throw new Error('No file provided');
    }

    const fileInfo = mimeTypeMapping[mimeType];

    if (!fileInfo) {
        throw new Error(`Unsupported MIME type: ${mimeType}`);
    }

    const { folder, extension } = fileInfo;
    const fileName = `${uuidv4()}.${extension}`;


    const file = storage.bucket(bucketName).file(`${folder}/${fileName}`);

    try {
        await file.save(buffer, {
            contentType: mimeType,
            resumable: false,
        });
        
        await file.makePublic();
        
        return `https://storage.googleapis.com/${bucketName}/${folder}/${fileName}`;
        
    } catch (error) {
        console.error('Error uploading to Google Cloud Storage:', error);
        throw new Error('Upload failed');
    }
}