import './globals.css'

export const metadata = {
  title: 'Query GPT',
  description: 'Create queries using ChatGPT'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100'>
        {children}
      </body>
    </html>
  )
}
