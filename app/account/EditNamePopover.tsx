import { Popover } from "@headlessui/react";
import { useState } from "react";



interface UserData {
    id: number,
    username: string,
    url: string,
    uuid: string
}

interface Props {
    user: UserData,
    setUser: Function
}

export default function EditNamePopover(props: Props) {

    const [nameValue, setNameValue] = useState('');

    const sendNameChange = async () => {
        if(nameValue) {

            fetch('/api/account/edit/username', {
                method: 'POST',
                body: JSON.stringify({
                    user: props.user,
                    username: nameValue
                }),
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${authToken}`,
                }
            })
                .then(results => results.json())
                .then((userData: UserData) => {
                    props.setUser(userData);
                });
        }
    }

    return (
        <Popover className='relative'>
            <Popover.Button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 bg-transparent fill-current text-oxford-blue-200">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
            </Popover.Button>

            <Popover.Panel className='absolute z-10 -inset-x-56'>
                <div className='bg-oxford-blue-200 flex flex-col w-64 h-32 rounded-md p-3 gap-4'>
                    <input type='text' placeholder='Username' className='w-full h-1/3 rounded-sm px-2 focus:outline-none' value={nameValue} onChange={e => setNameValue(e.target.value)}></input>
                    <div className='flex flex-row justify-between gap-2'>
                        <Popover.Button className='bg-oxford-blue-500 text-white rounded-md p-3 text-sm hover:bg-oxford-blue-600 active:bg-oxford-blue-700'>Cancel</Popover.Button>
                        <Popover.Button className='bg-oxford-blue-500 text-white rounded-md p-3 text-sm hover:bg-oxford-blue-600 active:bg-oxford-blue-700 w-full' onClick={sendNameChange}>Save</Popover.Button>
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    )
}