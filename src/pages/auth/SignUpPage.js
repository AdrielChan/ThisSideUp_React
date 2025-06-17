// File: src/pages/SignUpPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('CreateAccountHD.jpg');
  background-size: cover;
  background-position: center;
  padding: var(--spacing-m, 16px);
`;

const SignUpContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px; /* Adjust as needed for the two-panel layout */
  min-height: 550px; /* Adjust as needed */
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent overlay for the form panel if needed */
  border-radius: var(--border-radius-large, 12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden; /* To keep rounded corners on child elements like the image */

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 450px; /* Full width on smaller screens */
  }
`;

const FormPanel = styled.div`
  flex: 1; /* Takes up half the space, or adjust ratio e.g. flex: 0 0 40%; */
  padding: var(--spacing-xl, 32px) var(--spacing-xxl, 48px);
  background-color: rgba(40, 20, 60, 0.85); /* Dark purple, semi-transparent */
  backdrop-filter: blur(8px); /* Frosted glass effect */
  color: var(--color-text-light, #FFFFFF);
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center form vertically */

  @media (max-width: 768px) {
    border-radius: var(--border-radius-large, 12px) var(--border-radius-large, 12px) 0 0; /* Rounded top on mobile */
  }
`;

const ImagePanel = styled.div`
  flex: 1; /* Takes up the other half */
  background-image: url('/images/beach-sunset-background.jpg'); /* Same image, but it will be clipped */
  background-size: cover;
  background-position: center; /* You might want to adjust this to focus on a specific part */
  
  @media (max-width: 768px) {
    display: none; /* Hide image panel on smaller screens to give more space to form */
  }
`;


const Title = styled.h1`
  font-family: 'Serif', var(--font-heading, Georgia); /* Matching the serif font in Figma */
  font-size: var(--font-size-hero-small, 38px); /* Large title */
  color: var(--color-secondary-peach-light, #FFEDDB); /* Light peach/pink color */
  margin-bottom: var(--spacing-xl, 32px);
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m, 20px); /* Increased gap between form elements */
`;

const Label = styled.label`
  font-size: var(--font-size-medium, 16px);
  color: var(--color-neutral-gray-light, #E0E0E0); /* Lighter gray for labels */
  margin-bottom: -10px; /* Reduce space between label and input */
`;

const Input = styled.input`
  background-color: var(--color-background-light, #FFFFFF);
  color: var(--color-text-dark, #333333);
  border: 1px solid var(--color-neutral-gray, #BDBDBD);
  border-radius: var(--border-radius-pill, 20px); /* Pill shape */
  padding: var(--spacing-s, 10px) var(--spacing-m, 16px);
  font-size: var(--font-size-medium, 16px);
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;

  &::placeholder {
    color: var(--color-neutral-gray-dark, #757575);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary-purple-light, #7A5FD3);
    box-shadow: 0 0 0 2px rgba(122, 95, 211, 0.3);
  }
`;

const RoleSelector = styled.div`
  margin-top: var(--spacing-xs, 8px);
  p {
    font-size: var(--font-size-medium, 16px);
    color: var(--color-neutral-gray-light, #E0E0E0);
    margin-bottom: var(--spacing-s, 8px);
  }
  div {
    display: flex;
    gap: var(--spacing-m, 16px);
  }
`;

const RoleButton = styled.button`
  flex-grow: 1;
  padding: var(--spacing-s, 10px);
  border-radius: var(--border-radius-pill, 20px);
  font-size: var(--font-size-medium, 16px);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;
  border: 2px solid var(--color-primary-purple, #5D3FD3);
  
  background-color: ${props => props.active ? 'var(--color-primary-purple, #5D3FD3)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-text-light, #FFFFFF)' : 'var(--color-primary-purple-light, #BEAEE2)'};

  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary-purple-dark, #4B0082)' : 'rgba(93, 63, 211, 0.2)'};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0px);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--color-primary-purple, #5D3FD3);
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-m, 12px);
  border: none;
  border-radius: var(--border-radius-pill, 20px);
  font-size: var(--font-size-large, 18px);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: var(--spacing-m, 16px);

  &:hover {
    background-color: var(--color-primary-purple-dark, #4B0082);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0px);
  }
  &:disabled {
    background-color: var(--color-neutral-gray, #BDBDBD);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: var(--color-error, #FF6B6B);
  font-size: var(--font-size-small, 14px);
  text-align: center;
  margin-top: var(--spacing-s, 8px);
`;

const SignInLink = styled.p`
  text-align: center;
  margin-top: var(--spacing-l, 24px);
  font-size: var(--font-size-small, 14px);
  color: var(--color-neutral-gray-light, #E0E0E0);

  a {
    color: var(--color-secondary-peach, #FFDAB9);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;


const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' // Add default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role: role
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role // Include role in signup data
      });
      navigate('/'); // Redirect to home page on success
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PageWrapper>
      <SignUpContainer>
        <FormPanel>
          <Title>Sign up</Title>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm password:</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <RoleSelector>
              <p>Type of user:</p>
              <div>
                <RoleButton
                  type="button"
                  active={formData.role === 'customer'}
                  onClick={() => handleRoleChange('customer')}
                >
                  Customer
                </RoleButton>
                <RoleButton
                  type="button"
                  active={formData.role === 'employee'} // Or 'admin'
                  onClick={() => handleRoleChange('employee')}
                >
                  Employee
                </RoleButton>
              </div>
            </RoleSelector>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </SubmitButton>
          </Form>
          <SignInLink>
            Already have an account? <Link to="/login">Log In</Link>
          </SignInLink>
        </FormPanel>
        <ImagePanel /> {/* This panel will display the right side of the background image */}
      </SignUpContainer>
    </PageWrapper>
  );
};

export default SignUpPage;