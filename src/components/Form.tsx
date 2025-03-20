export const Form = ({ onSubmit, children }: { onSubmit: any, children: React.ReactNode }) => {
    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
          {children}

          <div className='modal-action'>
            <button className='btn btn-ghost' type='submit'>Enviar</button>
          </div>
        </form>
    )
}