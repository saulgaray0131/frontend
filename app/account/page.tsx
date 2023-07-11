'use client'
import { useState } from "react";
import Auth from "../Auth";
import EditNamePopover from "./EditNamePopover";

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


  console.log(user)
  if (user.id === 0)
    return <Auth setUser={setUser}></Auth>; // Loading...

  return (
    <main className="flex flex-col justify-center h-[calc(100vh-64px)] w-screen bg-gradient-to-br from-oxford-blue-300 to-oxford-blue-400">
      <Auth setUser={setUser}></Auth>
      <div className='flex lg:flex-col flex-row lg:w-1/3 lg:h-1/2 h-max w-max rounded-md shadow-md bg-oxford-blue-700 mx-auto'>
        <div className='px-4 pt-4 pb-2 border-b border-white/40'>
          <h1 className='text-oxford-blue-200 text-center font-bold text-2xl font-mono'>My Session</h1>
        </div>
        <div className='flex flex-row p-4 gap-10'>
          <div className='flex flex-col'>
            <button className='text-oxford-blue-200 focus:text-white font-mono text-sm rounded-lg p-2 focus:bg-oxford-blue-600 focus:outline-none focus:ring-1 focus:ring-oxford-blue-700' autoFocus>
              Settings
            </button>
          </div>

          <div className='flex flex-col w-full px-2'>
            <div className='flex flex-row w-full justify-between border-b border-white/40 p-2 pb-4 pt-4'>
              <h2 className='text-oxford-blue-200 text-sm'>Username</h2>

              <div className='flex flex-row gap-2'>
                <p className='text-oxford-blue-200 text-sm'>{user.username}</p>
                <EditNamePopover user={user} setUser={setUser}></EditNamePopover>
              </div>
            </div>

            <div className='flex flex-row w-full justify-between border-b border-white/40 p-2 pb-4 pt-4'>
              <h2 className='text-oxford-blue-200 text-sm'>UUID</h2>
              <p className='text-oxford-blue-200 text-sm'>{user.uuid}</p>
            </div>

            <div className='flex flex-row w-full justify-between border-b border-white/40 p-2 pb-4 pt-4'>
              <h2 className='text-oxford-blue-200 text-sm'>ID</h2>
              <p className='text-oxford-blue-200 text-sm'>{user.id}</p>
            </div>


          </div>
        </div>
      </div>
    </main>
  )
}