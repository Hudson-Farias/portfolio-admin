import { API } from '@/api'

import { ProjectsI } from './interfaces'
import ProjectsClient from './page-client'

export default async function Projects() {
  const response = await API.get('/projects')
  const projects: ProjectsI = await response.json()

  return <ProjectsClient projects={projects} />
}
