import { UserCardType } from "../../util/types";
import Card from "./Card";

const UserCard: UserCardType = ({ extraStyles, user }) => {
    return (
        <Card extraStyles={extraStyles}>
            <div className="avatar"></div>
            <h3>{user.firstname} {user.lastname.substring(0,1)}.</h3>
            <h4>@{user.handle}</h4>
        </Card>
    )
}

export default UserCard;