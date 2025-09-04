import axios from 'axios';
import { toast } from 'react-toastify';

// function to upload image and get the url
async function uploadImageToCloud(file, folderName) {
  if (file === undefined) {
    return null;
  }

  try {
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'Vidkarya_imgs');
      data.append('cloud_name', 'dkyb14ghi');

      // Add the folder to the data if provided
      if (folderName) {
        data.append('folder', folderName);
      }

      const res = await axios.post('https://api.cloudinary.com/v1_1/dkyb14ghi/image/upload', data);

      if (res.data) return res.data.url;
    } else {
      throw new Error('Uploaded image should be of type jpeg/jpg/png only');
    }
  } catch (error) {
    console.log('error :', error.message);
    toast.error(error.message);
    throw new Error('Upload failed! ', error.message);
  }
}

export { uploadImageToCloud };
