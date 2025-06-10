// File: src/pages/LoginPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext

// Styled Components (similar to SignUpPage, with minor adjustments if needed)
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('LoginHD.jpg'); /* Ensure this image is in public/images */
  background-size: cover;
  background-position: center;
  padding: var(--spacing-m, 16px);
`;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px; 
  min-height: 500px; /* Slightly less height than signup */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius-large, 12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 450px;
  }
`;

const FormPanel = styled.div`
  flex: 1; /* Or flex: 0 0 40%; */
  padding: var(--spacing-xl, 32px) var(--spacing-xxl, 48px);
  background-color: rgba(40, 20, 60, 0.85); /* Dark purple, semi-transparent */
  backdrop-filter: blur(8px);
  color: var(--color-text-light, #FFFFFF);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    border-radius: var(--border-radius-large, 12px) var(--border-radius-large, 12px) 0 0;
  }
`;

const ImagePanel = styled.div`
  flex: 1;
  background-image: url('/images/beach-sunset-background.jpg');
  background-size: cover;
  background-position: center; 
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-family: 'Serif', var(--font-heading, Georgia);
  font-size: var(--font-size-hero-small, 38px);
  color: var(--color-secondary-peach-light, #FFEDDB);
  margin-bottom: var(--spacing-xl, 32px);
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m, 20px);
`;

const Label = styled.label`
  font-size: var(--font-size-medium, 16px);
  color: var(--color-neutral-gray-light, #E0E0E0);
  margin-bottom: -10px;
`;

const Input = styled.input`
  background-color: var(--color-background-light, #FFFFFF);
  color: var(--color-text-dark, #333333);
  border: 1px solid var(--color-neutral-gray, #BDBDBD);
  border-radius: var(--border-radius-pill, 20px);
  padding: var(--spacing-s, 10px) var(--spacing-m, 16px);
  font-size: var(--font-size-medium, 16px);
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-neutral-gray-dark, #757575);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary-purple-light, #7A5FD3);
    box-shadow: 0 0 0 2px rgba(122, 95, 211, 0.3);
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
  margin-top: var(--spacing-m, 16px); /* Space above the button */

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
  min-height: 20px; /* Reserve space for error message */
`;

const SignUpPrompt = styled.div`
  text-align: center;
  margin-top: var(--spacing-xl, 32px); /* More space for this section */
  color: var(--color-neutral-gray-light, #E0E0E0);

  p {
    font-size: var(--font-size-medium, 16px); /* Slightly larger text */
    margin-bottom: var(--spacing-s, 12px);
  }
`;

const SignUpLinkButton = styled(Link)`
  display: inline-block; /* To allow padding and treat as a button */
  background-color: var(--color-primary-purple, #5D3FD3);
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-s, 10px) var(--spacing-l, 24px); /* Button-like padding */
  border-radius: var(--border-radius-pill, 20px);
  font-size: var(--font-size-medium, 16px);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: var(--color-primary-purple-dark, #4B0082);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0px);
  }
`;


const LoginPage = () => {
  const navigate = useNavigate();
  // const { login, loading, error } = useAuth(); // From your AuthContext
  const [loading, setLoading] = useState(false); // Mock loading
  const [error, setError] = useState(null); // Mock error

  const [formData, setFormData] = useState({
    username: '', // Or email
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      // In a real app:
      // await login(formData.username, formData.password);
      // For demo, let's simulate success if username and password are not empty
      if (formData.username && formData.password) {
        console.log("Logging in with:", formData);
        alert("Login successful! Redirecting...");
        navigate('/'); // Redirect to homepage or dashboard
      } else {
        throw new Error("Username and password are required.");
      }
    } catch (apiError) {
      setError(apiError.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <LoginContainer>
        <FormPanel>
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text" // Or "email"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username or email"
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
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </SubmitButton>
          </Form>
          <SignUpPrompt>
            <p>Haven't made an account?</p>
            <SignUpLinkButton to="/signup">Sign Up</SignUpLinkButton>
          </SignUpPrompt>
        </FormPanel>
        <ImagePanel />
      </LoginContainer>
    </PageWrapper>
  );
};

export default LoginPage;