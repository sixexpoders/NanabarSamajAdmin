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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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

  const displayMemberInfo = (info) => {
    return info !== null ? info : 'NA';
  };

  return (
    <div className="container">
      <h2 className="my-4" style={{ textAlign: 'center' }}>Member Information</h2>
      <hr className="mb-4" />
      <div style={MemberInfoStyle}>
        <div style={{ width: '25%', flexBasis: '25%', marginBottom: '20px' }}>
          <div className="mb-3">
            <label style={labelStyle}>Relation Type:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.relation_type : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Surname:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.surname : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Father/Husband Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.father_or_husband_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Gender:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.gender : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Age:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.age : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>User Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.user_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mama Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.mama_name : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mother Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.mother_name : null)}</div>
          </div>
        </div>
        <div style={{ width: '25%', flexBasis: '25%', marginBottom: '20px' }}>
          <div className="mb-3">
            <label style={labelStyle}>Phone Number:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.phone_number : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Email:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.email : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Date of Birth:</label>
            <div style={valueStyle}>
              {loading
                ? 'Loading...'
                : member
                  ? new Date(member.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                  : 'Member not found'}
            </div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Height:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.height : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Weight:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.weight : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Hobbies:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.hobbies : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>About Me:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.about_me : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Created Date:</label>
            <div style={valueStyle}>
              {loading
                ? 'Loading...'
                : member
                  ? new Date(member.created_on).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                  : 'Member not found'}
            </div>
          </div>
        </div>
        <div style={{ width: '25%', flexBasis: '25%', marginBottom: '20px' }}>
          <div className="mb-3">
            <label style={labelStyle}>City:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.city : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Country:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.country : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>State:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.state : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Village:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.village : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Sakh:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.sakh : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.address : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Mama Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.mama_address : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Occupation Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.occupation_address : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Piyar:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.piyar : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Living Abroad:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? (member.you_live_abroad !== null ? (member.you_live_abroad ? 'Yes' : 'No') : '-') : null)}</div>
          </div>
        </div>
        <div style={{ width: '25%', marginBottom: '20px' }}>
          <div className="mb-3">
            <div className="mb-3">
              <label style={labelStyle}>Marital Type:</label>
              <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.marital_type : null)}</div>
            </div>
            <label style={labelStyle}>Education Type:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.education_type : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Education Sub Type:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.education_sub_type : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Occupation:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.occupation : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Designation:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.designation : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Company:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.company : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Blood Group:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.blood_group : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Pragatimandal:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? member.pragatimandal : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Interested in Matrimonial:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? (member.interested_matrimonial !== null ? (member.interested_matrimonial ? 'Yes' : 'No') : '-') : null)}</div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Interested in Blood Donation:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayMemberInfo(member ? (member.interested_blood_donation !== null ? (member.interested_blood_donation ? 'Yes' : 'No') : '-') : null)}</div>

          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Memberinfo;
