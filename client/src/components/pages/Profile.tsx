import { useEffect, useState } from "react";
import { IUser } from "../../schemas";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Button, Divider, Page, Panel } from "../ui";
import Protect from "../../util/Protect";
import Friends from "../derived/Friends";
import API from "../../util/API";
import { AxiosError } from "axios";
import CollectionList from "../derived/CollectionList";

export default function Profile() {
    const [contents, setContents] = useState<JSX.Element>(<></>);
    const [targetUser, setTargetUser] = useState<IUser>();
    const { user, token } = useAuthContext();
    const navigate = useNavigate();

    const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: "long" });

    useEffect(() => {
        if (!token) return;

        const params = new URLSearchParams(window.location.search);
        const targetID = params.get('id');

        if (targetID) {
            (async() => {
                try {
                    const User = new API.User(token);
                    const result = await User.getByID(targetID);
                    if (result) setTargetUser(result);
                } catch (error) {
                    if (error instanceof AxiosError) {
                        if (error?.response?.status == 404) {
                            // to do: replace with customizable 404 page
                            setContents(
                                <Page>
                                    <h1>404: Not found</h1>
                                    <Divider />
                                    <Panel>
                                        <p>No user found with ID {targetID}</p>
                                        <Button onClick={() => navigate('/')}>Home</Button>
                                    </Panel>
                                </Page>
                            )
                        }
                    } else {
                        console.error(error);
                    }
                }
            })();
        } else {
            const formattedDate = user!.datecreated ? dateFormatter.format(new Date(user!.datecreated)) : "(unknown)";

            setContents(
                <Protect redirect="profile">
                    <div className="profile-authenticated">
                        <h1>{user!.firstname}'s Profile</h1>

                        <div className="profile-grid">
                            <Panel>
                                <h2>About me:</h2>
                                <p>{user!.firstname} {user!.lastname}</p>
                                <p>Recipin Member since: {formattedDate}</p>
                                <Divider />
                                <p>30 recipes</p>
                                <p>2 collections</p>
                            </Panel>

                            <Panel>
                                {/* include number of collections */}
                                <h2>My collections:</h2>
                                <CollectionList />
                            </Panel>

                            <Panel>
                                <h2>My friends:</h2>
                                <Friends />
                            </Panel>
                        </div>
                    </div>
                </Protect>
            )
        }
    }, [token])

    useEffect(() => {
        if (targetUser) {
            const formattedDate = targetUser.datecreated ? dateFormatter.format(new Date(targetUser.datecreated)) : "(unknown)";
            
            setContents(
                <Protect redirect="/">
                    <div className="profile-authenticated">
                        <h1>{targetUser.firstname}'s Profile</h1>

                        <div className="profile-grid">
                            <Panel>
                                <h2>About {targetUser.firstname} {targetUser.lastname}:</h2>
                                <p>Recipin Member since: {formattedDate}</p>
                            </Panel>

                            <Panel>
                                <h2>My collections:</h2>
                            </Panel>

                            <Panel>
                                <h2>My friends:</h2>
                                <Friends />
                            </Panel>
                        </div>
                    </div>
                </Protect>
            )
        }
    }, [targetUser]);

    return contents
}