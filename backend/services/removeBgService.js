import axios from 'axios';

export async function removeBackground(file) {
  const removeBgApiKey = process.env.REMOVE_BG_API_KEY;

  try {
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', file, {
      headers: {
        'X-Api-Key': removeBgApiKey,
        'Content-Type': file.type,
      },
      responseType: 'arraybuffer',
    });
    return response.data; 
  } catch (err) {
    throw new Error('Background removal failed: ' + err.message);
  }
}
