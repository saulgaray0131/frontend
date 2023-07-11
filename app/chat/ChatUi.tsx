import { useEffect, useState } from "react";
import { DotPulse } from '@uiball/loaders'



interface UserData {
    id: number,
    username: string,
    url: string,
    uuid: string
}

interface Props {
    user: UserData,
    id: number
}

interface ChatData {
    user: UserData,

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

    const sendChat = async (text: string) => {
        if (text) {
            setChatLines([...chatLines, {
                id: chatLines.length + 1000,
                chatId: props.id,
                text: text,
                userId: props.user.id
            }])

            setLoading(true);

            fetch('/api/chat', {
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
                });
        }
    }


    useEffect(() => {
        if (props.id != 0) {

            console.log(props.user)

            fetch('/api/chatdata', {
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
                    console.log(data);
                    setChatLines(data.lines);
                });
        }
    }, [props.id]);

    if (props.id == 0) {
        return (
            <div className='w-full h-full flex flex-col gap-4 rounded p-4 pb-8 justify-center'>
                <h1 className='text-oxford-blue-100 font-bold text-5xl text-center'>Select a chat to begin...</h1>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-col gap-4 rounded p-4 pb-8'>

            <div className='w-full h-full flex flex-col gap-3 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-oxford-blue-700 scrollbar-track-oxford-blue-100'>
                {chatLines.map((val: ChatLine) => {

                    if (props.user.id == val.userId) {
                        return (
                            <div className='flex flex-row self-end max-w-[95%] gap-1' key={val.id}>

                                <div key={val.id} className='h-fit bg-oxford-blue-500 rounded p-2'>
                                    <p className='text-sm font-sans'>{val.text}</p>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>

                            </div>
                        )
                    } else {
                        return (
                            <div className='flex flex-row self-start max-w-[95%] gap-0 md:gap-2' key={val.id}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                </svg>

                                <div key={val.id} className='h-fit bg-oxford-blue-400 rounded p-1 md:p-4'>
                                    <p className='text-sm font-sans'>{val.text}</p>
                                </div>


                            </div>
                        )
                    }

                })}

                {loading ?
                    <div className='flex flex-row self-start max-w-[95%]' >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>

                        <div className='h-fit bg-oxford-blue-400 rounded p-1 md:p-4'>
                            <DotPulse
                                size={40}
                                speed={1.3}
                                color="black"
                            />
                        </div>


                    </div>
                    : null
                }



            </div>

            <div className='flex flex-row mx-auto w-full md:w-4/5 px-4 gap-2 mt-auto'>
                <textarea onChange={e => setTextVal(e.target.value)} placeholder='Chat with your AI here...' value={textVal} className='w-full h-16 focus:outline-none rounded-lg shadow-md'>
                </textarea>
                <button onClick={() => { sendChat(textVal); setTextVal('') }} className='bg-oxford-blue-500 hover:bg-oxford-blue-600 active:bg-oxford-blue-700 focus:ring-oxford-blue-300 focus:outline-none text-bold w-24 h-full rounded-lg shadow-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mx-auto text-black/80">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}