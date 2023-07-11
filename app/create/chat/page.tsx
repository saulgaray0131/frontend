'use client'
import Auth from "@/app/Auth";
import AiList from "@/app/chat/AiList";
import { useState } from "react";

interface selectData {
  id: number
}

interface UserData {
  id: number,
  username: string,
  url: string,
  uuid: string
}

export default function Page() {
  const [user, setUser] = useState<UserData>({
    id: 0,
    username: '',
    url: '',
    uuid: ''
  });

  const selectAi = async (data: selectData) => {
    fetch('/api/create/chat', {
      method: 'POST',
      body: JSON.stringify({
        aiId: data.id,
        user: user
      }),
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${authToken}`,
      }
    })
      .then(results => results.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <div className='flex flex-col h-4/5 w-2/3 bg-gray-300 rounded-md'>
        <div className='w-full bg-transparent p-4'>
          <Auth setUser={setUser} />
          <AiList onClick={selectAi} type='flex-row' />
        </div>
      </div>
    </div>
  )
}