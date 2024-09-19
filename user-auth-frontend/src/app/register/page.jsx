"use client";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { SnackbarProvider } from "notistack";

export default function Register() {
  const pageStyle = {
    height: "75vh",
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <div style={pageStyle}>
        <RegisterForm />
      </div>
    </SnackbarProvider>
  );
}
