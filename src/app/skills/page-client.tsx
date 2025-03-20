'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { API } from '@/api/client'

import { CreateButton } from '@/components/Buttons/Create'
import { UpdateButton } from '@/components/Buttons/Update'
import { DeleteButton } from '@/components/Buttons/Delete'
import { Table, Thead, Th, Tbody, Tr, Td } from '@/components/Table'
import { Modal } from '@/components/Modal'
import { Form } from '@/components/Form'

import { SkillsResponseI, SkillI } from './interfaces'


const schema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  icon: z.string(),
  skill_category_id: z.string().nullable()
})


const skillsIcons = ['python', 'php', 'sql', 'mongo', 'redis', 'typeScript', 'nextjs', 'react', 'tailwind', 'docker', 'cloud', 'nginx', 'git', 'code', 'swagger', 'postman', 'dbeaver']

export default function SkillsClient({ skills }: { skills: SkillsResponseI }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const [skillsData, setSkills] = useState(skills)

  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = (experience: SkillI | null = null) => {
    setValue('id', experience ? experience.id : null)
    setValue('name', experience ? experience.name : '')
    setValue('icon', experience ? experience.icon : '')
    setValue('skill_category_id', experience ? experience.skill_category_id.toString() : '')

    modalRef.current?.showModal()
  }

  const onFormSubmit = async (formData: any) => {
    const { id, ...payload } = formData

    const response = !!id ? await API.put(`/skills/${id}`, formData) : await API.post('/skills', payload)
    const data: SkillsResponseI = await response.json()

    setSkills(data)
    modalRef.current?.close()
  }

  const handlerDeleteButton = async (id: number) => {
    const response = await API.delete(`/skills/${id}`)
    const data: SkillsResponseI = await response.json()

    setSkills(data)
  }

  return (
    <>
      <div className='my-10 md:w-3/5'>
        <Table>
          <Thead>
            <Th>Título</Th>
            <Th>Categoria</Th>

            <Th className='flex justify-end'>
              {API.hasToken() && <CreateButton onClick={() => openModal()} />}
            </Th>
          </Thead>
          <Tbody>
            {skillsData.skills.map((skill, i) => (
              <Tr key={`skill-${i}`}>
                <Td>{skill.name}</Td>
                <Td>{skill.skill_category_name}</Td>
                <Td className='flex justify-end'>
                  {
                    API.hasToken() &&
                    <>
                      <UpdateButton onClick={() => openModal(skill)} />
                      <DeleteButton onClick={() => handlerDeleteButton(skill.id)} />
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
          <input {...register('name')} placeholder='Título' className='input' />
          {errors.name && <p>{errors.name.message}</p>}

          <label>Selecione um ícone:</label>
          <select {...register("icon")} className="select">
            <option disabled defaultChecked>Selecione</option>

            {skillsIcons.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>

          <label>Selecione uma categoria:</label>
          <select {...register("skill_category_id")} className="select">
            <option disabled defaultChecked>Selecione</option>

            {skillsData.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </Form>
      </Modal>
    </>
  )
}
