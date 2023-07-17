import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import config from "../config";

interface Props {
    setIsOpen: Function,
    isOpen: boolean,
    user: UserData,
    updateChats: Function,
    setChatId: Function
}

interface b_data {
    id: number,
    name: string,
    description: string
}

export default function CreateChatDialog(props: Props) {

    const [botData, setBotData] = useState([])

    useEffect(() => {
        fetch(config().apiUrl + '/api/bots')
            .then(results => results.json())
            .then(data => {
                setBotData(data)
                //console.log(data)
            });
    }, [])

    const createChat = async (id: number) => {
        fetch(config().apiUrl + '/api/create/chat', {
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
            .then((data: ChatData) => {
                props.setIsOpen(false);
                props.updateChats();
                props.setChatId(data.id);
                //console.log(data);
            });
    }

    return (
        <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)} className="relative z-50 dark">

            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-96 rounded bg-oxford-blue-400 dark:bg-zinc-800 shadow-md">
                    <Dialog.Title className='text-black dark:text-zinc-100 font-bold text-center text-2xl border-b border-white/30 p-2 pt-4'>Select a personality</Dialog.Title>

                    <div className='flex flex-col w-full p-2 h-124 overflow-y-auto scrollbar-thin scrollbar-thumb-oxford-blue-700 dark:scrollbar-thumb-zinc-900 scrollbar-track-zinc-200'>
                        {botData.map((data: b_data) => {
                            return (
                                <div className='flex flex-row w-full h-16 p-2 gap-2 hover:bg-oxford-blue-600 dark:hover:bg-zinc-500 rounded-lg' key={data.id} onClick={() => createChat(data.id)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 text-zinc-200">
                                        <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 00-.266.112L8.78 21.53A.75.75 0 017.5 21v-3.955a48.842 48.842 0 01-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clipRule="evenodd" />
                                    </svg>

                                    <div className='flex flex-col'>
                                        <h1 className='text-black dark:text-zinc-100 font-bold text-base'>{data.name}</h1>
                                        <p className='text-black dark:text-zinc-300 font-normal text-xs line-clamp-1'>{data.description}</p>
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