import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useDocument } from "../../hooks/useDocument"
import { useFirestore } from "../../hooks/useFirestore"

export default function Task() {
	const [task, setTask] = useState("")
	const { id } = useParams()
	const { document } = useDocument("tasks", id)
	const { deleteDocument, updateDocument, response } = useFirestore("tasks")
	const history = useHistory()
	useEffect(() => {
		if (document) {
			setTask(document)
		}
	}, [document])

	const handleMarkClick = async () => {
		await updateDocument(id, { status: "Completed" })
		if (response.error) console.log(response.error)
		history.push("/tasks")
	}

	const handleDeleteClick = async () => {
		await deleteDocument(id)
		if (response.error) console.log(response.error)
		history.push("/tasks")
	}

	return (
		<div className="task-summary">
			<div className="task-summary-heading">
				<h2 className="page-title">{task.name}</h2>
				{task.createdAt && (
					<p className="task-summary-time">
						Created {formatDistanceToNow(task.createdAt.toDate(), { addSuffix: true })}
					</p>
				)}
			</div>
			<p className="task-summary-details">{task.details}</p>
			<div className="task-summary-btns">
				{task.status === "Pending" && (
					<button className="btn" onClick={handleMarkClick}>
						Mark as complete
					</button>
				)}
				<button className="task-summary-delete-btn" onClick={handleDeleteClick}>
					Delete
				</button>
			</div>
		</div>
	)
}
