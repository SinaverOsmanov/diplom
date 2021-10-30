import { RegistrationForm } from "../components/Form/RegistrationForm";
import { LoginForm } from "../components/Form/LoginForm";
import React from "react";

export function Authentication() {
  return (
    <>
      <LoginForm />
      <RegistrationForm />
    </>
  );
}
