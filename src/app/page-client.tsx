'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FaPencil } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'

import { API } from '@/api/client'
import { DeleteButton } from '@/components/DeleteButton'
import { Modal } from '@/components/Modal'

import { ExperiencesI } from './interfaces'


const schema = z.object({
  id: z.number().nullable(),
  company: z.string(),
  period: z.string(),
  role: z.string(),
  description: z.string()
})

export default function ExperiencesClient({ experiences }: { experiences: ExperiencesI[] }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const [experiencesData, setExperiences] = useState(experiences)

  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = (experience: ExperiencesI | null = null) => {
    setValue('id', experience ? experience.id : null)
    setValue('company', experience ? experience.company : '')
    setValue('period', experience ? experience.period : '')
    setValue('role', experience ? experience.role : '')
    setValue('description', experience ? experience.description : '')

    modalRef.current?.showModal()
  }

  const onFormSubmit = async (formData: any) => {
    const { id, ...payload } = formData

    const response = !!id ? await API.put(`/experiences/${id}`, formData) : await API.post('/experiences', payload)
    const data: ExperiencesI[] = await response.json()

    setExperiences(data)
    modalRef.current?.close()
  }

  const handlerDeleteButton = async (id: number) => {
    const response = await API.delete(`/experiences/${id}`)
    const data: ExperiencesI[] = await response.json()

    setExperiences(data)
  }

  return (
    <>
      <div className='my-10 w-3/5'>
        <table className='table table-lg bg-base-300'>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Periodo</th>
              <th>Cargo</th>

              <th className='flex justify-end'>
                {API.hasToken() && <button className='btn btn-ghost' onClick={() => openModal()}><FaPlus /></button>}
              </th>
            </tr>
          </thead>
          <tbody>
            {experiencesData.map((experience, i) => (
              <tr className='hover:bg-base-200' key={`project-${i}`}>
                <td>
                  <span className='text-xs font-semibold opacity-60'>{experience.company}</span>
                </td>
                <td>
                  <span className='text-xs font-semibold opacity-60'>{experience.period}</span>
                </td>
                <td>
                  <span className='text-xs font-semibold opacity-60'>{experience.role}</span>
                </td>
                <td className='flex justify-end'>
                  {
                    API.hasToken() &&
                    <>
                      <button className='btn btn-ghost' onClick={() => openModal(experience)}><FaPencil /></button>
                      <DeleteButton onClick={() => handlerDeleteButton(experience.id)} />
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal modalRef={modalRef}>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onFormSubmit)}>
          <input {...register('company')} placeholder='Nome da Empresa' className='input' />
          {errors.company && <p>{errors.company.message}</p>}

          <input {...register('period')} placeholder='Periodo' className='input' />
          {errors.period && <p>{errors.period.message}</p>}

          <input {...register('role')} placeholder='Cargo' className='input' />
          {errors.role && <p>{errors.role.message}</p>}

          <textarea {...register('description')} placeholder='Descrição' className='textarea' />
          {errors.role && <p>{errors.role.message}</p>}

          <div className='modal-action'>
            <button className='btn btn-ghost' type='submit'>Enviar</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
