export const Tbody = ({ children }: { children: React.ReactNode }) => {
    return <tbody>{children}</tbody>
}


export const Tr = ({ children, ...props }: { children: React.ReactNode }) => {
    return <tr className='hover:bg-base-200' {...props}>{children}</tr>
}


export const Td = ({ className, hiddenMobile, children }: { className?: string, hiddenMobile?: boolean, children: React.ReactNode }) => {
    return <td className={`text-xs font-semibold opacity-60 ${className} ${hiddenMobile && 'hidden md:table-cell'}`}>{children}</td>
}