import { API } from '@/api'

import { ExperiencesI } from './interfaces'
import ExperiencesClient from './page-client'

export default async function Experiences() {
  const response = await API.get('/experiences')
  const experiences: ExperiencesI[] = response.status !== 204 ? await response.json() : []

  return <ExperiencesClient experiences={experiences} />
}
