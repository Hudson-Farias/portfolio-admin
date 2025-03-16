'use client'

import { forwardRef } from "react";

export const Modal = forwardRef(({ modalRef, children, }: { modalRef: any, children: React.ReactNode }) => {
    return (
        <dialog className='modal' ref={modalRef}>
            <div className='modal-box bg-base-300'>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                {children}
            </div>
        </dialog>
    )
})