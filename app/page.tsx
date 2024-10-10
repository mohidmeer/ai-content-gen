import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <NavBar/>
      <div className="h-screen flex flex-col justify-center items-center relative bg-hero">

        <h1 className="text-center">
          Generate <span className="bg-text-gradient text-transparent"> viral-ready </span>  <br/> clips in seconds
        </h1>
        <p className="text-2xl mt-5 text-center">
          Your all-in-one tool for creating AI voiceovers, engaging <br/> subtitles, optimized gameplay, and more.
        </p>

        <Button asChild className="mt-5" size={'lg'}>
          <Link href={'/auth/sign-in'} className="text-lg">Try Truffle.Ai Now</Link>
        </Button>

        {/* <div className="mt-5">
            <p className="text-xl">Powering top creators on</p>
             
        </div> */}


      </div>

      
    </div>
  );
}
