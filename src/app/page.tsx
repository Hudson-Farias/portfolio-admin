import { FiArrowUpRight } from "react-icons/fi";

import { API } from "@/api";


interface Project {
  name: string
  html_url: string
  homepage?: string
}


export default async function Home() {
  const response = await API.get('/projects')
  console.log(response.status)
  const projects: Project[] = response.status !== 204 ? await response.json() : []

  console.log(projects)

  return (
    <ul className="list rounded-md shadow-md h-min w-3/5 bg-base-200">
      {projects.map((project, i) => (

        <li className="list-row" key={`project-${i}`}>

          <a href={project.html_url} className="link-hover hover:cursor-pointer">
            <span className="text-xs uppercase font-semibold opacity-60">{project.name.replaceAll('-', ' ')}</span>
          </a>

          <span></span>

          <a href={project.homepage} className={project.homepage ? "link-hover hover:cursor-pointer" : "text-base-200"}>
            <FiArrowUpRight className="w-6 h-6" />
          </a>
          <input type="checkbox" defaultChecked className="checkbox" />

        </li>
      ))}
    </ul>
  );
}
