
import Link from "next/link"
import Page from "./chat/page"

export default function Home() {
  return (
    

      <main className="flex flex-col items-start justify-start min-h-screen w-full ">

        <div className='flex flex-col items-center justify-start h-screen w-full bg-gray-200'>

          <div className='flex flex-col items-center justify-center bg-transparent h-[calc(100vh-64px)] rounded-lg'>
            <Link href="/chat">Chat</Link>
          </div>
        </div>
      </main>

  )
}
