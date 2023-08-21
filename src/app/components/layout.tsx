import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      
      <main>
        {children}
        <Toaster />
      </main>
    </div>
  );
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }