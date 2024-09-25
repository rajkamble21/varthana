
"use client";
import { SnackbarProvider } from "notistack";

export default function UserLayout({ children }) {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
        >
            {children}
        </SnackbarProvider>
    );
}
