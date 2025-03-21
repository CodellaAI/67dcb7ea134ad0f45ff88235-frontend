
import './globals.css'

export const metadata = {
  title: 'Click to Insert App',
  description: 'A simple app that inserts data into MongoDB with a button click',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
