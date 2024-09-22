import { Link } from "react-router-dom";
import Post from "./Post";
import { Status } from "tweeter-shared";
import useUserNavigationListener from "../userNavigation/UserListenerHook";

interface Props {
    status: Status,
}

const StatusItem = (props: Props) => {
    const { status } = props;
    const { navigateToUser } = useUserNavigationListener();

    return (
        <div className="col bg-light mx-0 px-0">
            <div className="container px-0">
            <div className="row mx-0 px-0">
                <div className="col-auto p-3">
                <img
                    src={status.user.imageUrl}
                    className="img-fluid"
                    width="80"
                    alt="Posting user"
                />
                </div>
                <div className="col">
                <h2>
                    <b>
                    {status.user.firstName} {status.user.lastName}
                    </b>{" "}
                    -{" "}
                    <Link
                    to={status.user.alias}
                    onClick={(event) => navigateToUser(event)}
                    >
                    {status.user.alias}
                    </Link>
                </h2>
                {status.formattedDate}
                <br />
                <Post status={status} />
                </div>
            </div>
            </div>
        </div>);
}

export default StatusItem;