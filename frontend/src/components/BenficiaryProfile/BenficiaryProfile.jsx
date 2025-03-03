import React, { useState, useRef, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setId } from "../../redux/userSlice";

import Swal from "sweetalert2";
import axios from 'axios';



const BeneficiaryProfile = () => {
  const dispatch=useDispatch();
  // For handling the announcement slider
  const sliderRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
const [userInfo, setUserInfo] = useState(null);
const [user,setUser]=useState(null);
const [Announcements,setAnnouncements]=useState();
  const userid=useSelector((state)=>state.UID.userId);
  const[error,setError]=useState();


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //        const tokenResponse = await axios.get("http://localhost:5000/api/users/me", {
  //         withCredentials: true, // Ensures cookies are sent
  //       });
        
  //       const userId = tokenResponse.data.id;
  //       console.log(userId);
  //       dispatch(setId(userId)); 
  //       const response = await axios.get(`http://localhost:5000/api/users/${userid}`,{withCredentials: true} );
  //       console.log(response.data)
  //       setUserInfo(response.data);
  //       setUser(response.data);
        
  //     } catch (err) {
  //       setError("Failed to fetch user data.");
  //     } 
  //   };
  //   // const fetchAds=async () => {

  //   //  const response=await axios.get(`http://localhost:5000/api/ads/${userid}`);
  //   //      const verifiedAds = response.data.filter(ad => ad.verified === true);
    
  //   // setAnnouncements(verifiedAds);
  //   // //  setAnnouncements(response.data);
  //   // }

  //   if (userid) {
  //     fetchUserData();
  //     // fetchAds();
  //   }
  // }, [userid]);


  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const tokenResponse = await axios.get("http://localhost:5000/api/users/me", {
        withCredentials: true, // Ensures cookies are sent
      });
      
      const userId = tokenResponse.data.id;
      dispatch(setId(userId)); 
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`, { withCredentials: true });
      console.log(response.data);
      setUserInfo(response.data);
      setUser(response.data);
    } catch (err) {
      setError("Failed to fetch user data.");
    }
  }
  const fetchAds=async () => {

const response=await axios.get(`http://localhost:5000/api/ads/${userid}`,{withCredentials: true, });
   const verifiedAds = response.data.filter(ad => ad.verified === true);

setAnnouncements(verifiedAds);
//  setAnnouncements(response.data);
  };

  fetchUserData();
  fetchAds();
}, [userid, dispatch]); // Make sure to include userid and dispatch as dependencies

async function updateInfo(){
  try {
    const response=await axios.put(`http://localhost:5000/api/users/${userid}`,user,{withCredentials: true, });
    // setUser(null);
    // setUserInfo(response.data);
        setUser(response.data); // Update the local `user` state
        setUserInfo(response.data); // Update the `userInfo` state with the latest data
         Swal.fire({
      title: "Success!",
      text: "User updated successfully",
      icon: "success",
      confirmButtonText: "OK",
    });

    
  } catch (error) {
     console.error("Error updating user:", error);
    
    // إظهار SweetAlert عند حدوث خطأ
    Swal.fire({
      title: "Error!",
      text: "Failed to update user",
      icon: "error",
      confirmButtonText: "OK",
    });
    
  }


}

const announcements=Announcements;

  // Sample announcements data
  // const announcements = [
  //   {
  //     id: 1,
  //     title: "Food Drive Campaign",
  //     description: "Looking for volunteers to help distribute food packages to families in need.",
  //     status: "Active",
  //     date: "Feb 20, 2025",
  //     responses: 12,
  //     image: "/api/placeholder/300/160"
  //   },
  //   {
  //     id: 2,
  //     title: "Education Fundraiser",
  //     description: "Raising funds to provide school supplies for underprivileged children.",
  //     status: "Pending",
  //     date: "Feb 15, 2025",
  //     responses: 8,
  //     image: "/api/placeholder/300/160"
  //   },
  //   {
  //     id: 3,
  //     title: "Medical Assistance",
  //     description: "Seeking medical professionals for free community health check-ups.",
  //     status: "Closed",
  //     date: "Jan 30, 2025",
  //     responses: 24,
  //     image: "/api/placeholder/300/160"
  //   },
  //   {
  //     id: 4,
  //     title: "Community Garden",
  //     description: "Join our initiative to create sustainable community gardens in urban areas.",
  //     status: "Active",
  //     date: "Feb 25, 2025",
  //     responses: 17,
  //     image: "/api/placeholder/300/160"
  //   }
  // ];

  // Slide functionality
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 320; // Card width + margin
      const currentScroll = sliderRef.current.scrollLeft;
      
      if (direction === 'left') {
        sliderRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
        });
        
        if (activeCardIndex > 0) {
          setActiveCardIndex(activeCardIndex - 1);
        }
      } else {
        sliderRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
        });
        
        if (activeCardIndex < 5 - 1) {
          setActiveCardIndex(activeCardIndex + 1);
        }
      }
    }
  };
  console.log(userInfo)

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case true: return 'bg-emerald-100 text-emerald-800';
      case false: return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* <h1>{userInfo}</h1> */}
        {/* Profile Section */}
          {!userInfo ? (
        <p className="text-center text-gray-500">Loading user data...</p>
      ) : (

        <div className="relative mb-20">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-r from-[#D0DDD0] to-[#AAB99A] rounded-xl transform -skew-y-2"></div>
          <div className="absolute top-6 left-6 w-full h-56 bg-gradient-to-r from-[#AAB99A] to-[#727D73] rounded-xl opacity-50 transform -skew-y-1"></div>
          
          {/* Content */}
          <div className="relative z-10 pt-24">
            <div className="bg-white rounded-xl shadow-xl px-8 py-10 transition-all duration-500 hover:shadow-2xl">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-500 hover:scale-105">
                    <img 
                      src={userInfo?.image || 'noimage'}
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* <button className="mt-4 px-6 py-2 bg-[#727D73] text-white rounded-full text-sm font-medium shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    Change Photo
                  </button> */}
                </div>
                
                {/* Profile Form */}
                <div className="flex-1">
                  <div className="flex items-center mb-8 gap-2">
                    <h2 className="text-2xl font-bold text-[#727D73]">Personal Information</h2>
                    <div className="h-1 flex-grow bg-[#D0DDD0] rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-[#727D73] mb-2 transition-all duration-300 group-hover:text-[#AAB99A]">
                        Full Name
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full p-3 bg-gray-50 border border-[#D0DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AAB99A] focus:border-[#AAB99A] transition-all duration-300"
                          value={user?.full_name || ''}
                        
                          onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AAB99A] transition-all duration-500 group-hover:w-full"></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-[#727D73] mb-2 transition-all duration-300 group-hover:text-[#AAB99A]">
                        Email Address
                      </label>
                      <div className="relative">
                        <input 
                          type="email" 
                          className="w-full p-3 bg-gray-50 border border-[#D0DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AAB99A] focus:border-[#AAB99A] transition-all duration-300"
                          value={user?.email || ''}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AAB99A] transition-all duration-500 group-hover:w-full"></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-[#727D73] mb-2 transition-all duration-300 group-hover:text-[#AAB99A]">
                        Current Password
                      </label>
                      <div className="relative">
                        <input 
                          type="password" 
                          className="w-full p-3 bg-gray-50 border border-[#D0DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AAB99A] focus:border-[#AAB99A] transition-all duration-300"
                          placeholder="Enter current password"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AAB99A] transition-all duration-500 group-hover:w-full"></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-[#727D73] mb-2 transition-all duration-300 group-hover:text-[#AAB99A]">
                        New Password
                      </label>
                      <div className="relative">
                        <input 
                          type="password" 
                          className="w-full p-3 bg-gray-50 border border-[#D0DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AAB99A] focus:border-[#AAB99A] transition-all duration-300"
                          placeholder="Enter new password"
                          onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AAB99A] transition-all duration-500 group-hover:w-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                    onClick={updateInfo}
                    className="px-8 py-3 bg-gradient-to-r from-[#727D73] to-[#AAB99A] text-white rounded-lg font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
{announcements && announcements.length > 0 ? (
  <div className="bg-white rounded-xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl">
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-[#727D73]">Your Announcement</h2>
        <div className="h-1 w-16 bg-[#AAB99A] rounded-full transition-all duration-500 hover:w-24"></div>
      </div>
    </div>
    
    {/* Single Card Display */}
    <div className="flex justify-center">
      <div className="w-full max-w-md group">
        <div className="h-full bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-xl transform group-hover:-translate-y-2">
          {/* Card Image with Overlay Gradient */}
          <div className="relative h-40 overflow-hidden">
            <img 
              src={announcements[0].image}
              alt={announcements[0].reason} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(announcements[0].verified)}`}>
                {announcements[0].verified}
              </span>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-[#727D73] transition-all duration-300 group-hover:text-[#AAB99A]">
                {announcements[0].reason}
              </h3>
              <span className="text-xs text-gray-500">{announcements[0].created_at}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {announcements[0].total_debt}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="relative overflow-hidden">
                <button className="text-sm font-medium px-4 py-1.5 rounded-lg bg-[#D0DDD0] text-[#727D73] transition-all duration-300 group-hover:bg-[#AAB99A] group-hover:text-white">
                  View Details
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#727D73] transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
) : (
  <h2>There is no announcement</h2>
)}
        {/* Announcements Section */}
      </div>
    </div>
  );
};

export default BeneficiaryProfile;


// import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

// const BeneficiaryProfile = () => {
//   const sliderRef = useRef(null);
//   const [activeCardIndex, setActiveCardIndex] = useState(0);
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const userid = useSelector((state) => state.UID.userId);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/api/users/${userid}`);
//         setUserInfo(response.data);
//       } catch (err) {
//         setError("Failed to fetch user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userid) {
//       fetchUserData();
//     }
//   }, [userid]);

//   // دالة التنقل بين الإعلانات
//   const scroll = (direction) => {
//     if (sliderRef.current) {
//       const scrollAmount = 320; 
//       const currentScroll = sliderRef.current.scrollLeft;

//       if (direction === 'left') {
//         sliderRef.current.scrollTo({ left: currentScroll - scrollAmount, behavior: 'smooth' });
//         setActiveCardIndex((prev) => Math.max(prev - 1, 0));
//       } else {
//         sliderRef.current.scrollTo({ left: currentScroll + scrollAmount, behavior: 'smooth' });
//         // setActiveCardIndex((prev) => Math.min(prev + 1, announcements.length - 1));
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-12">
        
//         {/* عرض رسالة تحميل أو خطأ إن وجدت */}
//         {loading ? (
//           <p className="text-center text-gray-600">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : userInfo ? (
//           <div>
//             <h2 className="text-2xl font-bold text-[#727D73]">Welcome, {userInfo.full_name}</h2>
//             <p className="text-gray-600">Email: {userInfo.email}</p>
//           </div>
//         ) : null}
        
//         {/* شريط تمرير الإعلانات */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mt-6">
//           <h2 className="text-2xl font-bold text-[#727D73] mb-4">Your Announcements</h2>
//           <div className="flex gap-3">
//             <button onClick={() => scroll('left')} disabled={activeCardIndex === 0} className="p-3 bg-gray-200 rounded-full">
//               ◀
//             </button>
//             {/* <button onClick={() => scroll('right')} disabled={activeCardIndex === announcements.length - 1} className="p-3 bg-gray-200 rounded-full">
//               ▶
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BeneficiaryProfile;
