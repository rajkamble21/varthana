'use client'
import React from "react";
import UserList from "../components/UserList/UserList";
import { SnackbarProvider } from "notistack";

const dashboard = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <UserList />{" "}
    </SnackbarProvider>
  );
};

export default dashboard;
