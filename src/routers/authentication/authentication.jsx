import React from 'react';
import SingUpForm from '../../components/sing-up-form/sing-up.component.jsx';
import SingInForm from '../../components/sing-in-form/sing-in.component.jsx';
import { AuthenticationContainer} from './authentication.styles.jsx'

const Authentication = () => {
 
    return (
      <AuthenticationContainer>
          <SingInForm/>
          <SingUpForm/>
      </AuthenticationContainer>
      
    );
}

export default Authentication ;