import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"
import ProjectList from "../../components/ProjectList"
import "./Dashboard.css"
import TasksList from "../tasks/TasksList"
import { Link } from "react-router-dom"
import { format } from "date-fns"

export default function Dashboard() {
	const { user } = useAuthContext()
	const { documents: projects, error: projectsError } = useCollection("projects", null, [
		"createdAt",
		"desc",
	])
	const { documents: users, error: usersError } = useCollection("users")
	const { documents: customers, error: customersError } = useCollection("customers")
	const { documents: tasks, error: tasksError } = useCollection(
		"tasks",
		["userId", "==", user.uid],
		["createdAt", "desc"]
	)

	const currentDate = new Date()

	if (!projects || !users || !customers || !tasks) {
		return <div className="loader"></div>
	} else {
		return (
			<div>
				<div className="dashboard-header">
					<h2 className="page-title">Dashboard</h2>
					<p className="dashboard-date">{format(currentDate, "MMMM do, yyyy")}</p>
				</div>
				<div className="dashboard-header-stats">
					<div className="project-header-stats dashboard-header-stat">
						<h4>Projects</h4>
						{!projectsError && <p>{projects.length}</p>}
					</div>
					<div className="task-header-stats dashboard-header-stat">
						<h4>Tasks</h4>
						{!tasksError && <p>{tasks.length}</p>}
					</div>
					<div className="customers-header-stats dashboard-header-stat">
						<h4>Customers</h4>
						{!customersError && <p>{customers.length}</p>}
					</div>
					<div className="team-header-stats dashboard-header-stat">
						<h4>Team</h4>
						{!usersError && <p>{users.length}</p>}
					</div>
				</div>
				<div className="dashboard-latest-section">
					<div className="dashboard-latest-project">
						<h2 className="page-title">Projects</h2>
						<ProjectList projects={projects.slice(0, 2)} />
						<div className="dashboard-link-btn">
							<Link className="btn" to="/projects">
								View all
							</Link>
						</div>
					</div>
					<div className="dashboard-latest-task">
						<h2 className="page-title">Tasks</h2>
						<TasksList documents={tasks.slice(0, 2)} />
						<div className="dashboard-link-btn">
							<Link className="btn" to="/tasks">
								View all
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
