import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CommonDataTable from '../Common/DataTable'; // Assuming CommonDataTable is in the same directory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit, faTrash, faInfo, faAdd, faSignIn, faExpand, faPlus } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../../assets/images/profile.png';
import { Link } from 'react-router-dom';
import updateMemberForm from '../Member/Update';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

//#region update 
const UpdateForm = ({ user, onClose, refreshUserData }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    id: user.id || '',
    name: user.username || '',
    surname: user.surname || '',
    father_name: user.father_name || '',
    mother_name: user.mother_name || '',
    mobile_number: user.mobile_number || '',
    email: user.email || '',
    gender: user.gender || '',
    address: user.address || '',
    lookup_city_id: user.lookup_city_id || '',
    lookup_state_id: user.lookup_state_id || '',
    lookup_country_id: user.lookup_country_id || '',
    pincode: user.pincode || '',
    lookup_sakh_id: user.lookup_sakh_id || '',
    password: user.password, // Never store passwords in state
    is_terms: user.is_terms || false,
    image: user.image || '',
    dob: user.dob || '',
    lookup_career_id: user.lookup_career_id || '',
    lookup_education_type_id: user.lookup_education_type_id || '',
    lookup_education_sub_type_id: user.lookup_education_sub_type_id || '',
    lookup_marital_id: user.lookup_marital_id || '', // Set the valid ID here
    religion: user.religion || '',
    mother_tongue: user.mother_tongue || '',
    community: user.community || '',
    diet_preferences: user.diet_preferences || '',
    annual_income: user.annual_income || '',
    collage_name: user.collage_name || '',
    hobbies: user.hobbies || '',
    is_active: user.is_active || true,
    is_admin_approve: user.is_admin_approve,
    is_karobari_member: user.is_karobari_member || false,
    is_verify: user.is_verify || true,
    updated_by_id: user.updated_by_id || '', // Assuming this field is available
    updated_on: user.updated_on || '', // Assuming this field is available
  });
  const [oldImage, setOldImage] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [maritales, setMaritales] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message visibility

  useEffect(() => {
    // Fetch the image
    if (user.image) {
      axios.get(`https://expodersfour-001-site1.ltempurl.com/GetImage/${user.image}`, { responseType: 'arraybuffer' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'image/jpeg' }); // Create a Blob from the response data
          const reader = new FileReader();
          reader.readAsDataURL(blob); // Convert the blob to a data URL
          reader.onloadend = () => {
            setOldImage(reader.result); // Set the data URL as the source for the image
          };
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
    }
  }, [user.image]);

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
      axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetMaritalTypes`)
        .then(response => {
          setMaritales(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching marital types:', error);
        });
    }
  }, [formData.lookup_state_id]);

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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, image: file }); // Update the form data with the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const formDataCopy = { ...formData };

      formDataCopy.password = formData.password;
      formDataCopy.gender = formData.gender;
      formDataCopy.is_admin_approve = formData.is_admin_approve;
      const response = await axios.put('https://expodersfour-001-site1.ltempurl.com/api/User/Update', formDataCopy, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowSuccessMessage(true); // Show success message
      console.log('User updated successfully:', response.data);
      setFormData(response.data.data);
      refreshUserData();

      onClose();

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {showSuccessMessage && (
              <div className="alert alert-success" role="alert">
                User updated successfully
              </div>
            )}
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
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">User name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input type="text" className="form-control" name="surname" value={formData.surname} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Father's Name</label>
                    <input type="text" className="form-control" name="father_name" value={formData.father_name} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mother's Name</label>
                    <input type="text" className="form-control" name="mother_name" value={formData.mother_name} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Marital</label>
                    <select className="form-control" name="lookup_marital_id" value={formData.lookup_marital_id} onChange={handleInputChange}>
                      <option value="">Select marital</option>
                      {maritales.map(marital => (
                        <option key={marital.id} value={marital.id}>{marital.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Is Admin Approve</label>
                    <select className="form-control" name="is_admin_approve" value={formData.is_admin_approve} onChange={handleInputChange}>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} />
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

                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end"> {/* Aligns the button to the right */}
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
//#endregion

//#region Add
const AddForm = ({ onClose, refreshUserData }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    father_name: '',
    mobile_number: '',
    email: '',
    gender: '',
    address: '',
    lookup_city_id: '',
    lookup_state_id: '',
    lookup_country_id: '',
    pincode: '',
    lookup_sakh_id: '',
    password: '',
    image: '',
    is_terms: false,
    is_active: false,
    is_admin_approve: false,
    is_karobari_member: false, // Set to false
    is_verify: false,
    lookup_role_id: '', // Assuming this field is provided when using the form
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [SakhData, setSakhData] = useState([]);

  const [imageFile, setImageFile] = useState(null);

  // Function to handle image selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0] });
  };

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
    axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetSakh')
      .then(response => {
        setSakhData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching sakh data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input type is checkbox, update the checked state directly
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    }
    else if (name === 'lookup_country_id') {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataCopy = { ...formData };
      formDataCopy.is_admin_approve = formData.is_admin_approve;
      formDataCopy.is_active = formData.is_active;
      formDataCopy.is_verify = formData.is_verify;
      const response = await axios.post('https://expodersfour-001-site1.ltempurl.com/api/Auth/Register', formDataCopy, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User added successfully:', response.data.data);
      refreshUserData(); // Refresh user list
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-xl" role="document" >
        <div className="modal-content" >
          <div className="modal-header" >
            <h5 className="modal-title">Register User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} >
              <div className="row">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                  <div className="mb-3" style={{ width: '150px', height: '150px', border: '1px solid white', cursor: 'pointer', position: 'relative' }}>
                    <label className="form-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></label>
                    <input id="imageInput" type="file" className="form-control" name="image" onChange={handleImageChange} style={{ display: 'none' }} />
                    <div className="image-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }} onClick={() => document.getElementById('imageInput').click()}
                      onMouseEnter={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(50%)' }}
                      onMouseLeave={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(100%)' }}>
                      {imageFile ? (
                        <img src={URL.createObjectURL(imageFile)} alt="Selected Image" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input type="text" className="form-control" name="surname" value={formData.surname} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Father's Name</label>
                    <input type="text" className="form-control" name="father_name" value={formData.father_name} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
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
                    <select
                      id="lookup_sakh_id"
                      name="lookup_sakh_id"
                      className="form-control"
                      value={formData.lookup_sakh_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Sakh</option>
                      {SakhData.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}                    </select>
                  </div>
                </div>
                <div className="col-md-3">

                  <div className="mb-3">
                    <label className="form-label">Pincode</label>
                    <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                    <label className="form-check-label" htmlFor="is_active">Is Active</label>
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_verify" name="is_verify" checked={formData.is_verify} onChange={handleInputChange} />
                    <label className="form-check-label" htmlFor="is_verify">Is Verify</label>
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_admin_approve" name="is_admin_approve" checked={formData.is_admin_approve} onChange={handleInputChange} />
                    <label className="form-check-label" htmlFor="is_admin_approve">Is Admin Approved</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end"> {/* Aligns the button to the right */}
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
//#endregion

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [userDetailsVisible, setUserDetailsVisible] = useState({}); // State to manage visibility of user details
  const [userInfo, setUserInfo] = useState(null); // State to manage user info
  const [memberData, setMemberData] = useState([]); // Add this line to define memberData state

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/GetUsers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const adminEmail = localStorage.getItem('adminEmail');
      const filteredUserData = response.data.data.filter(user => user.email !== adminEmail);

      setUserData(filteredUserData); // Set filtered user data to the state
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function useApprovalState(initialValue) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialValue !== null ? initialValue.toString() : ''); // Convert to string to match option values

    const handleDropdownChange = async (event) => {
      const newValue = event.target.value;
      setSelectedValue(newValue);
      setIsOpen(false);

      try {
        const token = localStorage.getItem('adminToken');
        const requestData = {
          id: event.currentTarget.dataset.userId, // Use data attribute to pass userId
          is_admin_approve: newValue === 'true'
        };
        const response = await fetch('https://expodersfour-001-site1.ltempurl.com/api/Admin/Auth/VerifyUser', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`Error approving user: ${response.statusText}`);
        } else {
          console.log('user approved successfully.');
          // if (newValue === 'false') {
          //     window.location.reload();
          // }
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    return {
      isOpen,
      selectedValue,
      setIsOpen,
      handleDropdownChange
    };
  }

  const ApproveColumn = ({ item }) => {
    const { isOpen, selectedValue, setIsOpen, handleDropdownChange } = useApprovalState(item.is_admin_approve);

    return (
      <div className="d-flex justify-content-center">
        {isOpen ? (
          <select
            className="form-select"
            value={selectedValue}
            onChange={handleDropdownChange}
            onBlur={() => setIsOpen(false)}
            data-user-id={item.id} // Set data attribute with userId
          >
            <option value={''}>Select Approval</option>
            <option value={'true'}>Approved</option>
            <option value={'false'}>Disapproved</option>
          </select>
        ) : (
          <span
            className={`badge rounded-pill ${selectedValue !== '' ? (selectedValue === 'true' ? 'bg-success' : 'bg-danger') : 'bg-secondary'}`}
            onClick={() => setIsOpen(true)}
          >
            {selectedValue !== '' ? (selectedValue === 'true' ? 'Approved' : 'Disapproved') : 'Pending'}
          </span>
        )}
      </div>
    );
  };

  const columns = [
    {
      title: '',
      data: 'toggle',
      render: (user) => (
        <button
          className="btn btn-link"
          onClick={() => handleRowExpand(user.id)}
        >
          <FontAwesomeIcon icon={expandedRows.includes(user.id) ? faAngleUp : faAngleDown} />
        </button>
      )
    },
    {
      title: 'Name',
      data: 'username',
      render: (item) => {
        const handleImageError = (event) => {
          event.target.onerror = null;
          event.target.src = defaultImage;
        };

        const fullName = `${item.username} ${item.father_name ? item.father_name : ''} ${item.surname}`.trim();
        const displayFullName = fullName.length > 15 ? `${fullName.substring(0, 20)}...` : fullName;

        return (
          <>
            <div>
              <img
                src={`https://expodersfour-001-site1.ltempurl.com/GetImage/${item.image}`}
                onError={handleImageError}
                style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }}
              />
              {displayFullName}
            </div>
          </>
        );
      }
    },
    { title: 'Mobile Number', data: 'mobile_number' },
    { title: 'Email', data: 'email' },
    {
      title: 'Status',
      data: 'is_active',
      render: (item) => (
        <div className="d-flex justify-content-center">
          <span className={`badge rounded-pill ${item.is_active ? 'bg-info' : 'bg-danger'}`}>
            {item.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      )
    },
    {
      title: 'Verify',
      data: 'is_verify',
      render: (item) => (
        <div className="d-flex justify-content-center">
          <span className={`badge rounded-pill ${item.is_verify !== null ? (item.is_verify ? 'bg-success' : 'bg-secondary') : 'bg-secondary'}`}>
            {item.is_verify !== null ? (item.is_verify ? 'Verified' : 'Unverified') : '-'}
          </span>
        </div>
      )
    },
    {
      title: 'Approve',
      render: (item) => <ApproveColumn item={item} />
    },
    {
      title: 'Actions',
      data: 'actions',
      render: (item) => (
        <div className="d-flex">
          <button className="btn me-1" style={{ height: '40px', width: '40px', fontSize: '1rem', border: 'none' }} onClick={() => handleEditClick(item)} title="Update">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn me-1" style={{ height: '40px', width: '40px', fontSize: '1rem', border: 'none' }} onClick={() => handleDeleteClick(item.id, 'user')} title="Delete">
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <Link to={`/Users/Details/${item.id}`} className="btn" style={{ height: '40px', width: '40px', border: 'none' }} >
            <FontAwesomeIcon icon={faInfo} />
          </Link>
        </div>
      )
    }
  ];



  const handleAddClick = async (user) => {
    try {
      setShowAddForm(true);
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };



  const handleEditClick = async (user) => {
    try {
      setSelectedUser(user);
      setShowEditForm(true);
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };

  const handleDeleteClick = async (id, type) => {
    try {
      let data;
      if (type === 'user') {
        data = await getUserById(id);
      } else if (type === 'member') {
        data = await getMemberById(id);
      }

      setUserInfo(data);
      setDeleteId(id);
      setDeleteType(type);
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      if (deleteType === 'user') {
        await deleteUser(deleteId);
        await refreshUserData(); // Await the refreshUserData function call
      } else if (deleteType === 'member') {
        await deleteMember(deleteId);
        await refreshUserData(); // Await the refreshUserData function call

      }
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error(`Error deleting ${deleteType}:`, error);
    }
  };


  const getUserById = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/User/GetById?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  };



  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/User/Delete?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const deleteMember = async (memberId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/Member/Delete?id=${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting member:', error);
      throw error;
    }
  };


  const handleRowExpand = async (userId) => {
    try {
      if (expandedRows.includes(userId)) {
        setExpandedRows(expandedRows.filter(id => id !== userId));
      } else {
        setExpandedRows([...expandedRows, userId]);
        const token = localStorage.getItem('adminToken');
        const memberResponse = await axios.post("https://expodersfour-001-site1.ltempurl.com/api/Member/GetAll", {
          user_id: userId,
          page_number: null,
          page_size: null,
          age: null,
          education: null,
          occupation: null,
          gender: null,
          you_live_abroad: null,
          marital: null,
          height: null,
          weight: null,
          interested_matrimonial: null,
          lookup_village_id: null,
          lookup_pragatimandal_id: null,
          is_admin_approve: null
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Exclude the data for the first row
        const filteredData = memberResponse.data.data.filter((item, index) => index !== 0);

        setUserDetailsVisible({ ...userDetailsVisible, [userId]: filteredData });
      }
    } catch (error) {
      console.error('Error handling row expand:', error);
    }
  };


  const handleMemberAddClick = async (user) => {
    try {

      setSelectedUserId(user.id);
    } catch (error) {
      console.error('Error handling member add click:', error);
    }
  };


  const getMemberById = async (memberId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Member/GetById?id=${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const memberResponse = response.data.data;
      return memberResponse;
    } catch (error) {
      console.error('Error fetching member by ID:', error);
      throw error;
    }
  };


  const renderRow = (user, verifyMember) => {
    return (
      <React.Fragment>
        <tr>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex}>
              {column.data === 'toggle' ? (
                <button
                  className="btn"
                  onClick={() => handleRowExpand(user.id)}
                >
                  {loading ? (
                    <div style={{
                      position: 'fixed',
                      top: '52%',
                      left: '57%',
                      transform: 'translate(-50%, -50%)',
                      padding: '20px',
                      textAlign: 'center'
                    }}>
                      <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em' }} />
                    </div>
                  ) : (
                    <FontAwesomeIcon
                      icon={expandedRows.includes(user.id) ? faCaretUp : faCaretDown}
                      style={{ background: 'none' }}
                    />
                  )}
                </button>
              ) : (
                column.render ? column.render(user) : user[column.data]
              )}
            </td>
          ))}
        </tr>
        <tr className={`collapse ${expandedRows.includes(user.id) ? 'show' : ''}`} id={`memberDataCollapse_${user.id}`}>
          <td colSpan={columns.length} style={{ textAlign: 'center' }}>
            {userDetailsVisible[user.id] ? (
              loading ? (
                <div style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em' }} />
                </div>
              ) : (
                <>
                  {userDetailsVisible[user.id].length > 0 ? (
                    <table className="table table-bordered table-striped" style={{ backgroundColor: 'rgb(6, 182, 212)', color: 'black' }}>
                  <thead>
                    <tr>
                      <th>Relation Type</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>DOB</th>
                      <th>Age</th>
                      <th>Marital Type</th>
                      <th>Status</th>
                      <th>Admin Approval</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetailsVisible[user.id].map((member, index) => (
                      <tr key={index}>
                        <td>{member.relation_type}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={member.image ? `https://expodersfour-001-site1.ltempurl.com/GetImage/${member.image}` : defaultImage}
                              onError={(e) => { e.target.src = defaultImage; }}
                              style={{ width: '30px', height: '30px', marginRight: '5px' }}
                            />
                            <div>
                              {`${member.name} ${member.surname} ${member.father_or_husband_name}`.length > 15 ? `${member.name} ${member.surname} ${member.father_or_husband_name}`.substring(0, 20) + '...' : `${member.name} ${member.surname} ${member.father_or_husband_name}`}
                            </div>
                          </div>
                        </td>
                        <td>{member.phone_number}</td>
                        <td>{member.email}</td>
                        <td>{new Date(member.dob).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                        <td>{member.age}</td>
                        <td>{member.marital_type}</td>
                        <td>
                          <span className={`badge rounded-pill ${member.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {member.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <ApproveDropdown user={member} verifyMember={verifyMember} />
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/Home/Member/${user.id}`} className="btn me-1" title="Add Member">
                              <FontAwesomeIcon icon={faAdd} />
                            </Link>
                            <Link to={{ pathname: `/Home/Member/${user.id}/${member.id}/` }} className="btn me-1" title="Edit Member">
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button className="btn me-1" onClick={() => handleDeleteClick(member.id, 'member')} title="Delete Member">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <Link to={`/Member/Details/${member.id}`} className="btn" title="Member Info">
                              <FontAwesomeIcon icon={faInfo} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ justifyContent: 'center', fontWeight: 'bold' }}>
                  <p>No Member Found</p>
                </div>
              )}
            </>
          )
        ) : null}
      </td>
    </tr>
  </React.Fragment>
);
};

  const ApproveDropdown = ({ user, verifyMember }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(user.is_admin_approve);

    const handleDropdownChange = async (event) => {
      const newValue = event.target.value;
      setSelectedValue(newValue);
      setIsOpen(false);

      // Prepare data for the API request
      const requestData = {
        member_id: user.id, // Assuming user.id is the user ID
        is_admin_approve: newValue === 'true' // Convert string to boolean
      };

      try {
        // Make API call
        const token = localStorage.getItem('adminToken');
        const response = await fetch('https://expodersfour-001-site1.ltempurl.com/api/admin/Member/VerifyMember', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          console.error('Error approving user:', response.statusText);
        } else {
          console.log('User approved successfully.');
          if (newValue === 'false') {
            window.location.reload(); // Reload the page if disapproved
          }
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    return (
      <div className="d-flex justify-content-center">
        {isOpen ? (
          <select
            className="form-select"
            value={selectedValue}
            onChange={handleDropdownChange}
            onBlur={() => setIsOpen(false)}
            style={{ width: 'auto' }} // Adjust the width here
          >
            <option value="">Select Approval</option>
            <option value={true}>Approved</option>
            <option value={false}>Disapproved</option>
          </select>
        ) : (
          <span
            className={`badge rounded-pill ${selectedValue !== null ? (selectedValue ? 'bg-success' : 'bg-danger') : 'bg-secondary'}`}
            onClick={() => setIsOpen(true)}
            style={{ cursor: 'pointer' }} // Add cursor pointer for better indication
          >
            {selectedValue !== null ? (selectedValue ? 'Approved' : 'Disapproved') : 'Pending'}
          </span>
        )}
      </div>
    );
  };

  const refreshUserData = async () => {
    try {
      // Perform actions to refresh user data
      console.log('Refreshing user data...');
      // You can call fetchUserData or any other function to refresh user data
      await fetchUserData();
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  }

  return (
    <div className="container-lg">
      <h1>User</h1>
      <div className="position-relative">
        <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Register</button>
        <div className="mb-2">
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
              data={userData}
              columns={columns}
              className="table-bordered"
              renderRow={renderRow}
              defaultEntitiesPerPage={10}
            />
          )}
          {showAddForm && (
            <AddForm
              refreshUserData={refreshUserData}
              onClose={() => setShowAddForm(false)}
            />
          )}

          {showEditForm && selectedUser && (
            <UpdateForm
              user={selectedUser}
              refreshUserData={refreshUserData}
              onClose={() => setShowEditForm(false)}
            />
          )}

          {showDeleteConfirmation && userInfo && (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: showDeleteConfirmation ? 'block' : 'none' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm</h5>
                    <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this <strong>{deleteType === 'user' ? userInfo.username : userInfo.name}</strong> {deleteType === 'user' ? 'user' : 'member'} ?</p>
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
    </div>
  );
};

export default Users;
