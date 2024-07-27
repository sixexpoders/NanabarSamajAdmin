import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import image from '../../../assets/images/image.png';
import ForgotPassword from './Forgot-Password';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setAdminLoggedIn = (adminEmail) => {
    localStorage.setItem('adminEmail', adminEmail);
  };

  const setAdminLoggedInid = (adminid) => {
    localStorage.setItem('adminid', adminid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.trim()) {
      setError('Please enter an email');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password');
      setLoading(false);
      return;
    }

    const data = {
      Email: email,
      Password: password
    };

    try {
      const response = await axios.post('http://ydpatel18-001-site1.atempurl.com/api/Admin/Auth/Login', data);

      if (response.data.success) {
        setAdminLoggedIn(email);
        const token = response.data.data.token;
        const id = response.data.data.id;
        setAdminLoggedInid(id);
        localStorage.setItem('adminToken', token);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Failed to login. Please try again.');
      console.error('Login failed:', error.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{ animation: 'fadeIn 1.5s forwards', opacity: 0 }}>
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
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
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                          {loading ? (
                            <div style={{
                              position: 'relative',
                              display: 'inline-block',
                              marginRight: '5px'
                            }}>
                              <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '1em' }} />
                            </div>
                          ) : (
                            'Login'
                          )}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password" href="#/forgot-password">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                    {error && <p className="text-danger">{error}</p>}
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%', animation: 'slideUp 1.5s forwards', opacity: 0 }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Nanabar Samaj</h2>
                    <img src={image} alt="Background" className="login-image" style={{ width: '150px', height: 'auto' }} /> 
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
