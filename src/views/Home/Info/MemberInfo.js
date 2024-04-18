import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Memberinfo = () => {
  const { id } = useParams();
  const [member, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMemberById = async (MemberId) => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Member/GetById?id=${MemberId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setMemberData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Member by ID:', error);
        setLoading(false);
      }
    };

    if (id) {
      getMemberById(id);
    }
  }, [id]);

  const MemberInfoStyle = {
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
      <h2 className="my-4" style={{ textAlign: 'center' }}>Member Information</h2>
      <div style={MemberInfoStyle}>
        <div className="mb-3">
          <label style={labelStyle}>Relation Type:</label>
          <div>{loading ? 'Loading...' : (member ? member.relationType : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Name:</label>
          <div>{loading ? 'Loading...' : (member ? member.name : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Surname:</label>
          <div>{loading ? 'Loading...' : (member ? member.surname : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Father/Husband Name:</label>
          <div>{loading ? 'Loading...' : (member ? member.father_or_husband_name : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Gender:</label>
          <div>{loading ? 'Loading...' : (member ? member.gender : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Phone Number:</label>
          <div>{loading ? 'Loading...' : (member ? member.phone_number : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Email:</label>
          <div>{loading ? 'Loading...' : (member ? member.email : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Date of Birth:</label>
          <div>{loading ? 'Loading...' : (member ? member.dob : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Age:</label>
          <div>{loading ? 'Loading...' : (member ? member.age : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Village:</label>
          <div>{loading ? 'Loading...' : (member ? member.village : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Sakh:</label>
          <div>{loading ? 'Loading...' : (member ? member.sakh : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Address:</label>
          <div>{loading ? 'Loading...' : (member ? member.address : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>City:</label>
          <div>{loading ? 'Loading...' : (member ? member.city : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Country:</label>
          <div>{loading ? 'Loading...' : (member ? member.country : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>State:</label>
          <div>{loading ? 'Loading...' : (member ? member.state : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Marital Type:</label>
          <div>{loading ? 'Loading...' : (member ? member.maritalType : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Education Type:</label>
          <div>{loading ? 'Loading...' : (member ? member.educationType : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Education Sub Type:</label>
          <div>{loading ? 'Loading...' : (member ? member.educationSubType : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Occupation:</label>
          <div>{loading ? 'Loading...' : (member ? member.occupation : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Designation:</label>
          <div>{loading ? 'Loading...' : (member ? member.designation : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Company:</label>
          <div>{loading ? 'Loading...' : (member ? member.company : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Occupation Address:</label>
          <div>{loading ? 'Loading...' : (member ? member.occupation_address : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Mama Name:</label>
          <div>{loading ? 'Loading...' : (member ? member.mama_name : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Blood Group:</label>
          <div>{loading ? 'Loading...' : (member ? member.blood_group : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Pragatimandal:</label>
          <div>{loading ? 'Loading...' : (member ? member.pragatimandal : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Height:</label>
          <div>{loading ? 'Loading...' : (member ? member.height : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Weight:</label>
          <div>{loading ? 'Loading...' : (member ? member.weight : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Interested in Matrimonial:</label>
          <div>{loading ? 'Loading...' : (member ? member.interested_matrimonial : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Interested in Blood Donation:</label>
          <div>{loading ? 'Loading...' : (member ? member.interested_blood_donation : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>About Me:</label>
          <div>{loading ? 'Loading...' : (member ? member.about_me : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Status:</label>
          <div>{loading ? 'Loading...' : (member ? member.status : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Admin Approval:</label>
          <div>{loading ? 'Loading...' : (member ? member.admin_approval : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Living Abroad:</label>
          <div>{loading ? 'Loading...' : (member ? member.living_abroad : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>User Name:</label>
          <div>{loading ? 'Loading...' : (member ? member.user_name : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Hobbies:</label>
          <div>{loading ? 'Loading...' : (member ? member.hobbies : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Mama Address:</label>
          <div>{loading ? 'Loading...' : (member ? member.mama_address : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Mother Name:</label>
          <div>{loading ? 'Loading...' : (member ? member.mother_name : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Piyar:</label>
          <div>{loading ? 'Loading...' : (member ? member.piyar : 'Member not found')}</div>
        </div>
        <div className="mb-3">
          <Link to="/Home/Users" className="btn btn-primary">Back To Users Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Memberinfo;
