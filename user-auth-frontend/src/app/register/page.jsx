"use client";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { SnackbarProvider } from "notistack";

export default function Register() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <div className="h-screen">
        <RegisterForm />
      </div>
    </SnackbarProvider>
  );
}
