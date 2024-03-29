import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessForbidden from "../components/pages/StatusPages/403";
import { Button, Page } from "../components/ui";
import { useAuthContext } from "../context/AuthContext";
import API from "./API";
import { ProtectPortal } from "./types";

const Protect: ProtectPortal = ({ children, redirect = '', accessRules = null }) => {
    const { user, token } = useAuthContext();
    const navigate = useNavigate();

    if (!user || !token) {
        return (
            <AccessForbidden>
                <>
                <h2>Hi there! You don't look too familiar.</h2>
                <p>To view the content on this page, please log in below:</p>
                <Button onClick={() => navigate(redirect ? `/login?redirect=${redirect}` : '/login')}>Log In</Button>
                </>
            </AccessForbidden>
        )
    }

    if (accessRules !== null) {
        if (accessRules.mustBeRecipinAdmin && !(user?.isadmin)) {
            return (
                <AccessForbidden>
                    <>
                    <h2>This page requires administrator access.</h2>
                    <p>If you believe you are receiving this message in error, please contact Recipin support.</p>
                    </>
                </AccessForbidden>
            )
        }
    }

    return (
        <Page>
            { children }
        </Page>
    )
}

export default Protect;