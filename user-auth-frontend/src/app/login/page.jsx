"use client";
import LoginForm from "../components/LoginForm/LoginForm";
import { SnackbarProvider } from "notistack";

export default function Login() {
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
        <LoginForm />
      </div>
    </SnackbarProvider>
  );
}
