'use client'
import { useState, useEffect } from "react";
import Auth from "../Auth";
import ChatUi from "./ChatUi";
import CreateChatDialog from "./CreateChatDialog";
import { Transition } from "@headlessui/react";
import config from "../config";

export default function Page() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [user, setUser] = useState<UserData>({
        id: 0,
        username: '',
        url: '',
        uuid: ''
    });
    const [botData, setBotData] = useState<Array<BotData>>([]);
    const [chatData, setChatData] = useState<Array<ChatData>>([]);

    const fetchChats = async () => {
        if (user && user.id != 0) {
            const response = await fetch(config().apiUrl +  '/api/chats', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${authToken}`,
                }
            });

            const data: Array<ChatData> = await response.json();
            setChatData(data);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [user])

    useEffect(() => {
        fetch(config().apiUrl +  '/api/bots')
            .then(results => results.json())
            .then((data: Array<BotData>) => {
                console.log(data);
                setBotData(data);
            });
    }, [])

    const [chatId, setChatId] = useState(0);
    const [menuShowing, setMenuShowing] = useState(true);


    return (
        <main className="flex flex-row items-center justify-start h-[calc(100vh-64px)] w-screen bg-gradient-to-br from-oxford-blue-300 translate-x- to-oxford-blue-400 trans trans">
            <Auth setUser={setUser}></Auth>
            <Transition
                show={menuShowing}
                enter='transition-transform ease-linear duration-300'
                enterFrom="-translate-x-[95%]"
                enterTo="translate-x-0"
                leave="transition-transform ease-linear duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-[95%]"
                className='h-full w-fit flex flex-row items-center'
            >

                <div className='flex flex-col h-full w-36 md:w-88 bg-oxford-blue-400 border-r border-white/40 justify-center'>

                    <div className='flex flex-row gap-2 p-2 pt-3 border-b border-white/40 overflow-hidden'>
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

                    <div className={'flex flex-col items-start justify-start overflow-y-auto scrollbar-thin scrollbar-thumb-oxford-blue-700 scrollbar-track-oxford-blue-100 w-full h-full bg-transparent overflow-hidden'}>
                        {chatData.map((data: ChatData) => {
                            const chatBot = botData.find((val: BotData) => {
                                if (data.aiuserId == val.id)
                                    return true;

                                return false;
                            });

                            if (!chatBot)
                                return null;

                            return (
                                <div className='flex flex-row w-full h-16 p-2 border-b border-white/40 gap-2 hover:bg-oxford-blue-600 active:bg-oxford-blue-700' key={data.id} onClick={() => setChatId(data.id)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 flex-shrink-0">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className='flex flex-col'>

                                        <h1 className='text-black font-bold text-lg'>{chatBot.name}</h1>
                                        <p className='text-black font-normal text-sm line-clamp-1'>{data.lastChat}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button className='w-4 h-24 bg-oxford-blue-500 rounded' onClick={() => setMenuShowing(!menuShowing)}></button>
            </Transition>

            {menuShowing ?
                null :
                <button className='w-4 h-24 bg-oxford-blue-500 rounded' onClick={() => setMenuShowing(!menuShowing)}></button>
            }

            <ChatUi user={user} id={chatId}></ChatUi>


            <CreateChatDialog user={user} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} updateChats={fetchChats}></CreateChatDialog>
        </main>
    )
}