import Link from "next/link"
import { GiArtificialHive } from "react-icons/gi"

interface LogoProps {
  className?: string;
  logoSize?:string; 
}

const Logo = ({ className = 'text-2xl' ,logoSize='26' }: LogoProps) => {
  return (
    <div className='flex items-center gap-2'>
        <GiArtificialHive size={logoSize} className="text-primary" />
        <Link className={`${className} font-mono font-bold`} href='/'>Truffle.Ai</Link>
      </div>

  )
}

export default Logo
