import Link from "next/link"
import { GiArtificialHive } from "react-icons/gi"

interface LogoProps {
  className?: string;
  logoSize?:string; 
}

const Logo = ({ className = 'text-2xl' ,logoSize='26' }: LogoProps) => {
  return (
    <div className='flex flex-col items-center gap-2'>
        <GiArtificialHive size={logoSize} className="text-primary flex-shrink-0"  />
        <Link className={`${className} font-mono font-bold text-2xl`} href='/'>Truffle.Ai</Link>
      </div>

  )
}

export default Logo
