'use client'
import { useState } from "react";
import Auth from "../Auth";
import ChatList from "./ChatList"
import ChatUi from "./ChatUi";
import CreateChatDialog from "./CreateChatDialog";

interface UserData {
    id: number,
    username: string,
    url: string,
    uuid: string
}



export default function Page() {

    let [isDialogOpen, setIsDialogOpen] = useState(false);

    const [user, setUser] = useState<UserData>({
        id: 0,
        username: '',
        url: '',
        uuid: ''
    });

    const [chatId, setChatId] = useState(0);

    return (
        <main className="flex flex-row items-start justify-start h-[calc(100vh-64px)] w-screen bg-gradient-to-br from-oxford-blue-300 to-oxford-blue-400">
            <Auth setUser={setUser}></Auth>
            <div className='flex flex-col h-full w-36 md:w-96 bg-oxford-blue-400 border-r border-white/40 justify-center'>
                <div className='flex flex-row gap-2 p-2 pt-3 border-b border-white/40'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    <h1 className='text-black font-bold text-center text-lg'>My Chats</h1>

                    <button className='ml-auto' onClick={() => setIsDialogOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
                <ChatList type='flex-col' user={user} onClick={setChatId}></ChatList>
            </div>


            <ChatUi user={user} id={chatId}></ChatUi>


            <CreateChatDialog user={user} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}></CreateChatDialog>
        </main>
    )
}