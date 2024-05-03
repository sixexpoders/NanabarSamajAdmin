import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CommonDataTable from '../Common/DataTable'; // Import the CommonDataTable component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfo, faAdd, faSearchLocation,faSpinner } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../../assets/images/career.png';
import { Link } from 'react-router-dom';

const Career = () => {
    const [CareerData, setCareerData] = useState([]);
    const [loading, setloading] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddCareerForm, setShowAddCareerForm] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteCareerId, setDeleteCareerId] = useState(null);
    // const [villages, setVillages] = useState([]);

    const [businessCategory, setbusinessCategory] = useState([]);
    const [occupation, setOccupation] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchCareerData = async () => {
        try {
            setloading(true);
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCareers');
            const modifiedData = response.data.data.map(item => ({
                ...item,
                id: item.id
            }));
            setCareerData(modifiedData);
            setloading(false);
        } catch (error) {
            console.error('Error fetching Career data:', error);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate])

    useEffect(() => {
        fetchCareerData();
        fetchOccupations();
        fetchBusinessCategory();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCountries');
            const data = response.data.data;
            setCountry(data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchStates = async (countryId) => {
        try {
            const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetState?country_id=${countryId}`);
            setState(response.data.data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };
    const fetchCities = async (stateId) => {
        try {
            const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCities?state_id=${stateId}`);
            setCity(response.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };



    // const fetchVillages = async () => {
    //     try {
    //         const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetVillage');
    //         const villagesData = response.data.data;
    //         setVillages(villagesData);
    //     } catch (error) {
    //         console.error('Error fetching villages:', error);
    //     }
    // };

    const fetchOccupations = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetOccupations');
            const Data = response.data.data;
            setOccupation(Data);
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };

    const fetchBusinessCategory = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetBusinessCategory');
            const Data = response.data.data;
            setbusinessCategory(Data);
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };


    const refreshCareerList = () => {
        fetchCareerData();
    };

    const handleAddClick = () => {
        setShowAddCareerForm(true);
    };

    const handleEditClick = (CareerItem) => {
        setSelectedCareer(CareerItem);
        setShowEditForm(true);
    };

    const handleDeleteClick = (CareerItemId) => {
        setDeleteCareerId(CareerItemId);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            await deleteCareer(deleteCareerId);
            setCareerData(CareerData.filter(item => item.id !== deleteCareerId));
            setShowDeleteConfirmation(false);
            setSuccessMessage('Career deleted successfully');
        } catch (error) {
            console.error('Error deleting Career:', error);
        }
    };

    const deleteCareer = async (CareerId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/DeleteCareer?id=${CareerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error deleting Career:', error);
            throw error;
        }
    };

    const columns = [
        {
            title: 'Concern Name',
            data: 'concern_name',
            render: (item) => {
                const handleImageError = (event) => {
                    event.target.onerror = null; // Prevent infinite loop in case the default image also fails to load
                    event.target.src = defaultImage;
                };

                return (
                    <>
                        <div>
                            <img
                                src={`https://expodersfour-001-site1.ltempurl.com/GetImage/${item.image}`}
                                onError={handleImageError}
                                style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }}
                            />
                            {item.concern_name}
                        </div>
                    </>
                );
            }
        },
        { title: 'Occupation', data: 'occupation_name' },
        { title: 'Career Name', data: 'career_name' },
        // { title: 'Career Details', data: 'career_details' },
        { title: 'Business Category', data: 'business_category_name' },
        {
            title: 'Address',
            render: (item) => `${item.address}, ${item.city_name}, ${item.state_name}, ${item.country_name}`
        },
        { title: 'Contact Number', data: 'contact_number_1' },
        { title: 'Website', data: 'website' },
        { title: 'Email', data: 'email' },
        {
            title: 'Status',
            data: 'is_active',
            render: (rowData) => (
                <div className="d-flex justify-content-center">
                    <span className={`badge rounded-pill ${rowData.is_active ? 'bg-info' : 'bg-danger'}`}>
                        {rowData.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
            )
        },
        {
            title: 'Actions',
            render: (item) => (
                <div className="d-flex">
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleEditClick(item)} title="Update">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleDeleteClick(item.id)} title="Delete">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link to={`/Career/Details/${item.id}`} className="btn" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} title="Info">
                        <FontAwesomeIcon icon={faInfo} />
                    </Link>
                </div>
            )
        }
    ];


    const AddForm = ({ onClose, refreshCareerData, occupation, businessCategory }) => {
        const [formData, setFormData] = useState({
            concern_name: '',
            lookup_occupation_id: '',
            career_name: '',
            career_details: '',
            lookup_business_category_id: '',
            address: '',
            lookup_city_id: '',
            lookup_country_id: '',
            lookup_state_id: '',
            zipcode: '',
            contact_number_1: '',
            contact_number_2: '',
            website: '',
            email: '',
            facebook_link: '',
            instagram_link: '',
            career_image: '',
            is_active: true
        });

        const [country, setCountries] = useState([]);
        const [state, setStates] = useState([]);
        const [city, setCities] = useState([]);



        useEffect(() => {
            // Fetch countries
            axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCountries')
                .then(response => {
                    setCountries(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching countries:', error);
                });
        }, []);

        useEffect(() => {
            // Fetch states based on the selected country
            if (formData.lookup_country_id) {
                axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetState?country_id=${formData.lookup_country_id}`)
                    .then(response => {
                        setStates(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error fetching states:', error);
                    });
            }
        }, [formData.lookup_country_id]);


        useEffect(() => {
            // Fetch cities based on the selected state
            if (formData.lookup_state_id) {
                axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCities?state_id=${formData.lookup_state_id}`)
                    .then(response => {
                        setCities(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error fetching cities:', error);
                    });
            }
        }, [formData.lookup_state_id]);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const formDataCopy = new FormData();
                for (const key in formData) {
                    formDataCopy.append(key, formData[key]);
                }

                const token = localStorage.getItem('adminToken');
                const response = await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/AddCareer', formDataCopy, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Career added successfully:', response.data.data);
                refreshCareerData();
                setSuccessMessage('Career added successfully');
                onClose();
            } catch (error) {
                console.error('Error adding Career:', error);
            }
        };

        return (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Career</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Concern Name</label>
                                    <input type="text" className="form-control" name="concern_name" value={formData.concern_name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Occupation</label>
                                    <select className="form-control" name="lookup_occupation_id" value={formData.lookup_occupation_id} onChange={handleInputChange} required>
                                        <option value="">Select Occupation</option>
                                        {occupation.map((o) => (
                                            <option key={o.id} value={o.id}>{o.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Career Name</label>
                                    <input type="text" className="form-control" name="career_name" value={formData.career_name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Career Details</label>
                                    <input type="text" className="form-control" name="career_details" value={formData.career_details} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Business Category</label>
                                    <select className="form-control" name="lookup_business_category_id" value={formData.lookup_business_category_id} onChange={handleInputChange} required>
                                        <option value="">Select Business Category</option>
                                        {businessCategory.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <select className="form-control" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange} required>
                                        <option value="">Select Country</option>
                                        {country.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">State</label>
                                    <select className="form-control" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange} required>
                                        <option value="">Select State</option>
                                        {state.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <select className="form-control" name="lookup_city_id" value={formData.lookup_city_id} onChange={handleInputChange} required>
                                        <option value="">Select City</option>
                                        {city.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Zipcode</label>
                                    <input type="text" className="form-control" name="zipcode" value={formData.zipcode} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Number 1</label>
                                    <input type="text" className="form-control" name="contact_number_1" value={formData.contact_number_1} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Number 2</label>
                                    <input type="text" className="form-control" name="contact_number_2" value={formData.contact_number_2} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Website</label>
                                    <input type="text" className="form-control" name="website" value={formData.website} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Facebook Link</label>
                                    <input type="text" className="form-control" name="facebook_link" value={formData.facebook_link} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Instagram Link</label>
                                    <input type="text" className="form-control" name="instagram_link" value={formData.instagram_link} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Career Image</label>
                                    <input type="file" className="form-control" name="career_image" onChange={handleInputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const UpdateForm = ({ CareerId, CareerItem, onClose, occupation, businessCategory }) => {
        const [formData, setFormData] = useState({
            id: CareerItem.id || '',
            concern_name: CareerItem.concern_name || '',
            lookup_occupation_id: CareerItem.lookup_occupation_id || '',
            career_name: CareerItem.career_name || '',
            career_details: CareerItem.career_details || '',
            lookup_business_category_id: CareerItem.lookup_business_category_id || '',
            address: CareerItem.address || '',
            lookup_city_id: CareerItem.lookup_city_id || '',
            lookup_country_id: CareerItem.lookup_country_id || '',
            lookup_state_id: CareerItem.lookup_state_id || '',
            zipcode: CareerItem.zipcode || '',
            contact_number_1: CareerItem.contact_number_1 || '',
            contact_number_2: CareerItem.contact_number_2 || '',
            website: CareerItem.website || '',
            email: CareerItem.email || '',
            facebook_link: CareerItem.facebook_link || '',
            instagram_link: CareerItem.instagram_link || '',
            career_image: CareerItem.career_image || '',
            is_active: CareerItem.is_active || true
        });


        const [country, setCountries] = useState([]);
        const [state, setStates] = useState([]);
        const [city, setCities] = useState([]);



        useEffect(() => {
            // Fetch countries
            axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCountries')
                .then(response => {
                    setCountries(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching countries:', error);
                });
        }, []);

        useEffect(() => {
            // Fetch states based on the selected country
            if (formData.lookup_country_id) {
                axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetState?country_id=${formData.lookup_country_id}`)
                    .then(response => {
                        setStates(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error fetching states:', error);
                    });
            }
        }, [formData.lookup_country_id]);


        useEffect(() => {
            // Fetch cities based on the selected state
            if (formData.lookup_state_id) {
                axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCities?state_id=${formData.lookup_state_id}`)
                    .then(response => {
                        setCities(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error fetching cities:', error);
                    });
            }
        }, [formData.lookup_state_id]);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {

                const token = localStorage.getItem('adminToken');
                const response = await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/UpdateCareer?id=${CareerId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Career updated successfully:', response.data.data);
                refreshCareerList();
                setSuccessMessage('Career updated successfully');
                onClose(); // Pass the updated Career item to the onClose callback
            } catch (error) {
                console.error('Error updating Career:', error);
            }
        };

        return (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Career</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Concern Name</label>
                                    <input type="text" className="form-control" name="concern_name" value={formData.concern_name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Occupation</label>
                                    <select className="form-control" name="lookup_occupation_id" value={formData.lookup_occupation_id} onChange={handleInputChange} required>
                                        <option value="">Select Occupation</option>
                                        {occupation.map((o) => (
                                            <option key={o.id} value={o.id}>{o.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Career Name</label>
                                    <input type="text" className="form-control" name="career_name" value={formData.career_name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Career Details</label>
                                    <input type="text" className="form-control" name="career_details" value={formData.career_details} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Business Category</label>
                                    <select className="form-control" name="lookup_business_category_id" value={formData.lookup_business_category_id} onChange={handleInputChange} required>
                                        <option value="">Select Business Category</option>
                                        {businessCategory.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <select className="form-control" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange} required>
                                        <option value="">Select Country</option>
                                        {country.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">State</label>
                                    <select className="form-control" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange} required>
                                        <option value="">Select State</option>
                                        {state.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <select className="form-control" name="lookup_city_id" value={formData.lookup_city_id} onChange={handleInputChange} required>
                                        <option value="">Select City</option>
                                        {city.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Zipcode</label>
                                    <input type="text" className="form-control" name="zipcode" value={formData.zipcode} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Number 1</label>
                                    <input type="text" className="form-control" name="contact_number_1" value={formData.contact_number_1} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Number 2</label>
                                    <input type="text" className="form-control" name="contact_number_2" value={formData.contact_number_2} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Website</label>
                                    <input type="text" className="form-control" name="website" value={formData.website} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Facebook Link</label>
                                    <input type="text" className="form-control" name="facebook_link" value={formData.facebook_link} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Instagram Link</label>
                                    <input type="text" className="form-control" name="instagram_link" value={formData.instagram_link} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Career Image</label>
                                    <input type="file" className="form-control" name="career_image" onChange={handleInputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const dummyRenderRow = (rowData, rowIndex) => {
        return (
            <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                        {/* For status field */}
                        {column.data === 'is_active' ? (
                            <div className="d-flex justify-content-center">
                                <span className={`badge rounded-pill ${rowData.is_active ? 'bg-info' : 'bg-danger'}`}>
                                    {rowData.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        ) : (
                            // For other columns
                            column.render ? column.render(rowData) : rowData[column.data]
                        )}
                    </td>
                ))}
            </tr>
        );
    };




    return (
        <div className="container">
            <h2>Career</h2>
            <div className="position-relative">
            <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add Career</button>
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                </div>
            )}
             {loading ? (
                    <div style={{
                        position: 'fixed',
                        top: '52%',
                        left: '57%',
                        left: '57%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em' }} />
                    </div>
                ) : (
            <CommonDataTable
                data={CareerData}
                columns={columns}
                className="table-bordered"
                entitiesPerPageOptions={[5, 10, 25, 50, 100]}
                defaultEntitiesPerPage={10}
                renderRow={dummyRenderRow} // Provide the dummy renderRow function
            />
                )}
            {showAddCareerForm && (
                <AddForm
                    refreshCareerData={refreshCareerList}
                    onClose={() => setShowAddCareerForm(false)}
                    // villages={villages}

                    businessCategory={businessCategory}
                    occupation={occupation}
                />
            )}
            {showEditForm && selectedCareer && (
                <UpdateForm
                    CareerId={selectedCareer.id}
                    CareerItem={selectedCareer}
                    onClose={() => setShowEditForm(false)}
                    businessCategory={businessCategory}
                    occupation={occupation} />
            )}
            {showDeleteConfirmation && deleteCareerId && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this {CareerData.find(career => career.id === deleteCareerId).concern_name}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmation}>Delete</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Career;