'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { API } from '@/api/client'

import { CreateButton } from '@/components/Buttons/Create'
import { DeleteButton } from '@/components/Buttons/Delete'
import { Table, Thead, Th, Tbody, Tr, Td } from '@/components/Table'
import { Modal } from '@/components/Modal'
import { Form } from '@/components/Form'

import { FiArrowUpRight } from 'react-icons/fi'

import { ProjectsI, ProjectI } from './interfaces'


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
        <Table>
          <Thead>
            <Th>Projeto</Th>
            <Th className='flex justify-end'>
              {API.hasToken() && <CreateButton onClick={() => openModal()} />}
            </Th>
          </Thead>
          <Tbody>
            {projectsData.visible.map((project, i) => (
              <Tr key={`project-${i}`}>
                <Td>
                  <a href={project.html_url} target='_blank' className='link-hover hover:cursor-pointer'>{project.name.replaceAll('-', ' ')}</a>
                </Td>
                <Td className='flex justify-end gap-5'>
                  {!!project.homepage &&
                    <a href={project.homepage} target='_blank' className='link-hover hover:cursor-pointer'>
                      <FiArrowUpRight className='w-6 h-6' />
                    </a>
                  }
                  {API.hasToken() && <DeleteButton onClick={() => handlerDeleteButton(project.git_id)} />}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <Modal modalRef={modalRef}>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <label>Selecione um projeto:</label>
          <select {...register("git_id")} className="select">
            <option disabled defaultChecked>Selecione</option>

            {projectsData.options.map((project) => (
              <option key={project.git_id} value={project.git_id}>
                {project.name}
              </option>
            ))}
          </select>

          {errors.git_id && <p>{errors.git_id.message}</p>}
        </Form>
      </Modal>
    </>
  )
}
