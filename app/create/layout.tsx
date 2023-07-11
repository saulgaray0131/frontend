export default function CreateLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className='flex flex-col items-start justify-start h-[calc(100vh-64px)] w-screen bg-gray-200'>
        {children}
      </main>
    )
  }