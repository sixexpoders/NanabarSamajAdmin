import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const adminEmail = localStorage.getItem('adminEmail');
        const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/GetUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const filteredUserData = response.data.data.find(user => user.email === adminEmail);
        setUserData(filteredUserData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="mb-3">
            <h3>Profile</h3>
          </div>
          <form className="p-4 rounded shadow" style={{ backgroundColor: 'blur', border: '1px solid #ccc' }}>                  
            {/* Render user data if available, else show loading */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="username" >Name:</label>
                  <input type="text" className="form-control" id="username" value={userData?.username} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="fatherName">Father's Name:</label>
                  <input type="text" className="form-control" id="fatherName" value={userData?.father_name} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="surname">Surname:</label>
                  <input type="text" className="form-control" id="surname" value={userData?.surname} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber">Mobile Number:</label>
                  <input type="text" className="form-control" id="mobileNumber" value={userData?.mobile_number} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" value={userData?.email} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender">Gender:</label>
                  <input type="text" className="form-control" id="gender" value={userData?.gender} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="address">Address:</label>
                  <input type="text" className="form-control" id="address" value={userData?.address} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="city">City:</label>
                  <input type="text" className="form-control" id="city" value={userData?.city_name} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="state">State:</label>
                  <input type="text" className="form-control" id="state" value={userData?.state_name} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="country">Country:</label>
                  <input type="text" className="form-control" id="country" value={userData?.country_name} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="pincode">Pincode:</label>
                  <input type="text" className="form-control" id="pincode" value={userData?.pincode} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="sakh">Sakh:</label>
                  <input type="text" className="form-control" id="sakh" value={userData?.sakh_name} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="isTerms" >Is Terms:</label>
                  <input type="text" className="form-control" id="isTerms" value={userData?.is_terms ? 'Yes' : 'No'} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="isActive">Is Active:</label>
                  <input type="text" className="form-control" id="isActive" value={userData?.is_active ? 'Active' : 'Inactive'} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="isVerify">Is Verify:</label>
                  <input type="text" className="form-control" id="isVerify" value={userData?.is_verify ? 'Verified' : 'Not Verified'} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="isKarobariMember">Karobari Member:</label>
                  <input type="text" className="form-control" id="isKarobariMember" value={userData?.is_karobari_member ? 'Yes' : 'No'} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="role">Role:</label>
                  <input type="text" className="form-control" id="role" value={userData?.role_name} readOnly style={{ backgroundColor: 'blur' }} />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
