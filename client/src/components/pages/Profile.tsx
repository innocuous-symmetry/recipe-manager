import { useContext, useEffect, useState } from "react";
import { IUser } from "../../schemas";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../context/AuthContext";
import { Button, Page } from "../ui";
import Protect from "../../util/Protect";

export default function Profile() {
    const [message, setMessage] = useState<JSX.Element>();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Protect>
            <div className="profile-authenticated">
                <h1>{user!.firstname}'s Profile</h1>
                <p>Things and stuff!</p>
            </div>
        </Protect>
    )
}