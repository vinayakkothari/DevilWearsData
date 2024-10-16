import { useState } from 'react';
import axios from 'axios';

function UploadWardrobe() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [season, setSeason] = useState('');
  const [tags, setTags] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected.");
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('color', color);
    formData.append('season', season);
    formData.append('tags', tags);

    try {
      const res = await axios.post('http://localhost:3000/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (err) {
      console.log('Error uploading file:', err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Upload Your Wardrobe</h1>
      
      <form className="bg-white p-8 shadow-md rounded-lg space-y-4" onSubmit={handleUpload}>
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Upload Image</label>
          <input 
            type="file" 
            className="border border-gray-300 p-2 rounded w-full"
            onChange={(e) => setFile(e.target.files[0])} 
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Type</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Select type of clothing</option>
            <option value="shirt">Shirt</option>
            <option value="skirt">Skirt</option>
            <option value="pants">Pants</option>
            <option value="dress">Dress</option>
            <option value="jewellery">Jewellery</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Color</label>
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 p-1"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Season</label>
          <select 
            value={season} 
            onChange={(e) => setSeason(e.target.value)} 
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Select Season</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Tags</label>
          <input 
            type="text" 
            placeholder="e.g., casual, formal"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadWardrobe;
