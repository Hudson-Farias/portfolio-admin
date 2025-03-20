export const Thead = ({ children }: { children: React.ReactNode }) => {
    return <thead>{children}</thead>
}


export const Th = ({ className, hiddenMobile, children }: { className?: string, hiddenMobile?: boolean, children: React.ReactNode }) => {
    return <th className={`text-white ${className} ${hiddenMobile && 'hidden md:table-cell'}`}>{children}</th>
}
