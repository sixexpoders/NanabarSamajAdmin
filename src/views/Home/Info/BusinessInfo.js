import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Businessinfo = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBusinessById = async (businessId) => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(
          `https://expodersfour-001-site1.ltempurl.com/api/Business/GetById?id=${businessId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setBusiness(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Business by ID:', error);
        setLoading(false);
      }
    };  

    if (id) {
      getBusinessById(id);
    }
  }, [id]);

  const labelStyle = {
    fontWeight: 'bold',
    display: 'inline-block',
    width: '120px',
    marginBottom: '5px',
    whiteSpace: 'nowrap'
  };
  

  const valueStyle = {
    display: 'inline-block',
    marginBottom: '5px',
    marginLeft: '30px'
  };

  const displayData = (data) => {
    return data !== null ? data : 'NA';
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div>
            <label style={labelStyle}>Concern-Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.concern_name : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Business-Name:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.business_name : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Business-Details:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.business_details : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Business-Category:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.business_category_name : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Address:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.address : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Country:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.country_name : null)}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <label style={labelStyle}>State:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.state_name : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>City:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.city_name : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Zipcode:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.zipcode : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Contact-Number-1:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.contact_number_1 : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Contact-Number-2:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.contact_number_2 : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Website:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.website : null)}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <label style={labelStyle}>Email:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.email : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Facebook-link:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.facebook_link : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div>
            <label style={labelStyle}>Instagram-link:</label>
            <div style={valueStyle}>{loading ? 'Loading...' : displayData(business ? business.instagram_link : null)}</div>
          </div>
          <div style={{ marginBottom: '10px' }}></div>
          <div className="mb-3">
              <label style={labelStyle}>Created Date:</label>
              <div>
                {loading
                  ? 'Loading...'
                  : displayData(business ? new Date(business.created_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null)}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Businessinfo;
