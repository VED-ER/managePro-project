import "./Projects.css"

import ProjectList from "../../components/ProjectList"
import { useCollection } from "../../hooks/useCollection"
import ProjectFilter from "./ProjectFilter"
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function Projects() {
	const { documents, error } = useCollection("projects")
	const [currentFilter, setCurrentFilter] = useState("all")
	const { user } = useAuthContext()

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter)
	}

	const filteredProjects = documents
		? documents.filter((project) => {
				switch (currentFilter) {
					case "all":
						return project
					case "mine":
						let assignedToMe = false
						project.assignedUsersList.forEach((u) => {
							if (user.uid === u.id) {
								assignedToMe = true
							}
						})
						return user.uid === project.createdBy.id || assignedToMe
					case "development":
					case "design":
					case "marketing":
					case "sales":
						return project.category === currentFilter
					default:
						return true
				}
		  })
		: null

	return (
		<div>
			<h2 className="page-title">Projects</h2>
			{error && <p className="error">{error}</p>}
			{documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
			{documents && <ProjectList projects={filteredProjects} />}
		</div>
	)
}
