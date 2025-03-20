export interface SkillI {
  id: number
  name: string
  icon: string
  skill_category_id: number
  skill_category_name: string
}


export interface SkillCategoryI{
    id: number
    title: string
}


export interface SkillsResponseI{
    skills: SkillI[]
    categories: SkillCategoryI[]
}