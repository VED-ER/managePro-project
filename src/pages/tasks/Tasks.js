import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { timestamp } from "../../firebase/config"
import { v4 as uuidv4 } from "uuid"
import { projectFirestore } from "../../firebase/config"
import "./Tasks.css"
import { useCollection } from "../../hooks/useCollection"
import TasksList from "./TasksList"

export default function Tasks() {
	const [taskName, setTaskName] = useState("")
	const [taskDetails, setTaskDetails] = useState("")
	const [taskCheck, setTaskCheck] = useState(false)

	const { user } = useAuthContext()
	const { documents, error } = useCollection(
		"tasks",
		["userId", "==", user.uid],
		["createdAt", "desc"]
	)

	async function handleSubmit(e) {
		e.preventDefault()
		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		}
		const task = {
			id: uuidv4(),
			userId: user.uid,
			name: taskName,
			details: taskDetails,
			checked: taskCheck,
			status: "Pending",
			createdBy,
			createdAt: timestamp.fromDate(new Date()),
		}

		await projectFirestore.collection("tasks").doc(task.id).set(task)

		if (!error) {
			setTaskName("")
			setTaskDetails("")
			setTaskCheck(false)
		}
	}

	return (
		<div className="tasks-container">
			<div className="tasks-content">
				<div className="tasks">
					<h2 className="page-title">Tasks</h2>
					{documents && documents.length > 0 && <TasksList documents={documents} />}
					{documents && documents.length === 0 && <div>You currently don't have any tasks.</div>}
				</div>
				<div className="tasks-form">
					<h2 className="page-title">Add a new task</h2>

					<form onSubmit={handleSubmit}>
						<label>
							<span>Task name:</span>
							<input
								type="text"
								required
								onChange={(e) => setTaskName(e.target.value)}
								value={taskName}
							/>
						</label>
						<label>
							<span>Task details:</span>
							<textarea
								type="text"
								required
								onChange={(e) => setTaskDetails(e.target.value)}
								value={taskDetails}
							/>
						</label>
						<label className="urgent-check">
							<span>Urgent?</span>
							<input
								type="checkbox"
								onChange={(e) => (e.target.checked ? setTaskCheck(true) : setTaskCheck(false))}
								checked={taskCheck}
							/>
						</label>
						<button className="btn">Add task</button>
					</form>
				</div>
			</div>
		</div>
	)
}
