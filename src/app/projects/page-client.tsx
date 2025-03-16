'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FiArrowUpRight } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'

import { DeleteButton } from '@/components/DeleteButton'
import { Modal } from '@/components/Modal'

import { ProjectsI, ProjectI } from './interfaces'

import { API } from '@/api/client'

const schema = z.object({
  git_id: z.string().nullable()
})


export default function ProjectsClient({ projects }: { projects: ProjectsI }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const [projectsData, setProjects] = useState(projects)

  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = (project: ProjectI | null = null) => {
    setValue('git_id', project ? project.git_id.toString() : null)
    modalRef.current?.showModal()
  }

  const onFormSubmit = async (formData: any) => {
    const response = await API.post(`/projects/${formData.git_id}`, {})
    const data: ProjectsI = await response.json()

    setProjects(data)
    modalRef.current?.close()
  }

  const handlerDeleteButton = async (id: number) => {
    const response = await API.delete(`/projects/${id}`)
    const data: ProjectsI = await response.json()

    setProjects(data)
  }

  return (
    <>
      <div className='my-10 w-3/5'>
        <table className='table table-lg bg-base-300'>
          <thead>
            <tr>
              <th>Projeto</th>
              <th className='flex justify-end'>
                {API.hasToken() && <button className='btn btn-ghost' onClick={() => openModal()}><FaPlus /></button>}
              </th>
            </tr>
          </thead>
          <tbody>
            {projectsData.visible.map((project, i) => (
              <tr className='hover:bg-base-200' key={`project-${i}`}>
                <td>
                  <a href={project.html_url} target='_blank' className='link-hover hover:cursor-pointer'>
                    <span className='text-xs uppercase font-semibold opacity-60'>{project.name.replaceAll('-', ' ')}</span>
                  </a>
                </td>
                <td className='flex justify-end gap-5'>
                  {!!project.homepage &&
                    <a href={project.homepage} target='_blank' className='link-hover hover:cursor-pointer'>
                      <FiArrowUpRight className='w-6 h-6' />
                    </a>
                  }
                  {API.hasToken() && <DeleteButton onClick={() => handlerDeleteButton(project.git_id)} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal modalRef={modalRef}>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onFormSubmit)}>
          <label>Selecione um projeto:</label>
          <select {...register("git_id")} className="select">
            <option disabled defaultChecked>Selecione</option>

            {projectsData.options.map((project) => (
              <option key={project.git_id} value={project.git_id}>
                {project.name}
              </option>
            ))}
          </select>

          {errors.git_id && <p>{errors.git_id.message}</p>} {/* Exibindo erro de validação */}


          <div className='modal-action'>
            <button className='btn btn-ghost' type='submit'>Enviar</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
