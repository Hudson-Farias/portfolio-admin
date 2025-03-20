'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { API } from '@/api/client'

import { CreateButton } from '@/components/Buttons/Create'
import { DeleteButton } from '@/components/Buttons/Delete'
import { UpdateButton } from '@/components/Buttons/Update'
import { Table, Thead, Th, Tbody, Tr, Td } from '@/components/Table'
import { Modal } from '@/components/Modal'
import { Form } from '@/components/Form'

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
      <div className='my-10 md:w-3/5'>
        <Table>
          <Thead>
            <Th>Empresa</Th>
            <Th hiddenMobile={true}>Periodo</Th>
            <Th hiddenMobile={true}>Cargo</Th>

            <Th className='flex justify-end'>
              {API.hasToken() && <CreateButton onClick={() => openModal()} />}
            </Th>
          </Thead>
          <Tbody>
            {experiencesData.map((experience, i) => (
              <Tr key={`experience-${i}`}>
                <Td>{experience.company}</Td>
                <Td hiddenMobile={true}>{experience.period}</Td>
                <Td hiddenMobile={true}>{experience.role}</Td>
                <Td className='flex justify-end'>
                  {
                    API.hasToken() &&
                    <>
                      <UpdateButton onClick={() => openModal(experience)} />
                      <DeleteButton onClick={() => handlerDeleteButton(experience.id)} />
                    </>
                  }
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <Modal modalRef={modalRef}>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <input {...register('company')} placeholder='Nome da Empresa' className='input' />
          {errors.company && <p>{errors.company.message}</p>}

          <input {...register('period')} placeholder='Periodo' className='input' />
          {errors.period && <p>{errors.period.message}</p>}

          <input {...register('role')} placeholder='Cargo' className='input' />
          {errors.role && <p>{errors.role.message}</p>}

          <textarea {...register('description')} placeholder='Descrição' className='textarea' />
          {errors.role && <p>{errors.role.message}</p>}
        </Form>
      </Modal>
    </>
  )
}
