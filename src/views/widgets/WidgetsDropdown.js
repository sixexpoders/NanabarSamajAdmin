import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

const WidgetsDropdown = () => {
  const [counts, setCounts] = useState({
    users: 0,
    members: 0,
    karobari_members: 0,
    inquiry: 0
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('adminToken');
  
        const response = await fetch('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/GetCount', {
          method: 'GET',
          headers: {
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        const data = responseData.data;
        setCounts({
          users: data.user_total || 0,
          members: data.member_total || 0,
          karobari_members: data.karobari_total || 0,
          inquiry: data.inquiry_total || 0
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // Animation for the total user count
  const { users: animatedUsers } = useSpring({
    users: counts.users,
    from: { users: 0 },
    config: { duration: 1500 },
  });
  const { members: animatedmembers } = useSpring({
    members: counts.members,
    from: { members: 0 },
    config: { duration: 1500 },
  });
  const { karobari_members: animatedkarobari } = useSpring({
    karobari_members: counts.karobari_members,
    from: { karobari_members: 0 },
    config: { duration: 1500 },
  });
  const { inquiry: animatedinquiry } = useSpring({
    inquiry: counts.inquiry,
    from: { inquiry: 0 },
    config: { duration: 1500 },
  });

  const cardStyle = {
    height: '164px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', // Adjust the shadow effect here
  };

  return (
    <div className="row">
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card bg-primary shadow h-100 py-2" style={cardStyle}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                  Total Users
                </div>
                <animated.div className="h5 mb-0 font-weight-bold text-white">{animatedUsers.interpolate(val => Math.floor(val))}</animated.div>
              </div>
              <div className="col-auto">
                <i className="bi bi-people text-white" style={{ fontSize: '4rem' }}></i>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <Link to="/Home/Users" className="btn btn-sm btn-outline-light">More Info</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card bg-info shadow h-100 py-2" style={cardStyle}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                  Total Members
                </div>
                <animated.div className="h5 mb-0 font-weight-bold text-white">{animatedmembers.interpolate(val => Math.floor(val))}</animated.div>
              </div>
              <div className="col-auto">
                <i className="bi bi-people text-white" style={{ fontSize: '4rem' }}></i>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <button className="btn btn-sm btn-outline-light">More Info</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card bg-success shadow h-100 py-2" style={cardStyle}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-white text-uppercase mb-0)">
                  Total Karobari Members
                </div>
                <animated.div className="h5 mb-0 font-weight-bold text-white">{animatedkarobari.interpolate(val => Math.floor(val))}</animated.div>
              </div>
              <div className="col-auto">
                <i className="bi bi-people text-white" style={{ fontSize: '4rem' }}></i>
              </div>
              <div className="row mt-3">
              <div className="col">
                <button className="btn btn-sm btn-outline-light">More Info</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card bg-danger shadow h-100 py-2" style={cardStyle}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                  Total Inquiry
                </div>
                <animated.div className="h5 mb-0 font-weight-bold text-white">{animatedinquiry.interpolate(val => Math.floor(val))}</animated.div>
              </div>
              <div className="col-auto">
              <i className="bi bi-question-circle-fill text-white" style={{ fontSize: '4rem' }}></i>
              </div>
              <div className="row mt-3">
              <div className="col">
                <button className="btn btn-sm btn-outline-light">More Info</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetsDropdown;
