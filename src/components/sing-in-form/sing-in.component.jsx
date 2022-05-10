import React from 'react';
import { useState} from 'react';
import FormInput from '../from-input/from-input.component';
import { useDispatch } from 'react-redux';

import {signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase/firebase.utils.js';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import {SingInContainer, ButtonContainer} from  './sing-in.styles.jsx'
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action'

const defaultFormFields = {
    email: '',
    password: '',
};

const SingInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;
    const dispatch = useDispatch();


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
         dispatch(googleSignInStart());
    
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        try{
            dispatch(emailSignInStart(email, password));
            resetFormFields();     
        }catch(error){
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error.code);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value});
    };

    return(
        <SingInContainer>
            <h2>Already have an account?</h2>
            <span>Sing in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password' 
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <ButtonContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}> 
                        Google sign in
                    </Button>
                </ButtonContainer>
            </form>
        </SingInContainer>
    );
}

export default SingInForm;