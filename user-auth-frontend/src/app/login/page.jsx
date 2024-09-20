"use client";
import LoginForm from "../components/LoginForm/LoginForm";
import { SnackbarProvider } from "notistack";

export default function Login() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <LoginForm />
    </SnackbarProvider>
  );
}
