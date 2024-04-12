import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { cilUser } from '@coreui/icons';
import image from '../../../assets/images/image.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter an email');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        `http://nanabarsamaj-001-site1.htempurl.com/api/Admin/Auth/ForgotPassword?email=${encodeURIComponent(email)}`,
        {}, // empty data object
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        navigate('/reset-password');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error in axios request:', error);
      setError('An error occurred while resetting your password. Please try again later.');
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
                  <h1 style={{ fontSize: '25px', fontWeight: '12px'}}>Forgot Password</h1>
                  <p className="text-body-secondary">Enter your email to reset your password</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
