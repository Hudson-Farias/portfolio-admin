import { FiArrowUpRight } from "react-icons/fi";
import { FaLock } from "react-icons/fa";

import { API } from "@/api";


interface Project {
  name: string
  html_url: string
  homepage?: string
  private: boolean
}


export default async function Home() {
  const response = await API.get('/projects')
  const projects: Project[] = response.status !== 204 ? await response.json() : []

  return (
    <ul className="list rounded-md shadow-md h-min w-3/5 bg-base-300">
      {projects.map((project, i) => (

        <li className="list-row" key={`project-${i}`}>
          {project.private ? <FaLock className="w-6 h-6" /> : <span className="w-6 h-6"></span>}

          <a href={project.html_url} target="_blank" className="link-hover hover:cursor-pointer">
            <span className="text-xs uppercase font-semibold opacity-60">{project.name.replaceAll('-', ' ')}</span>
          </a>


          {!!project.homepage && <a href={project.homepage} target="_blank" className="link-hover hover:cursor-pointer">
            <FiArrowUpRight className="w-6 h-6" />
          </a>}
          <input type="checkbox" defaultChecked className="checkbox" />

        </li>
      ))}
    </ul>
  );
}
