'use client'

import { FaTrash } from "react-icons/fa";

export function DeleteButton({ onClick }: { onClick: any }) {
    return <button onClick={onClick} className="btn btn-ghost"><FaTrash/></button>
}
