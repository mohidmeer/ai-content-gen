import React from 'react'

const Header = ({title}:{title:string}) => {
  return (
    <div className=''>
        <h3 className='text-2xl font-bold'>{title}</h3>
    </div>
  )
}

export default Header
