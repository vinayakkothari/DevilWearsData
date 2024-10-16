import axios from 'axios';
import FormData from 'form-data'; // Import FormData

export async function removeBackground(fileBuffer) {
  const removeBgApiKey = process.env.REMOVE_BG_API_KEY;

  // Create a FormData instance and append the buffer
  const formData = new FormData();
  formData.append('image_file', fileBuffer, { filename: 'image.png' }); // Include filename

  try {
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        'X-Api-Key': removeBgApiKey,
        ...formData.getHeaders(), // Ensure correct headers
      },
      responseType: 'arraybuffer', // Ensure you receive the response as an array buffer
    });

    return response.data; // This is the image buffer without the background

  } catch (err) {
    console.log(err.response?.data || err); // Detailed error logging
    throw new Error('Background removal failed: ' + err.message);
  }
}

