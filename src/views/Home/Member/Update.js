import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Using faTimes instead of faClose

const updateMemberForm = () => {
    const { userId, memberId } = useParams();
    // const [member, setMemberData] = useState({})
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // id: memberId,
        // user_id: userId,
        // lookup_relation_type_id: '', // Use optional chaining here
        // surname: '',
        // name: '',
        // father_or_husband_name: '',
        // gender: '',
        // phone_number: '',
        // email: '',
        // dob: '',
        // age: '',
        // lookup_village_id: '',
        // lookup_state_id: '',
        // lookup_sakh_id: '',
        // address: '',
        // lookup_city_id: '',
        // lookup_country_id: '',
        // lookup_marital_type_id: '',
        // lookup_career_id: '',
        // lookup_education_sub_type_id: '',
        // lookup_education_type_id: '',
        // lookup_occupation_id: '',
        // designation: '',
        // company: '',
        // occupation_address: '',
        // mama_name: '',
        // lookup_blood_group_id: '',
        // lookup_pragatimandal_id: '',
        // height_foot: '',
        // height_inch: '',
        // weight: '',
        // image: '',
        // interested_matrimonial: false,
        // interested_blood_donate: false,
        // about_me: '',
        // is_active: true,
        // is_admin_approve: true,
        // created_by_id: '',
        // you_live_abroad: '',
        // mama_address: '',
        // mother_name: '',
        // hobbies: ''
    });

    const [oldImage, setOldImage] = useState(null);

    useEffect(() => {
        const fetchMemberById = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Member/GetById?id=${memberId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFormData(response.data.data);

                // Fetch and set the old image using member.image as a parameter
                const imageResponse = await axios.get(`https://expodersfour-001-site1.ltempurl.com/GetImage/${response.data.data.image}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: 'blob' // Set the responseType to 'blob' for binary data
                });

                // Convert the blob to a data URL
                const reader = new FileReader();
                reader.readAsDataURL(imageResponse.data);
                reader.onloadend = () => {
                    setOldImage(reader.result);
                };
            } catch (error) {
                console.error('Error fetching Member by ID:', error);
            }
        };
        fetchMemberById();
    }, [memberId]);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [SakhData, setSakhData] = useState([]);
    const [Relationdata, setRelationdata] = useState([]);
    const [Villagedata, setVillagedata] = useState([]);
    const [Maritaldata, setMaritaldata] = useState([]);
    // const [Careerdata, setCareerdata] = useState([]);
    const [Educationsubtypedata, setEducationsubtypedata] = useState([]);
    const [Educationtypedata, setEducationtypedata] = useState([]);
    const [Occupationdata, setOccupationdata] = useState([]);
    const [Bloodgroupdata, setBloodgroupdata] = useState([]);
    const [Pragatimandaldata, setPragatimandaldata] = useState([]);


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

    useEffect(() => {
        // Fetch Sakh data
        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetSakh')
            .then(response => {
                setSakhData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch Sakh data
        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetRelationTypes')
            .then(response => {
                setRelationdata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetVillage')
            .then(response => {
                setVillagedata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetMaritalTypes')
            .then(response => {
                setMaritaldata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        // axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCareers')
        // .then(response => {
        //     setCareerdata(response.data.data);
        // })
        // .catch(error => {
        //     console.error('Error fetching Sakh data:', error);
        // });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetEducationSubTypes')
            .then(response => {
                setEducationsubtypedata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetEducationTypes')
            .then(response => {
                setEducationtypedata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetOccupations')
            .then(response => {
                setOccupationdata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetPragatimandals')
            .then(response => {
                setPragatimandaldata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetBloodGroup')
            .then(response => {
                setBloodgroupdata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'lookup_country_id') {
            // If country is changed
            if (value === '') {
                // If country is unselected, clear state and city
                setFormData({ ...formData, [name]: value, lookup_state_id: '', lookup_city_id: '' });
            } else {
                // If country is selected, update the form data with the selected country
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === 'lookup_state_id') {
            // If state is changed
            if (value === '') {
                // If state is unselected, clear city
                setFormData({ ...formData, [name]: value, lookup_city_id: '' });
            } else {
                // If state is selected, update the form data with the selected state
                setFormData({ ...formData, [name]: value });
            }
        } else {
            // Otherwise, update the form data as usual
            setFormData({ ...formData, [name]: value });
        }
    };
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataCopy = new FormData(); // Create a new FormData object
            // Append all other form data fields to the FormData object
            Object.keys(formData).forEach((key) => {
                formDataCopy.append(key, formData[key]);
            });

            if (formData.image instanceof File) {
                formDataCopy.append('image', formData.image); // Append the new image file to FormData
            } const token = localStorage.getItem('adminToken');
            const response = await axios.put(
                'https://expodersfour-001-site1.ltempurl.com/api/Member/Update',
                formDataCopy,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Member update successfully:', response.data.data);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error adding member:', error);
            setIsError(true);
        }
    };

    const handleImageClick = () => {
        // Trigger click on file input when image is clicked
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        // Display the selected image in the image box
        const reader = new FileReader();
        reader.onload = () => {
            setOldImage(reader.result);
        };
        reader.readAsDataURL(file);
    };



    useEffect(() => {
        if (isSuccess) {
            // Redirect to user page
            navigate(`/Home/Users`);
        }
    }, [isSuccess, navigate]);


    return (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between align-items-center">
                        <h5 className="modal-title">Update Member</h5>
                        <Link to={`/Home/Users`} className="btn-Close">
                            <FontAwesomeIcon icon={faTimes} />
                        </Link>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                    <div className="mb-3" style={{ width: '150px', height: '150px', border: '1px solid black', cursor: 'pointer' }}>
                                        <label className="form-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></label>
                                        <input id="fileInput" type="file" className="form-control" name="image" onChange={handleFileChange} style={{ display: 'none' }} />
                                        <div className="image-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }} onClick={handleImageClick}
                                            onMouseEnter={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(50%)' }}
                                            onMouseLeave={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(100%)' }}>
                                            {oldImage && (
                                                <img src={oldImage} alt="Current Image" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <label className="form-label">Relation-Type</label>
                                        <select className="form-control" name="lookup_relation_type_id" value={formData.lookup_relation_type_id} onChange={handleInputChange}>
                                            <option value="">Select Relation-Type</option>
                                            {Relationdata.map(r => (
                                                <option key={r.id} value={r.id}>{r.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Surname</label>
                                        <input type="text" className="form-control" name="surname" value={formData.surname || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Father/Husband Name</label>
                                        <input type="text" className="form-control" name="father_or_husband_name" value={formData.father_or_husband_name || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Gender</label>
                                        <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                                            <option value="Male">Male</option>
                                            <option
                                                value="Female">Female</option> </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" name="phone_number" value={formData.phone_number || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" value={formData.email || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input type="date" className="form-control" name="dob" value={formData.dob || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Age</label>
                                        <input type="number" className="form-control" name="age" value={formData.age || ''} onChange={handleInputChange} required />
                                    </div>                    </div>
                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <label className="form-label">Village</label>
                                        <select className="form-control" name="lookup_village_id" value={formData.lookup_village_id} onChange={handleInputChange}>
                                            <option value="">Select Village</option>
                                            {Villagedata.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" name="address" value={formData.address || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Country</label>
                                        <select className="form-control" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange}>
                                            <option value="">Select Country</option>
                                            {countries.map(country => (
                                                <option key={country.id} value={country.id}>{country.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">State</label>
                                        <select className="form-control" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange}>
                                            <option value="">Select State</option>
                                            {states.map(state => (
                                                <option key={state.id} value={state.id}>{state.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <select className="form-control" name="lookup_city_id" value={formData.lookup_city_id} onChange={handleInputChange}>
                                            <option value="">Select City</option>
                                            {cities.map(city => (
                                                <option key={city.id} value={city.id}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lookup_sakh_id" className="form-label">Sakh</label>
                                        <select id="lookup_sakh_id" name="lookup_sakh_id" className="form-control" value={formData.lookup_sakh_id} onChange={handleInputChange}>
                                            <option value="">Select Sakh</option>
                                            {SakhData.map(sakh => (
                                                <option key={sakh.id} value={sakh.id}>{sakh.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mama Address</label>
                                        <input type="text" className="form-control" name="mama_address" value={formData.mama_address || ''} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <label className="form-label">Marital</label>
                                        <select className="form-control" name="lookup_marital_type_id" value={formData.lookup_marital_type_id} onChange={handleInputChange}>
                                            <option value="">Select Marital-Type</option>
                                            {Maritaldata.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* <div className="mb-3">
                            <label className="form-label">Career</label>
                            <select className="form-control" name="lookup_career_id" value={formData.lookup_career_id} onChange={handleInputChange}>
                                <option value="">Select Career</option>
                                {Careerdata.map(r => (
                                    <option key={r.id} value={r.id}>{r.career_name}</option>
                                ))}
                            </select>
                        </div> */}
                                    <div className="mb-3">
                                        <label className="form-label">Education Sub Type</label>
                                        <select className="form-control" name="lookup_education_sub_type_id" value={formData.lookup_education_sub_type_id} onChange={handleInputChange}>
                                            <option value="">Select Education Sub Type</option>
                                            {Educationsubtypedata.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Education Type</label>
                                        <select className="form-control" name="lookup_education_type_id" value={formData.lookup_education_type_id} onChange={handleInputChange}>
                                            <option value="">Select Education Type</option>
                                            {Educationtypedata.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Occupation </label>
                                        <select className="form-control" name="lookup_occupation_id" value={formData.lookup_occupation_id} onChange={handleInputChange}>
                                            <option value="">Select Occupation Type</option>
                                            {Occupationdata.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Designation</label>
                                        <input type="text" className="form-control" name="designation" value={formData.designation || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Company</label>
                                        <input type="text" className="form-control" name="company" value={formData.company || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Occupation Address</label>
                                        <input type="text" className="form-control" name="occupation_address" value={formData.occupation_address || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mama Name</label>
                                        <input type="text" className="form-control" name="mama_name" value={formData.mama_name || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Blood Group </label>
                                        <select className="form-control" name="lookup_blood_group_id" value={formData.lookup_blood_group_id} onChange={handleInputChange}>
                                            <option value="">Select Blood-Group</option>
                                            {Bloodgroupdata.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pragatimandal</label>
                                        <select className="form-control" name="lookup_pragatimandal_id" value={formData.lookup_pragatimandal_id} onChange={handleInputChange}>
                                            <option value="">Select Pragatimandal</option>
                                            {Pragatimandaldata.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Height Foot</label>
                                        <input type="text" className="form-control" name="height_foot" value={formData.height_foot || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Height Inch</label>
                                        <input type="text" className="form-control" name="height_inch" onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Weight</label>
                                        <input type="text" className="form-control" name="weight" value={formData.weight || ''} onChange={handleInputChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Interested Matrimonial</label>
                                        <input type="checkbox" className="form-check-input" name="interested_matrimonial" checked={formData.interested_matrimonial} onChange={() => setFormData({ ...formData, interested_matrimonial: !formData.interested_matrimonial })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Interested Blood Donate</label>
                                        <input type="checkbox" className="form-check-input" name="interested_blood_donate" checked={formData.interested_blood_donate} onChange={() => setFormData({ ...formData, interested_blood_donate: !formData.interested_blood_donate })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">About Me</label>
                                        <textarea className="form-control" name="about_me" value={formData.about_me || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Active</label>
                                        <input type="checkbox" className="form-check-input" name="is_active" checked={formData.is_active} onChange={() => setFormData({ ...formData, is_active: !formData.is_active })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Admin Approval</label>
                                        <input type="checkbox" className="form-check-input" name="is_active" checked={formData.is_admin_approve} onChange={() => setFormData({ ...formData, is_admin_approve: !formData.is_admin_approve })} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">You Live Abroad</label>
                                        <input type="checkbox" className="form-check-input" name="you_live_abroad" checked={formData.you_live_abroad} onChange={() => setFormData({ ...formData, you_live_abroad: !formData.you_live_abroad })} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Mother Name</label>
                                        <input type="text" className="form-control" name="mother_name" value={formData.mother_name || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Hobbies</label>
                                        <input type="text" className="form-control" name="hobbies" value={formData.hobbies || ''} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button style={{ marginLeft: '970px' }} type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </form>
                        {isSuccess && <p>Member added successfully!</p>}
                        {isError && <p>Error adding member. Please try again later.</p>}
                    </div>
                </div>
            </div>
        </div>
    );

};
export default updateMemberForm;
