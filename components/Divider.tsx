import React from 'react'

const Divider = ({text}:{text:string}) => {
    return (
        <div className="relative mt-5">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">{text}</span>
            </div>
        </div>
    )
}

export default Divider
