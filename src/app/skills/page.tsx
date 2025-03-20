import { API } from '@/api'

import { SkillsResponseI } from './interfaces'
import SkillsClient from './page-client'

export default async function Skills() {
  const response = await API.get('/skills')
  const skills: SkillsResponseI = await response.json()

  return <SkillsClient skills={skills} />
}
