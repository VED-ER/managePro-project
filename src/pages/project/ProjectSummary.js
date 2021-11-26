import { useHistory } from "react-router"
import Avatar from "../../components/Avatar"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

export default function ProjectSummary({ project }) {
	const { deleteDocument } = useFirestore("projects")
	const { user } = useAuthContext()
	const history = useHistory()

	const handleClick = (e) => {
		deleteDocument(project.id)
		history.push("/")
	}
	return (
		<div>
			<div className="project-summary">
				<div className="project-header">
					<h2 className="page-title">{project.name}</h2>
					<div className="created-by">
						Created by
						<img src={project.createdBy.photoURL} alt="user avatar" />
					</div>
				</div>
				<p className="due-date">Due by {project.dueDate.toDate().toDateString()}</p>
				<p className="details">{project.details}</p>
				<h4>Project is assigned to:</h4>
				<div className="assigned-users">
					{project.assignedUsersList.map((user) => (
						<div key={user.id}>
							<Avatar src={user.photoURL} />
						</div>
					))}
				</div>
			</div>
			{user.uid === project.createdBy.id && (
				<button className="btn" onClick={handleClick}>
					Mark as complete
				</button>
			)}
		</div>
	)
}
