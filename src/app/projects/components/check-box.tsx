'use client'

import { API } from '@/api/client'

import { ProjectI } from '../interfaces'

export async function CheckBox({ project }: { project: ProjectI }) {
    const handler = async () => await API.post(`/projects/${project.git_id}`, {})

    return <input type='checkbox' defaultChecked={project.is_active} className='checkbox' onClick={handler} />
}
