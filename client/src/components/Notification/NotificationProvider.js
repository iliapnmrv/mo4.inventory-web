import React from 'react'
import {v4} from 'uuid'
import Notification from './Notification';
import './Notifications.css'


export default function NotificationProvider(props) {

    const notifications = [
        {
            id: v4(),
            type: "SUCCESS",
            message: "Hellow world"
        },
        {
            id: v4(),
            type: "SUCCESS",
            message: "Hellow world"
        }
    ]

    console.log(notifications);

    return (
        <div>
            <div className="notification-wrapper">
                {notifications.map(note=>{
                    return <Notification key={note.id} {...note} />
                })}
            </div>
            {props.children}
        </div>
    )
}
