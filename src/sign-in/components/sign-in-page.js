// External modules
import React from 'react';
import styled from 'styled-components';

// Internal modules
import scrum from '../../../assets/img/scrum-board.svg';

const SignInContainer = styled.div`
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

const LoginForm = styled.form`
    width: 526px;
    display: flex;
    flex-direction: column;
    margin-top: 156px;
    margin-bottom: 32px;

    @media (max-width: 700px) {
        width: 300px;
    }
`;

const LoginTitle = styled.p`
    font-size: 32px;
    margin-bottom: 24px;
`;

const LoginLabel = styled.label`
    margin-bottom: 8px;
`;

const LoginInput = styled.input`
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

const LoginSubmit = styled.input`
    width: 100%;
    height: 32px;
    cursor: pointer;
    border: 0;
    border-radius: 8px;
    background-color: #FFD400;
    font-size: 16px;
    outline: none;

    &: hover {
        background-color: #E0BB00;
    }
    &:focus {
        border: 1px solid #333333;
    }
`;

const Desc = styled.p`
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 14px;
`;

const Link = styled.a`
    margin-top: 8px;
    text-align: center;
    text-decoration: none;
    color: #E0BB00;
`;

const GuestButton = styled.button`
    width: 100%;
    height: 32px;
    cursor: pointer;
    border: 0;
    border-radius: 8px;
    background-color: #FF6663;
    font-size: 16px;
    outline: none;

    &:hover {
        background-color: #FF4A47;
    }

    &:focus {
        border: 1px solid #333333;
    }
`;

const Image = styled.img`
    height: 250px;
    width: 250px;
`;

const SignInPage = (props) => {
    return(
        <SignInContainer>
            <TopBar>
                <Heading>Yello</Heading>
            </TopBar>
            <LoginForm action='/login' method='post'>
                <LoginTitle>Sign In</LoginTitle>
                <LoginLabel htmlFor='username'>Email</LoginLabel>
                <LoginInput type='email' name='username' autoComplete='off' required/>
                <LoginLabel htmlFor='password'>Password</LoginLabel>
                <LoginInput type='password' name='password' autoComplete='off' required/>
                <LoginSubmit type='submit' value='Submit' />
                <Desc>Don't have an account?<Link href='/sign-up'> Sign up</Link></Desc>
                <Desc style={{ marginTop: '12px' }}>Or</Desc>
                <Desc>To proceed without signing in:</Desc>
                <GuestButton onClick={handleGuestButton}>
                    Sign in as Guest
                </GuestButton>
            </LoginForm>
            <Image src={scrum} alt='scrum board'/>
        </SignInContainer>
    )
}

function handleGuestButton(e) { 
    e.preventDefault(); 
    location.href='/board/guest'; 
}

export default SignInPage;