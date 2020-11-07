import React from "react";
import MessageList from "../containers/MessageList"
import UserAside from "../components/UserAside"

const MessageTimeLine = props => {
    return (
        <div className="row">
            <UserAside  
                profileImagUrl={props.profileImageUrl}
                username={props.username}
            />
            <MessageList />
        </div>
    )
}
export default MessageTimeLine;