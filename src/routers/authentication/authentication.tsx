import React from "react";
import SingUpForm from "../../components/sing-up-form/sing-up.component";
import SingInForm from "../../components/sing-in-form/sing-in.component";
import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SingInForm />
      <SingUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
