'use client'
import { Url } from "next/dist/shared/lib/router/router";

interface CardProps {
    img: Url, 
    name: string, 
    desc: string,
    id: number,
    onClick: Function
}

export default function AiCard(props: CardProps) {
    return (
        <div className='flex flex-col shrink-0 items-center justify-start bg-white rounded-lg shadow-md w-60 h-92 p-2'>
            <div className='bg-black rounded-lg h-28 w-full mb-2'></div>
            <div className='self-start mb-auto'>
                <h1 className='text-black font-bold text-xl'>{props.name}</h1>
                <p className='text-black font-light text-sm'>{props.desc}</p>
            </div>
            <button onClick={() => props.onClick({id: props.id})} className='bg-blue-500 hover:bg-blue-600 active:bg-blue-400 focus:ring-blue-300 focus:outline-none w-full h-12 rounded-lg'>Action</button>
        </div>
    )
}