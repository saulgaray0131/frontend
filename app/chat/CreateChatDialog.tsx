import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import config from "../config";

interface Props {
    setIsOpen: Function,
    isOpen: boolean,
    user: UserData,
    updateChats: Function
}

interface b_data {
    id: number,
    name: string,
    description: string
}

export default function CreateChatDialog(props: Props) {

    const [botData, setBotData] = useState([])

    useEffect(() => {
        fetch(config().apiUrl +  '/api/bots')
            .then(results => results.json())
            .then(data => {
                setBotData(data)
                console.log(data)
            });
    }, [])

    const createChat = async (id: number) => {
        fetch(config().apiUrl +  '/api/create/chat', {
          method: 'POST',
          body: JSON.stringify({
            aiId: id,
            user: props.user
          }),
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${authToken}`,
          }
        })
          .then(results => results.json())
          .then((data) => {
            props.setIsOpen(false);
            props.updateChats();
            console.log(data);
          });
      }

    return (
        <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)} className="relative z-50">

            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-96 rounded bg-oxford-blue-400 shadow-md">
                    <Dialog.Title className='text-black font-bold text-center text-2xl border-b border-white/30 p-2 pt-4'>Create Chat</Dialog.Title>
                
                    <div className='flex flex-col w-full h-124 overflow-y-auto'>
                        {botData.map((data: b_data) => {
                            return (
                                <div className='flex flex-row h-16 w-full p-2 border-b border-white/30 gap-2 hover:bg-oxford-blue-500 active:bg-oxford-blue-600 items-center' key={data.id} onClick={() => createChat(data.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 flex-shrink-0">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className='flex flex-col w-full'>

                                        <h1 className='text-black font-bold text-lg'>{data.name}</h1>
                                        <p className='text-black font-normal text-sm line-clamp-1'>{data.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}