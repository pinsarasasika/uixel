'use client';

import { FirebaseStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads an image to Firebase Storage and returns the public URL.
 * @param storage The Firebase Storage instance.
 * @param file The image file to upload.
 * @param path The path in the storage bucket to upload the file to.
 * @returns A promise that resolves with the public URL of the uploaded image.
 */
export async function uploadImage(storage: FirebaseStorage, file: File, path: string): Promise<string> {
    if (!file) {
        throw new Error('No file provided for upload.');
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const storageRef = ref(storage, `${path}/${fileName}`);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        // Here you could re-throw the error or handle it as needed
        // For now, let's re-throw to be handled by the caller.
        throw error;
    }
}
