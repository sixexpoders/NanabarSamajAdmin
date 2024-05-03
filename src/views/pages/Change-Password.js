import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    CButton,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CCol,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilX } from '@coreui/icons'; // Importing the close icon

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { token } = useParams(); // Assuming the Change token is passed as a URL parameter

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!password.trim() || !confirmPassword.trim()) {
            setErrorMessage('Please enter both password fields');
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
    
        try {
            const adminId = localStorage.getItem('adminid');
            const token = localStorage.getItem('adminToken');
    
            const requestBody = {
                user_id: adminId,
                password: password,
                confirm_password: confirmPassword
            };
    
            const response = await axios.post(
                `https://expodersfour-001-site1.ltempurl.com/api/Admin/Auth/ChangePassword`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
    
            if (response.data.success) {
                setSuccessMessage('Password changed successfully');
                setErrorMessage('');
                // Handle success, e.g., navigate to a confirmation page
                navigate('/Login');
            } else {
                setErrorMessage('Failed to change password. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Failed to change password. Please try again.');
            setSuccessMessage('');
            console.error('Password Change failed:', error.message);
        }
    };    

    return (
        <div className=" d-flex flex-row ">
            <CContainer>
                <CRow className="">
                    <CCol md={6}>
                        <h1 style={{ fontSize: '25px', fontWeight: '12px' }}>Change Password</h1>
                        <CForm onSubmit={handleSubmit} style={{marginTop:'20px'}}>
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
                            <CButton type="submit" color="primary" className="px-3">
                                Change Password
                            </CButton>
                            <CButton color="danger" className="px-3" style={{marginLeft:'10px'}} onClick={() => navigate('/dashboard')}>
                                Cancel
                            </CButton>
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default ChangePassword;
