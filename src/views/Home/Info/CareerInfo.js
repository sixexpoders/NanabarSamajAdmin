import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Careerinfo = () => {
    const { id } = useParams();
    const [career, setCareer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCareerById = async (careerId) => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(
                    `https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCareerById?id=${careerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setCareer(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching career by ID:', error);
                setLoading(false);
            }
        };

        if (id) {
            getCareerById(id);
        }
    }, [id]);

    const CareerInfoStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    };

    const labelStyle = {
        fontWeight: 'bold'
    };

    const displayData = (data) => {
        return data !== null ? data : 'NA';
    };

    return (
        <div className="container">
            <div style={CareerInfoStyle}>
                <div style={{ width: '25%', flexBasis: '25%', marginBottom: '20px' }}>
                    <div className="mb-4">
                        <label style={labelStyle}>Concern Name:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.concern_name : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Occupation:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.occupation_name : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Career Name:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.career_name : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Career Details:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.career_details : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Business Category:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.business_category_name : null)}</div>
                    </div>
                </div>
                <div style={{ width: '25%', flexBasis: '25%', marginBottom: '20px' }}>
                    <div className="mb-4">
                        <label style={labelStyle}>Address:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.address : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>City:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.city_name : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Country:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.country_name : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>State:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.state_name : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Zipcode:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.zipcode : null)}</div>
                    </div>
                </div>
                <div style={{ width: '25%', flexBasis: '25%', marginBottom: '20px' }}>
                    <div className="mb-4">
                        <label style={labelStyle}>Contact Number 1:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.contact_number_1 : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Contact Number 2:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.contact_number_2 : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Website:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.website : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Email:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.email : null)}</div>
                    </div>

                </div>
                <div style={{ width: '25%', flexBasis: '25%', marginBottom: '20px' }}>
                    <div className="mb-4">
                        <label style={labelStyle}>Facebook Link:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.facebook_link : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Instagram Link:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.instagram_link : null)}</div>
                    </div>
                    <div className="mb-4">
                        <label style={labelStyle}>Active:</label>
                        <div>{loading ? 'Loading...' : displayData(career ? career.is_active.toString() : null)}</div>
                    </div>
                    <div className="mb-3">
                        <label style={labelStyle}>Created Date:</label>
                        <div>
                            {loading
                                ? 'Loading...'
                                : displayData(career ? new Date(career.created_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null)}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label style={labelStyle}>Updated Date:</label>
                        <div>
                            {loading
                                ? 'Loading...'
                                : displayData(career ? new Date(career.updated_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null)}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="mb-4">
                <Link to="/Home/Career" className="btn btn-primary">Back To Career Page</Link>
            </div> */}
        </div>
    );
};

export default Careerinfo;
