import { useEffect,useState } from 'react';
import axios from 'axios';
import BackGround from "../assets/upload_bg.jpg";

function UploadWardrobe() {
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState('');
  const [masterCat] = useState('Apparel');
  const [subCat, setSubCat] = useState('');
  const [ctype, setCType] = useState('');
  const [color, setColor] = useState('');
  const [season, setSeason] = useState('');
  const [usage, setUsage] = useState('');
  const [tags, setTags] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId); // Set the userId state with the value from localStorage
    } else {
      console.log("No userId found in localStorage.");
    }
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected.");
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('gender', gender);
    formData.append('masterCat', masterCat);
    formData.append('subCat', subCat);
    formData.append('type', ctype);
    formData.append('color', color);
    formData.append('season', season);
    formData.append('usage', usage);
    formData.append('tags', tags);
    formData.append('userId', userId);

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
    <div 
      className="flex flex-col items-center p-6 min-h-screen bg-white relative"
      style={{
        backgroundImage: `url(${BackGround})`,  
        backgroundSize: 'cover',  
        backgroundPosition: 'center',  
      }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50 z-0" />
      
      {/* <h1 className="text-3xl font-bold mb-6 text-black z-10">Upload Your Wardrobe</h1> */}
      
      <form className="bg-white p-8 shadow-md rounded-lg space-y-4 z-10" onSubmit={handleUpload}>
      <h1 className="text-3xl font-bold mb-6 text-red-400 z-10">Upload Your Wardrobe</h1>
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
          <label className="block text-gray-700 font-semibold">Gender</label>
          <select 
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Clothes type</label>
          <select 
            value={subCat}
            onChange={(e) => setSubCat(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Select clothes type</option>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="saree">Saree</option>
            <option value="dress">Dress</option>
            <option value="apparelset">Apparel Set</option>
            <option value="socks">Socks</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Article Type</label>
          <select 
            value={ctype}
            onChange={(e) => setCType(e.target.value)}  // Fixed the function name to setCType
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Select type of clothing</option>
            <option value="shirt">Shirts</option>
            <option value="jeans">Jeans</option>
            <option value="track pants">Track Pants</option>
            <option value="tshirt">Tshirts</option>
            <option value="tops">Tops</option>
            <option value="sweatshirt">Sweatshirts</option>
            <option value="kurta">Kurtas</option>
            <option value="waistcoat">Waistcoat</option>
            <option value="shorts">Shorts</option>
            <option value="sarees">Sarees</option>
            <option value="rain jacket">Rain Jacket</option>
            <option value="dress">Dresses</option>
            <option value="skirt">Skirts</option>
            <option value="blazers">Blazers</option>
            <option value="kurta sets">Kurta Sets</option>
            <option value="shrug">Shrug</option>
            <option value="trousers">Trousers</option>
            <option value="dupatta">Dupatta</option>
            <option value="capris">Capris</option>
            <option value="tunics">Tunics</option>
            <option value="jackets">Jackets</option>
            <option value="sweaters">Sweaters</option>
            <option value="tracksuits">Tracksuits</option>
            <option value="swimwear">Swimwear</option>
            <option value="leggings">Leggings</option>
            <option value="kurtis">Kurtis</option>
            <option value="jumpsuit">Jumpsuit</option>
            <option value="suspenders">Suspenders</option>
            <option value="salwar and dupatta">Salwar and Dupatta</option>
            <option value="patiala">Patiala</option>
            <option value="stockings">Stockings</option>
            <option value="tights">Tights</option>
            <option value="churidar">Churidar</option>
            <option value="nehru jackets">Nehru Jackets</option>
            <option value="salwar">Salwar</option>
            <option value="jeggings">Jeggings</option>
            <option value="rompers">Rompers</option>
            <option value="booties">Booties</option>
            <option value="lehenga choli">Lehenga Choli</option>
            <option value="clothing set">Clothing Set</option>
            <option value="belts">Belts</option>
            <option value="rain trousers">Rain Trousers</option>
            <option value="suits">Suits</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Colour</label>
          <select 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Select colour</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="grey">Grey</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
            <option value="pink">Pink</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="unknown">Unknown</option>
          </select>
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
          <label className="block text-gray-700 font-semibold">Usage</label>
          <select 
            value={usage} 
            onChange={(e) => setUsage(e.target.value)} 
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">Select Usage</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="sports">Sports</option>
            <option value="party">Party</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Tags</label>
          <input 
            type="text" 
            className="border border-gray-300 p-2 rounded w-full"
            value={tags}
            onChange={(e) => setTags(e.target.value)} 
            placeholder="Comma separated tags"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-400 text-white py-2 rounded-lg hover:bg-red-500 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadWardrobe;
