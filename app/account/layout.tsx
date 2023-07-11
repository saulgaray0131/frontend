export default function CreateChatLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className='h-full w-full'>
        {children}
      </section>
    )
  }