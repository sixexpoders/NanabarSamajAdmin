import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserById = async (userId) => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/User/GetById?id=${userId}`, {
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

  const displayUserInfo = (userInfo) => {
    return userInfo !== null ? userInfo : 'NA';
  };

  return (
    <div className="container">
      <div style={userInfoStyle}>
        <div style={columnStyle}>
          <div className="mb-3">
            <label style={labelStyle}>Name:</label>
            <div>{loading ? 'Loading...' : displayUserInfo(`${user.username} ${user.father_name} ${user.surname}`)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>DOB:</label>
            <div style={valueStyle}>
              {loading ? 'Loading...' : displayUserInfo(user ? new Date(user.updated_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null)}
            </div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mother Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.mother_name : null)}</div>
          </div>

          <div className="mb-3">
            <label style={labelStyle}>Relation Type:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.relation_type_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Gender:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.gender : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mobile Number:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.mobile_number : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Email:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.email : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Marital:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.marital_name : null)}</div>
          </div>
          <div>
            <div className="mb-4">
              <label style={labelStyle}>Created Date:</label>
              <div>
                {loading
                  ? 'Loading...'
                  : displayUserInfo(user ? new Date(user.created_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null)}
              </div>
            </div>
            
          </div>

        </div>
        <div style={columnStyle}>
          <div className="mb-3">
            <label style={labelStyle}>Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? `${user.address} ${user.city_name} ${user.state_name} ${user.country_name}` : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Village Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.village_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Sakh Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.sakh_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Occupation Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.occupation_address : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mama Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.mama_address : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Height-foot:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.height_foot : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Height-Inch:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.height_inch : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Weight:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.weight : null)}</div>
          </div>
        </div>
        <div style={columnStyle}>
          {/* Additional fields */}
          <div className="mb-3">
            <label style={labelStyle}>Designation:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.designation : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Company:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.company : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Blood-group:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.blood_group_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Occupation:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.occupation_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Annual Income:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.annual_income : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Hobbies:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.hobbies : null)}</div>
          </div>
          {/* End of additional fields */}
        </div>
        <div style={columnStyle}>
          <div className="mb-3">
            <label style={labelStyle}>Is Active:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? (user.is_active ? 'Active' : 'Inactive') : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Is Verify:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? (user.is_verify !== null ? (user.is_verify ? 'Verified' : 'Unverified') : 'NA') : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Is Admin Approve:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? (user.is_admin_approve !== null ? (user.is_admin_approve ? 'Approved' : 'Unapproved') : 'NA') : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Is Karobari Member:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.is_karobari_member.toString() : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Role Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.role_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mama Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.mama_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>About Me:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.about_me : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>You Live-Abroad:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? (user.you_live_abroad !== null ? (user.you_live_abroad ? 'Yes' : 'No') : '-') : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Piyar:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayUserInfo(user ? user.piyar : null)}</div>
          </div>
        </div>
      </div>
      {/* <div className="mb-3">
        <Link to="/Home/Users" className="btn btn-primary">Back To Users Page</Link>
      </div> */}
    </div>
  );
};

export default UserInfo;
