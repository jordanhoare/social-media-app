import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'images/mountains.jpg');

// Upload the file and metadata
const uploadTask = uploadBytesResumable(storageRef, file);

// Pause the upload
uploadTask.pause();

// Resume the upload
uploadTask.resume();

// Cancel the upload
uploadTask.cancel();