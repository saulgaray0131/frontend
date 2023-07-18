import { useEffect, useRef, useState } from "react";
import { DotPulse } from '@uiball/loaders'
import config from "../config";


interface UserData {
    id: number,
    username: string,
    url: string,
    uuid: string
}

interface Props {
    user: UserData,
    id: number,
    title: string,
    fetchChats: Function,
    setShowMenu: Function
}

interface ChatLine {

    id: number,
    chatId: number,
    userId: number,
    text: string,
    //createdAt: number
}

export default function ChatUi(props: Props) {

    const [chatLines, setChatLines] = useState<ChatLine[]>([]);
    const [textVal, setTextVal] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const sendChat = async (text: string) => {
        if (text) {
            setChatLines([...chatLines, {
                id: chatLines.length + 1000,
                chatId: props.id,
                text: text,
                userId: props.user.id
            }])

            setLoading(true);

            fetch(config().apiUrl + '/api/chat', {
                method: 'POST',
                body: JSON.stringify({
                    user: props.user,
                    line: {
                        chatId: props.id,
                        text: text
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${authToken}`,
                }
            })
                .then(results => results.json())
                .then((data: ChatLine[]) => {
                    setChatLines([...chatLines, data[0], data[1]])
                    setLoading(false);
                    props.fetchChats();
                });
        }
    }


    useEffect(() => {
        if (props.id != 0) {

            fetch(config().apiUrl + '/api/chatdata', {
                method: 'POST',
                body: JSON.stringify({
                    user: props.user,
                    chatId: props.id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${authToken}`,
                }
            })
                .then(results => results.json())
                .then((data) => {
                    //console.log(data);
                    setChatLines(data.lines);
                });
        }
    }, [props.id]);

    useEffect(() => {
        if (chatEndRef.current)
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatLines])

    if (props.id == 0) {
        return (
            
            <div className='w-full h-full flex flex-col justify-center items-center p-4 pb-8'>
                <div className='w-180 h-4/5 dark:bg-zinc-800 rounded shadow'>
                    <div className=' dark:bg-zinc-800 rounded-t p-2 pb-4 border-b dark:border-zinc-400 flex-shrink-0'>
                        <h1 className='dark:text-zinc-200 text-2xl font-bold text-center'>Explore</h1>
                    </div>

                    <div className='grid grid-cols-2 p-8 place-items-center gap-4'>
                        <div className='flex flex-col'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mx-auto dark:text-zinc-200">
                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                            </svg>
                            <p className='dark:text-zinc-200 text-center'>Examples</p>
                        </div>

                        <div className='flex flex-col'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mx-auto dark:text-zinc-200">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                            </svg>
                            <p className='dark:text-zinc-200 text-center'>Capabilites</p>
                        </div>


                        <div className='rounded dark:bg-zinc-600 p-2 h-20 w-64 hover:dark:bg-zinc-500' onClick={() => props.setShowMenu(true)}>
                            <p className='dark:text-zinc-100 text-sm font-medium'>{'"Tell me your story. What kind of things have you done?"'}</p>
                        </div>
                        <div className='rounded dark:bg-zinc-600 p-2 h-20 w-64'>
                            <p className='dark:text-zinc-100 text-sm font-medium'>Chat with 30+ distinct personalites. All completely unique</p>
                        </div>
                        <div className='rounded dark:bg-zinc-600 p-2 h-20 w-64 hover:dark:bg-zinc-500' onClick={() => props.setShowMenu(true)}>
                            <p className='dark:text-zinc-100 text-sm font-medium'>{'"What kind of food do you eat? Make a recipe that I can use to make something"'}</p>
                        </div>
                        <div className='rounded dark:bg-zinc-600 p-2 h-20 w-64'>
                            <p className='dark:text-zinc-100 text-sm font-medium'>GPT based chat bot responds in character, using chosen personality</p>
                        </div>
                        <div className='rounded dark:bg-zinc-600 p-2 h-20 w-64 hover:dark:bg-zinc-500' onClick={() => props.setShowMenu(true)}>
                            <p className='dark:text-zinc-100 text-sm font-medium'>{'"How would you solve this puzzle. ..."'}</p>
                        </div>
                        <div className='rounded dark:bg-zinc-600 p-2 h-20 w-64'>
                            <p className='dark:text-zinc-100 text-sm font-medium'>Create as many chats as you like. Chats are saved to your device for easy access</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-col gap-4 rounded p-4 pb-8'>
            <h1 className='dark:text-zinc-100 font-bold text-lg'>{props.title}</h1>
            <div className='w-full h-full flex flex-col gap-3 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-oxford-blue-700 dark:scrollbar-thumb-zinc-800 scrollbar-track-zinc-200'>
                {chatLines.map((val: ChatLine) => {

                    if (props.user.id == val.userId) {
                        return (
                            <div className='flex flex-row self-end max-w-[95%] gap-1' key={val.id}>

                                <div key={val.id} className='h-fit bg-oxford-blue-500 dark:bg-zinc-700 rounded p-2'>
                                    <p className='text-sm font-sans dark:text-zinc-200'>{val.text}</p>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 dark:text-zinc-200">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>

                            </div>
                        )
                    } else {
                        return (
                            <div className='flex flex-row self-start max-w-[95%] gap-0 md:gap-2' key={val.id}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 dark:text-zinc-200">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                </svg>

                                <div key={val.id} className='h-fit bg-oxford-blue-400 dark:bg-zinc-800 rounded p-1 md:p-4'>
                                    <p className='text-sm font-sans dark:text-zinc-200'>{val.text}</p>
                                </div>


                            </div>
                        )
                    }

                })}

                {loading ?
                    <div className='flex flex-row self-start max-w-[95%] gap-0 md:gap-2' >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 dark:text-zinc-200">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>

                        <div className='h-fit bg-oxford-blue-400 dark:bg-zinc-800 rounded p-1 md:p-4'>
                            <DotPulse
                                size={40}
                                speed={1.3}
                                color="white"
                            />
                        </div>


                    </div>
                    : null
                }

                <div ref={chatEndRef} />


            </div>

            <div className='flex flex-row mx-auto w-full md:w-4/5 px-4 gap-2 mt-auto'>
                <textarea onChange={e => setTextVal(e.target.value)} placeholder='Chat with your AI here...' value={textVal} className='w-full h-16 min-h-[4rem] max-h-24 p-2 focus:outline-none rounded-lg shadow-md dark:bg-zinc-600 dark:text-zinc-200 placeholder-zinc-400'>
                </textarea>
                <button onClick={() => { sendChat(textVal); setTextVal('') }} className='bg-oxford-blue-500 hover:bg-oxford-blue-600 dark:bg-zinc-600 focus:ring-oxford-blue-300 focus:outline-none text-bold w-24 h-full rounded-lg shadow-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mx-auto text-zinc-300">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}