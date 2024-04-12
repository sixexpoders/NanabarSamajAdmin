import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';

import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilAccountLogout,
  cilSettings,
  cilTask,
  cilUser,
  cilLockLocked,
} from '@coreui/icons';

import CIcon from '@coreui/icons-react';

const AppHeaderDropdown = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const adminEmail = localStorage.getItem('adminEmail');
        const response = await axios.get('http://nanabarsamaj-001-site1.htempurl.com/api/admin/Lookup/GetUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        const filteredUserData = response.data.data.find(user => user.email === adminEmail);
        setUserData(filteredUserData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {userData && userData.image ? (
          <img src={`http://nanabarsamaj-001-site1.htempurl.com/GetImage/${userData.image}`} alt="User" style={{ borderRadius: '50%', width: '30px', height: '30px', marginTop: '4px' }} />
        ) : (
          "No Image"
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem as={Link} to="/Home/Profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem as={Link} to="/Forgot-Password">
          <CIcon icon={cilLockLocked} className="me-2" />
          Forgot Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem as={Link} to="/Login">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
