'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FaPencil } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'

import { API } from '@/api/client'

import { UpdateButton } from '@/components/UpdateButton'
import { DeleteButton } from '@/components/DeleteButton'
import { Modal } from '@/components/Modal'

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
        <table className='table table-lg bg-base-300'>
          <thead>
            <th>Título</th>
            <th>Categoria</th>

            <th className='flex justify-end'>
              {API.hasToken() && <button className='btn btn-ghost' onClick={() => openModal()}><FaPlus /></button>}
            </th>
          </thead>
          <tbody>
            {skillsData.skills.map((skill, i) => (
              <tr className='hover:bg-base-200' key={`skill-${i}`}>
                <td>
                  <span className='text-xs font-semibold opacity-60'>{skill.name}</span>
                </td>
                <td>
                  <span className='text-xs font-semibold opacity-60'>{skill.skill_category_name}</span>
                </td>
                <td className='flex justify-end'>
                  {
                    API.hasToken() &&
                    <>
                      <UpdateButton onClick={() => openModal(skill)} />
                      <DeleteButton onClick={() => handlerDeleteButton(skill.id)} />
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

          <div className='modal-action'>
            <button className='btn btn-ghost' type='submit'>Enviar</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
