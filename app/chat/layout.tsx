export default function ChatLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="dark">
        {children}
      </section>
    )
  } 