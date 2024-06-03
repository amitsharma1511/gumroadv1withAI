import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AuthButton from "@/components/AuthButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="max-w-5xl mx-auto p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold brown-600">Gumroad</h1>
              <p className="text-lg">
                Share and sell your digital goods with just a link.
              </p>
            </div>
            <div>
              <AuthButton />
            </div>
          </header>
          {children}
          <footer className="mt-8 flex justify-between items-center space-x-4 text-gray-500 text-sm">
            <nav className="flex space-x-4">
              <a href="#" className="text-blue-500">
                About
              </a>
              <span>&bull;</span>
              <a href="#" className="text-blue-500">
                FAQ
              </a>
              <span>&bull;</span>
              <a href="#" className="text-blue-500">
                Twitter
              </a>
            </nav>
            <p className="mt-4 text-center">
              Copyright &copy; 2024 Little Big Things, LLC.
              <br></br>A project made with help of AI.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
