import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'


const Profile = () => {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate])

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
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  const userInfoStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  const columnStyle = {
    width: '23%',
    marginBottom: '20px',
  };

  const labelStyle = {
    fontWeight: 'bold'
  };

  const valueStyle = {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
    maxHeight: '5em', // Maximum height before text starts wrapping
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    lineClamp: 4, // Number of lines before text is truncated
  };

  return (
    <div className="container">
      {/* <h2 className="my-4" style={{ textAlign: 'center' }}>Admin Information</h2>
      <hr className="mb-4" /> */}
      <div style={userInfoStyle}>
        <div style={columnStyle}>
          <div className="mb-3">
            <label style={labelStyle}>Name:</label>
            <div>{loading ? 'Loading...' : (user ? `${user.username} ${user.father_name} ${user.surname}` : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>DOB:</label>
            <div style={valueStyle}>
              {loading
                ? 'Loading...'
                : user
                  ? new Date(user.dob).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) // Using 'en-GB' for the date format dd/mm/yyyy
                  : 'user not found'}
            </div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mother Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.mother_name : 'User not found')}</div>
          </div>

          <div className="mb-3">
            <label style={labelStyle}>Relation Type:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.relation_type_name : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Gender:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.gender : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mobile Number:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.mobile_number : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Email:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.email : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Marital:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.marital_name : 'User not found')}</div>
          </div>
              <div className="mb-3">
                <label style={labelStyle}>Created Date:</label>
                <div>
                  {loading
                    ? 'Loading...'
                    : user
                      ? new Date(user.created_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) // Using 'en-GB' for the date format dd/mm/yyyy
                      : 'user not found'}
                </div>
              </div>
              <div className="mb-3">
                <label style={labelStyle}>Updated Date:</label>
                <div>
                  {loading
                    ? 'Loading...'
                    : user
                      ? new Date(user.updated_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) // Using 'en-GB' for the date format dd/mm/yyyy
                      : 'user not found'}
                </div>
              </div>
        </div>
        <div style={columnStyle}>
          <div className="mb-3">
            <label style={labelStyle}>Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? `${user.address} ${user.city_name} ${user.state_name} ${user.country_name}` : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Village Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.village_name : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Sakh Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.sakh_name : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Occupation Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.occupation_address : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mama Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.mama_address : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Height-foot:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.height_foot : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Height-Inch:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.height_inch : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Weight:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.weight : 'User not found')}</div>
          </div>
        </div>
        <div style={columnStyle}>
          {/* Additional fields */}
          <div className="mb-3">
            <label style={labelStyle}>Designation:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.designation : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Company:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.company : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Blood-group:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.blood_group_name : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Occupation:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.occupation_name : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Annual Income:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.annual_income : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Hobbies:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.hobbies : 'User not found')}</div>
          </div>
          {/* End of additional fields */}
        </div>
        <div style={columnStyle}>
          <div className="mb-3">
            <label style={labelStyle}>Is Active:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? (user.is_active ? 'Active' : 'Inactive') : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Is Verify:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? (user.is_verify !== null ? (user.is_verify ? 'Verified' : 'Unverified') : '-') : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Is Admin Approve:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? (user.is_admin_approve !== null ? (user.is_admin_approve ? 'Approved' : 'Unapproved') : '-') : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Is Karobari Member:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? (user.is_admin_approve !== null ? (user.is_admin_approve ? 'Approved' : 'DisApproved') : '-') : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Role Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.role_name : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mama Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.mama_name : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>About Me:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.about_me : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>You Live-Abroad:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.you_live_abroad : 'User not found')}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Piyar:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : (user ? user.Piyar : 'User not found')}</div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Link to="/Home/Users" className="btn btn-primary">Back To Users Page</Link>
      </div>
    </div>
  );
};

export default Profile;
