import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '../lib/firebase';

// Uploads a file to Firebase Storage and returns a public download URL
export const storageService = {
  uploadImage: async (file) => {
    const timestamp = Date.now();
    const safeName = file.name.replace(/\s+/g, '-');
    const objectPath = `items/${timestamp}-${safeName}`;
    const storageRef = ref(firebaseStorage, objectPath);
    await uploadBytes(storageRef, file, { contentType: file.type });
    const url = await getDownloadURL(storageRef);
    return url;
  },
};


