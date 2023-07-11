'use client'
import AiCard from "./AiCard";
import { useEffect, useState } from "react";

interface b_data {
    id: number,
    name: string,
    description: string
}

interface props {
    type: string,
    onClick: Function
}

export default function AiList(props: props) {
    const [botData, setBotData] = useState([])

    useEffect(() => {
        fetch('/api/bots')
            .then(results => results.json())
            .then(data => {
                setBotData(data)
                console.log(data)
            });
    }, [])

    return (
        <div className={`flex ${props.type} items-start justify-start overflow-x-auto scroll-smooth scroll-p-4 w-full h-full gap-4 bg-slate-300 rounded-lg`}>
            {botData.map((data: b_data) => {
                return <AiCard onClick={props.onClick} key={data.id} id={data.id} img='' name={data.name} desc={data.description}/>
            })}
        </div>
    )

}