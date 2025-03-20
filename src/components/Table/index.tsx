export const Table = ({ children }: { children: React.ReactNode }) => {
    return <table className='table table-lg bg-base-300'>{children}</table>
}


export { Thead, Th } from '@/components/Table/Thead'
export { Tbody, Tr, Td } from '@/components/Table/Tbody'
