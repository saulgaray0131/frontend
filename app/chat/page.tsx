'use client'
import { useState, useEffect, useRef } from "react";
import Auth from "../Auth";
import ChatUi from "./ChatUi";
import CreateChatDialog from "./CreateChatDialog";
import { Transition } from "@headlessui/react";
import config from "../config";
import 'animate.css';

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
    const [chatId, setChatId] = useState(0);
    const [menuShowing, setMenuShowing] = useState(true);
    const [showSideButton, setShowSideButton] = useState(!menuShowing);
    const chatRef = useRef<HTMLDivElement>(null);

    const fetchChats = async () => {
        if (user && user.id != 0) {
            const response = await fetch(config().apiUrl + '/api/chats', {
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
        fetch(config().apiUrl + '/api/bots')
            .then(results => results.json())
            .then((data: Array<BotData>) => {
                console.log(data);
                setBotData(data);
            });
    }, [])


    const getNavTitle = () => {
        if (chatId == 0)
            return "";

        return (
            "Chatting with " + botData.find(val => {
                return chatData.find(val => {
                    return val.id == chatId;
                })?.aiuserId == val.id;
            })?.name
        )
    }

    useEffect(() => {
        if (chatRef.current)
            chatRef.current.className += " bg-zinc-600";
    }, [chatId])

    return (
        <div className='dark'>
            <div className='bg-oxford-blue-900 dark:bg-zinc-900 flex flex-col justify-center items-center h-16 w-full'>

                <div className='animate__animated animate__bounce'>
                    <h1 className='dark:text-zinc-200 text-2xl font-bold'>Cult Chat <span className='dark:bg-zinc-800 rounded p-2'>AI</span>

                    </h1>
                </div>
            </div>

            <main className="flex flex-row items-center justify-start h-[calc(100vh-64px)] w-screen dark:bg-zinc-500">
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
                    beforeEnter={() => setShowSideButton(false)}
                    afterLeave={() => setShowSideButton(true)}
                >

                    <div className='flex flex-col h-full w-36 md:w-80 bg-oxford-blue-400 dark:bg-zinc-800 border-r border-white/40 dark:border-zinc-400 justify-center'>

                        <div className='flex flex-row gap-2 p-2 pt-3 border-b border-white/40 overflow-hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dark:text-zinc-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <h1 className='text-black dark:text-zinc-100 font-bold text-center text-lg'>My Chats</h1>

                            <button className='ml-auto' onClick={() => setIsDialogOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dark:text-zinc-300 hover:bg-zinc-700 rounded-lg" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>

                        <div className={'flex flex-col items-start justify-start overflow-y-auto scrollbar-thin p-2 scrollbar-thumb-oxford-blue-700 dark:scrollbar-thumb-zinc-800 scrollbar-track-zinc-200 w-full h-full bg-transparent overflow-hidden'}>
                            {chatData.map((data: ChatData) => {
                                const chatBot = botData.find((val: BotData) => {
                                    if (data.aiuserId == val.id)
                                        return true;

                                    return false;
                                });

                                if (!chatBot)
                                    return null;

                                return (
                                    <div className={'flex flex-row w-full h-16 p-2 gap-2 hover:bg-oxford-blue-600 dark:hover:bg-zinc-500 rounded-lg' + (data.id == chatId ? ' dark:bg-zinc-600 dark:hover:bg-zinc-600' : ' ')}
                                        key={data.id} onClick={() => setChatId(data.id)}
                                        ref={data.id == chatId ? chatRef : null}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 text-zinc-200">
                                            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 00-.266.112L8.78 21.53A.75.75 0 017.5 21v-3.955a48.842 48.842 0 01-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clipRule="evenodd" />
                                        </svg>

                                        <div className='flex flex-col'>

                                            <h1 className='text-black dark:text-zinc-100 font-bold text-base'>{chatBot.name}</h1>
                                            <p className='text-black dark:text-zinc-300 font-normal text-xs line-clamp-1'>{data.lastChat}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <button className='w-4 h-64 bg-oxford-blue-500 dark:bg-zinc-800 rounded-r-lg transition ease-in duration-300 hover:scale-110 hover:bg-zinc-700' onClick={() => setMenuShowing(!menuShowing)}></button>
                </Transition>

                {showSideButton ?
                    <button className='w-4 h-64 dark:bg-zinc-800 rounded-r-lg transition ease-in duration-300 hover:scale-110 hover:bg-zinc-700' onClick={() => setMenuShowing(!menuShowing)}></button> :
                    null
                }



                <ChatUi title={getNavTitle()} user={user} id={chatId} fetchChats={fetchChats}></ChatUi>


                <CreateChatDialog user={user} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} updateChats={fetchChats}></CreateChatDialog>
            </main>
        </div >
    )
}