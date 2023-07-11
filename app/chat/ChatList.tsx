'use client'
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";

interface b_data {
    id: number,
    aiuserId: number,
    userId: number,
    lastChat: string
}

interface UserData {
    id: number,
    username: string,
    url: string,
    uuid: string
}

interface props {
    type: string,
    user: UserData,
    onClick: Function
}

export default function ChatList(props: props) {
    const [botData, setBotData] = useState([])

    useEffect(() => {
        console.log(props)
        if(props.user && props.user.id != 0) {
            console.log('ss')
            fetch('/api/chats', {
                method: 'POST',
                body: JSON.stringify(props.user),
                headers: {
                  'Content-Type': 'application/json',
                  //'Authorization': `Bearer ${authToken}`,
                }
              })
                .then(results => results.json())
                .then((data) => {

                  if(data != botData) {
                    setBotData(data);
                    console.log("New chat data...");
                  }
                });
        } else {
            //LOADING..
        }
    }, [props.user])

    if(!botData) {
        return (null)
    }

    return (
        <div className={`flex ${props.type} items-start justify-start overflow-auto scrollbar-thin scrollbar-thumb-oxford-blue-700 scrollbar-track-oxford-blue-100 w-full h-full bg-transparent`}>
            {botData.map((data: b_data) => {
                return <ChatCard onClick={props.onClick} key={data.id} id={data.id} aiuserId={data.aiuserId} lastChat={data.lastChat} />
            })}
        </div>
    )

}