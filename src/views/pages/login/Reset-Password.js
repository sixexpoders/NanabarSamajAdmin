import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams(); // Assuming the reset token is passed as a URL parameter

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      setError('Please enter both password fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const token = 'heHk+4Ak5G6/WLtMgX56ImKo0M3HsKiOadqzXEqhbFiG1He02xs/vdKsfgkGS1eD';
      const token1 = localStorage.getItem('adminToken');

      const response = await axios.post(
        `http://nanabarsamaj-001-site1.htempurl.com/api/Admin/Auth/ResetPassword?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`,
        {}, // Include the password in the request body
        {
          headers: {
            Authorization: `Bearer ${token1}`
          },
        }
      );

      if (response.data.success) {
        // Handle success, e.g., navigate to a confirmation page
        navigate('/Login');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      console.error('Password reset failed:', error.message);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1 style={{ fontSize: '25px', fontWeight: '12px'}}>Reset Password</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="New Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4">
                        Reset Password
                      </CButton>
                    </CCol>
                  </CRow>
                  {error && <p className="text-danger">{error}</p>}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;
