'use client'

import { FaPlus } from 'react-icons/fa'

export function CreateButton({ onClick }: { onClick: any }) {
    return <button className='btn btn-ghost' onClick={onClick}><FaPlus /></button>
}
