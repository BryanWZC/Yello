// External modules
import React from 'react';
import styled from 'styled-components';

// Internal modules
import welcome from '../../../assets/img/welcome.svg';

const SignUpContainer = styled.div`
    width: 100%;
    min-height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #F6F6F6;
`;

const TopBar = styled.div`
    height: 90px;
    width: 90px;
    padding: 15px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 24px;
    background-color: #343330;
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #FFD400;
`;

const SignUpForm = styled.form`
    width: 526px;
    display: flex;
    flex-direction: column;
    margin-top: 156px;
    margin-bottom: 32px;

    @media (max-width: 700px) {
        width: 300px;
    }
`;

const SignUpTitle = styled.p`
    font-size: 32px;
    margin-bottom: 24px;
`;

const ErrorMessage = styled.p`
    margin-bottom: 8px;
    color: #AB3428;
`;

const SignUpLabel = styled.label`
    margin-bottom: 8px;
`;

const SignUpInput = styled.input`
    width: 100%;
    height: 32px;
    padding-left: 8px;
    border: 1px solid #333333;
    border-radius: 8px;
    margin-bottom: 16px;

    &:focus {
        outline: none;
        border: 2px solid #333333;
`;

const SignUpSubmit = styled.input`
    width: 100%;
    height: 32px;
    cursor: pointer;
    border: 0;
    border-radius: 8px;
    background-color: #FFD400;
    font-size: 16px;

    &: hover {
        background-color: #E0BB00;
    }
`;

const Desc = styled.p`
    margin-top: 8px;
    font-size: 14px;
`;

const Link = styled.a`
    margin-top: 8px;
    text-align: center;
    text-decoration: none;
    color: #E0BB00;
`;

const Image = styled.img`
    height: 250px;
    width: 250px;
`;

const SignUpErrorPage = (props) => {
    return(
        <SignUpContainer>
            <TopBar>
                <Heading>Yello</Heading>
            </TopBar>
            <SignUpForm action='/sign-up' method='post'>
                <SignUpTitle>Create your account</SignUpTitle>
                <ErrorMessage>Uh-oh! You might have accidentally entered an invalid username or password. Please try again.</ErrorMessage>
                <SignUpInput type='email' name='username' autoComplete='off' required/>
                <SignUpLabel htmlFor='password'>Password</SignUpLabel>
                <SignUpInput 
                    type='password' 
                    name='password' 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                    autoComplete='off'
                    required
                />
                <SignUpInput type='password' name='password' autoComplete='off'/>
                <SignUpSubmit type='submit' value='Submit' />
                <Desc>Already have an account?<Link href='/'> Sign in</Link></Desc>
            </SignUpForm>
            <Image src={welcome} alt='welcome'/>
        </SignUpContainer>
    )
} 

export default SignUpErrorPage;