'use client'

import { FaPencil } from 'react-icons/fa6'

export function UpdateButton({ onClick }: { onClick: any }) {
    return <button className='btn btn-ghost text-white' onClick={onClick}><FaPencil /></button>
}
