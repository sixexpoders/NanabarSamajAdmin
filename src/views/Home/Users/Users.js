import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonDataTable from '../Common/DataTable'; // Assuming CommonDataTable is in the same directory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit, faTrash, faInfo, faAdd, faSignIn } from '@fortawesome/free-solid-svg-icons';
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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [maritales, setMaritales] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message visibility



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
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {showSuccessMessage && ( // Show success message if showSuccessMessage is true
              <div className="alert alert-success" role="alert">
                User updated successfully
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="file" className="form-control" name="image" value={formData.image} onChange={handleInputChange} />
              </div>
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
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option
                    value="Female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} />
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
                <label className="form-label">Is Admin Approve</label>
                <select className="form-control" name="is_admin_approve" value={formData.is_admin_approve} onChange={handleInputChange}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>


              <button type="submit" className="btn btn-primary">Update</button>
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
    is_terms: true,
    is_active: true,
    is_admin_approve: true,
    is_karobari_member: false, // Set to false
    is_verify: true,
    lookup_role_id: '', // Assuming this field is provided when using the form
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [SakhData, setSakhData] = useState([]);

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
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="file" className="form-control" name="image" value={formData.image} onChange={handleInputChange} required />
              </div>
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
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
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
                >
                  <option value="">Select Sakh</option>
                  {SakhData.map(sakh => (
                    <option key={sakh.id} value={sakh.id}>{sakh.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Pincode</label>
                <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
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
              <button type="submit" className="btn btn-primary">Register</button>
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
      render: (item) => (
        <>
          <div>
            <img src={item.image ? `https://expodersfour-001-site1.ltempurl.com/GetImage/${item.image}` : defaultImage} alt="User" style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }} />
            {item.username} {item.father_name && `${item.father_name}`} {item.surname}
          </div>
        </>
      )
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
      data: 'is_admin_approve',
      render: (item) => (
        <div className="d-flex justify-content-center" >
          <span className={`badge rounded-pill ${item.is_admin_approve !== null ? (item.is_admin_approve ? 'bg-success' : 'bg-secondary') : 'bg-secondary'}`}>
            {item.is_admin_approve !== null ? (item.is_admin_approve ? 'Approved' : 'Unapproved') : '-'}
          </span>
        </div>
      )
    }
    ,
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
          <Link to={`/Home/UserInfo/${item.id}`} className="btn" style={{ height: '40px', width: '40px', border: 'none' }} >
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
        setUserDetailsVisible({ ...userDetailsVisible, [userId]: memberResponse.data.data });
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

  const renderRow = (user) => {
    return (
      <React.Fragment>
        <tr>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex}>
              {column.data === 'toggle' ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => handleRowExpand(user.id)}
                >
                  <FontAwesomeIcon icon={expandedRows.includes(user.id) ? faCaretUp : faCaretDown} style={{ background: 'none' }} />
                </button>
              ) : (
                column.render ? column.render(user) : user[column.data]
              )}
            </td>
          ))}
        </tr>
        <tr className={`collapse ${expandedRows.includes(user.id) ? 'show' : ''}`} id={`memberDataCollapse_${user.id}`}>
          <td colSpan={columns.length}>
            <h1 style={{ fontSize: '25px' }}>Member Details</h1>

            {userDetailsVisible[user.id] && userDetailsVisible[user.id].length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Relation Type</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Father/Husband Name</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Village</th>
                    <th>Sakh</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>Marital Type</th>
                    <th>Education Type</th>
                    <th>Education Sub Type</th>
                    <th>Occupation</th>
                    <th>Designation</th>
                    <th>Company</th>
                    <th>Occupation Address</th>
                    <th>Mama Name</th>
                    <th>Blood Group</th>
                    <th>Pragatimandal</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Interested in Matrimonial</th>
                    <th>Interested in Blood Donation</th>
                    <th>About Me</th>
                    <th>Status</th>
                    <th>Admin Approval</th>
                    <th>Living Abroad</th>
                    <th>User Name</th>
                    <th>Hobbies</th>
                    <th>Mama Address</th>
                    <th>Mother Name</th>
                    <th>Piyar</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetailsVisible[user.id].map((member, index) => {
                    debugger
                    const memberResponse = member;
                    console.log("memberdata:", memberResponse);
                    return (
                      <tr key={index}>
                        <td>{member.relation_type}</td>
                        <td>
                          {member.image && (
                            <img
                              src={`https://expodersfour-001-site1.ltempurl.com/GetImage/${member.image} ` ?? defaultImage}
                              alt="Member"
                              style={{ width: '50px', height: '50px' }}
                            />
                          )}
                          {member.name}
                        </td>
                        <td>{member.surname}</td>
                        <td>{member.father_or_husband_name}</td>
                        <td>{member.gender}</td>
                        <td>{member.phone_number}</td>
                        <td>{member.email}</td>
                        <td>{member.dob}</td>
                        <td>{member.age}</td>
                        <td>{member.village}</td>
                        <td>{member.sakh}</td>
                        <td>{member.address}</td>
                        <td>{member.city}</td>
                        <td>{member.country}</td>
                        <td>{member.state}</td>
                        <td>{member.marital_type}</td>
                        <td>{member.education_type}</td>
                        <td>{member.education_sub_type}</td>
                        <td>{member.occupation}</td>
                        <td>{member.designation}</td>
                        <td>{member.company}</td>
                        <td>{member.occupation_address}</td>
                        <td>{member.mama_name}</td>
                        <td>{member.blood_group}</td>
                        <td>{member.pragatimandal}</td>
                        <td>{member.height_foot} ft {member.height_inch} inches</td>
                        <td>{member.weight}</td>
                        <td>{member.interested_matrimonial ? 'Yes' : 'No'}</td>
                        <td>{member.interested_blood_donate ? 'Yes' : 'No'}</td>
                        <td>{member.about_me}</td>
                        <td>
                          <span className={`badge rounded-pill ${member.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {member.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${member.is_admin_approve ? 'bg-success' : 'bg-danger'}`}>
                            {member.is_admin_approve ? 'Approved' : 'Not Approved'}
                          </span>
                        </td>

                        <td>{member.you_live_abroad ? 'Yes' : 'No'}</td>
                        <td>{member.user_name}</td>
                        <td>{member.hobbies}</td>
                        <td>{member.mama_address}</td>
                        <td>{member.mother_name}</td>
                        <td>{member.piyar}</td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/Home/Member/${user.id}`} className="btn" style={{ height: '40px', width: '40px', border: 'none' }} onClick={() => handleMemberAddClick(user)}>
                              <FontAwesomeIcon icon={faAdd} />
                            </Link>
                            <Link
                              to={{
                                pathname: `/Home/Member/${user.id}/${member.id}/`,
                              }}
                              className="btn"
                              style={{ height: '40px', width: '40px', border: 'none' }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button className="btn me-1" style={{ height: '40px', width: '40px', fontSize: '1rem', border: 'none' }} onClick={() => handleDeleteClick(member.id, 'member')} title="Delete">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <Link to={`/Home/MemberInfo/${member.id}`} className="btn" style={{ height: '40px', width: '40px', border: 'none' }} >
                              <FontAwesomeIcon icon={faInfo} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No member data available for this user.</p>
            )}
          </td>
        </tr>
      </React.Fragment>
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
      <h1>User Management</h1>
      <div className="position-relative">
        <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Register</button>
        <div className="mb-2">
          {loading ? (
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
            <CommonDataTable
              data={userData}
              columns={columns}
              className="table-bordered"
              renderRow={renderRow}
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
                    <h5 className="modal-title">Confirm Deletion</h5>
                    <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete {deleteType === 'user' ? 'user' : 'member'}: <strong>{deleteType === 'user' ? userInfo.username : userInfo.name}</strong>?</p>
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
