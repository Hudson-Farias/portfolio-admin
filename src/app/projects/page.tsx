import { FiArrowUpRight } from 'react-icons/fi'
import { FaCheck } from 'react-icons/fa6'

import { API } from '@/api'
import { CheckBox } from './components/check-box'

import { ProjectI } from './interfaces'

export default async function Projects() {
  const response = await API.get('/projects')
  const projects: ProjectI[] = response.status !== 204 ? await response.json() : []

  return (
    <div className='my-10 w-3/5'>
      <table className='table table-lg bg-base-300'>
        <colgroup>
          <col className='w-1/10' />
          <col className='w-8/10' />
          <col className='w-1/10' />
        </colgroup>

        <thead>
          <tr>
            <th>Privado</th>
            <th>Projeto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr className='hover:bg-base-200' key={`project-${i}`}>
              <td>{project.private && <FaCheck className='w-6 h-6' />}</td>

              <td>
                <a href={project.html_url} target='_blank' className='link-hover hover:cursor-pointer'>
                  <span className='text-xs uppercase font-semibold opacity-60'>{project.name.replaceAll('-', ' ')}</span>
                </a>
              </td>

              <td className='flex justify-end gap-5'>
                {!!project.homepage && <a href={project.homepage} target='_blank' className='link-hover hover:cursor-pointer'>
                  <FiArrowUpRight className='w-6 h-6' />
                </a>}
                <CheckBox project={project} />
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}
