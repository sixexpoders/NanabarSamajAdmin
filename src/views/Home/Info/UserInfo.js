import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserById = async (userId) => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`http://nanabarsamaj-001-site1.htempurl.com/api/User/GetById?id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        setLoading(false);
      }
    };

    if (id) {
      getUserById(id);
    }
  }, [id]);

  const userInfoStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const labelStyle = {
    fontWeight: 'bold'
  };

  return (
    <div className="container">
      <h2 className="my-4" style={{ textAlign: 'center' }}>User Information</h2>
      <div style={userInfoStyle}>
        <div className="mb-3">
          <label style={labelStyle}>Name:</label>
          <div>{loading ? 'Loading...' : (user ? `${user.username} ${user.father_name} ${user.surname}` : 'User not found')}</div>
        </div>

        <div className="mb-3">
          <label style={labelStyle}>Mobile Number:</label>
          <div>{loading ? 'Loading...' : (user ? user.mobile_number : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Email:</label>
          <div>{loading ? 'Loading...' : (user ? user.email : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Gender:</label>
          <div>{loading ? 'Loading...' : (user ? user.gender : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Address:</label>
          <div>{loading ? 'Loading...' : (user ? `${user.address} ${user.city_name} ${user.state_name} ${user.country_name}` : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Sakh Name:</label>
          <div>{loading ? 'Loading...' : (user ? user.sakh_name : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Is Active:</label>
          <div>{loading ? 'Loading...' : (user ? user.is_active.toString() : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Is Verify:</label>
          <div>{loading ? 'Loading...' : (user ? user.is_verify.toString() : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Is Admin Approve:</label>
          <div>{loading ? 'Loading...' : (user ? user.is_admin_approve.toString() : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Is Karobari Member:</label>
          <div>{loading ? 'Loading...' : (user ? user.is_karobari_member.toString() : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Role Name:</label>
          <div>{loading ? 'Loading...' : (user ? user.role_name : 'User not found')}</div>
        </div>
        <div className="mb-3">
          <Link to="/Home/Users" className="btn btn-primary">Back To Users Page</Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
