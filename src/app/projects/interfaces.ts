export interface ProjectI {
  git_id: number
  name: string
  html_url: string
  homepage?: string
  private: boolean
  is_active: boolean
}


export interface ProjectsI {
  visible: ProjectI[]
  options: ProjectI[]
}