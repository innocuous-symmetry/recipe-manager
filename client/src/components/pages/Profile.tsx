import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "../../context/AuthContext";
import API from "../../util/API";
import Protect from "../../util/Protect";
import { ICollection, IUser } from "../../schemas";
import Friends from "../derived/Friends";
import CollectionList from "../derived/CollectionList";
import { Button, Divider, Page, Panel } from "../ui";
import useDateFormat from "../../hooks/useDateFormat";

interface ProfileMetadata {
    targetID?: string | number
    targetUser?: IUser | undefined
    formattedDate: string
    collections: ICollection[]
    friends: IUser[]
    isSet: boolean
}

export default function Profile() {
    // globals and router utils
    const { user, token } = useAuthContext();
    const navigate = useNavigate();

    // UI state info
    const [contents, setContents] = useState<JSX.Element>(<></>);

    // master state for this page
    const [metadata, setMetadata] = useState<ProfileMetadata>({
        targetID: undefined,
        targetUser: undefined,
        formattedDate: "",
        collections: [],
        friends: [],
        isSet: false
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: undefined, dateStyle: "long" });

    // STEP 1: FETCH METADATA (requires token)
    useEffect(() => {
        if (!token || !user) return;

        const params = new URLSearchParams(window.location.search);
        const targetID = params.get('id');

        // if a target is specified in the url
        if (targetID) {
            setMetadata((prev: ProfileMetadata) => {
                return { ...prev, targetID: targetID }
            });
            
            // fetch and store user data with associated user id
            (async() => {
                try {
                    const User = new API.User(token);
                    const result = await User.getByID(targetID);
                    if (result) {
                        setMetadata((prev) => {
                            return {
                                ...prev,
                                targetUser: result,
                                formattedDate: useDateFormat(result.datecreated)
                            }
                        })
                    }
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

                            return;
                        }
                    } else {
                        console.error(error);
                    }
                }
            })();

            // do the same for this user's collections and friends
            (async() => {
                const Collections = new API.Collection(token);
                const result = await Collections.getAllAuthored(metadata.targetID);
                if (result) {
                    setMetadata((prev: ProfileMetadata) => {
                        return {
                            ...prev, collections: result
                        }
                    })
                }
            })();
        } else {
            // otherwise, this is the current user's profile and should load some slightly different info
            (async() => {
                const Collections = new API.Collection(token);
                const result = await Collections.getAllAuthored();
                if (result) {
                    setMetadata((prev: ProfileMetadata) => {
                        return {
                            ...prev, collections: result
                        }
                    })
                }
            })();

            (async() => {
                const Friends = new API.Friendship(token);
            })

            setMetadata((prev) => {
                return {
                    ...prev,
                    formattedDate: useDateFormat(user.datecreated)
                }
            })
        }

        setMetadata((prev) => {
            return { ...prev, isSet: true }
        })
    }, [token]);

    // STEP 2: set up page UI based on profile config above
    useEffect(() => {
        if (metadata.isSet) {
            if (metadata.targetUser) {
                setContents(
                    <Protect redirect="/">
                        <div className="profile-authenticated">
                            <h1>{metadata.targetUser.firstname}'s Profile</h1>
    
                            <div className="profile-grid">
                                <Panel>
                                    <h2>About {metadata.targetUser.firstname} {metadata.targetUser.lastname}:</h2>
                                    <p>Recipin Member since: {metadata.formattedDate}</p>
                                </Panel>
    
                                <Panel>
                                    <h2>My collections:</h2>
                                    <CollectionList targetID={metadata.targetUser.id} />
                                </Panel>
    
                                <Panel>
                                    <h2>My friends:</h2>
                                    <Friends />
                                </Panel>
                            </div>
                        </div>
                    </Protect>
                )
            } else {
                setContents(
                    <Protect redirect="profile">
                        <div className="profile-authenticated">
                            <h1>{user!.firstname}'s Profile</h1>
    
                            <div className="profile-grid">
                                <Panel>
                                    <h2>About me:</h2>
                                    <p>{user!.firstname} {user!.lastname}</p>
                                    <p>Recipin Member since: {metadata.formattedDate}</p>
                                    <Divider />
                                    <p>30 recipes</p>
                                    <p>2 collections</p>
                                </Panel>
    
                                <Panel>
                                    {/* include number of collections */}
                                    <h2>My collections ({ metadata.collections.length || 0 }):</h2>
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
        }
    }, [metadata])

    // STEP 3: mount the UI
    return contents
}