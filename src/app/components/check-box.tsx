'use client'

import { API } from "@/api/client";

interface Project {
    git_id: number
    name: string
    html_url: string
    homepage?: string
    private: boolean
    is_active: boolean
}


export async function CheckBox({ project }: { project: Project }) {
    const handler = async () => await API.post(`/projects/${project.git_id}`, {})

    return <input type="checkbox" defaultChecked={project.is_active} className="checkbox" onClick={handler} />
}
