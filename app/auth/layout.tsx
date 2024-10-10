import Logo from "@/components/Logo";
import { ThemeSwitch } from "@/components/ThemeSwitch";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="bg-hero">
        <div className="flex flex-col  justify-center items-center  h-screen max-sm:px-6  mx-auto  max-w-[500px]  ">
            <div className="absolute right-2 top-2">
            <ThemeSwitch />
            </div>
            
            <div className="bg-card w-full p-10 border rounded-md shadow-2xl shadow-primary/30 ">
              <div className="flex justify-center items-center">
                <Logo logoSize="36" />
              </div>
              {children}
            </div>

        </div>
      </div>
    );
  }
  