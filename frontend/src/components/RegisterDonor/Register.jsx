import { useState ,useEffect} from "react";
import axios from "axios";

import { useDispatch,useSelector } from 'react-redux';
import { setId } from "../../redux/userSlice";


export default function RegisterDonor() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [password, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const[userId,setUserId]=useState();
  

 const dispatch=useDispatch();

    const createUser=async ()=>{

    const response=await axios.post("http://localhost:5000/api/users",{full_name,email,role,address,phone,image,password});
    setUserId(response.data.id);
    // console.log(userId);


  }
  useEffect(() => {
  if (userId) {
    console.log("Updated User ID:", userId);
    dispatch(setId(userId));
  }
}, [userId]);

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="fullName" className="block font-medium">Full Name</label>
            <input id="fullName" className="w-full p-2 border rounded" value={full_name} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input id="email" type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="role" className="block font-medium">Role</label>
            <input id="role" className="w-full p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div>
            <label htmlFor="address" className="block font-medium">Address</label>
            <input id="address" className="w-full p-2 border rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium">Phone</label>
            <input id="phone" type="tel" className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label htmlFor="image" className="block font-medium">Profile Image</label>
            <input id="image" type="text" className="w-full p-2 border rounded" onChange={(e) => setImage(e.target.value)} />
          </div>
          <div>
            <label htmlFor="newPassword" className="block font-medium">New Password</label>
            <input id="newPassword" type="password" className="w-full p-2 border rounded" value={password} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="retypePassword" className="block font-medium">Retype Password</label>
            <input id="retypePassword" type="password" className="w-full p-2 border rounded" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
          </div>
          <button onClick={createUser} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
