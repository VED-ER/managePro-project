import "./Create.css"
import { useState, useEffect } from "react"
import Select from "react-select"
import { useCollection } from "../../hooks/useCollection"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from "react-router"

export default function Create() {
	const [name, setName] = useState("")
	const [details, setDetails] = useState("")
	const [dueDate, setDueDate] = useState("")
	const [category, setCategory] = useState("")
	const [assignedUsers, setAssignedUsers] = useState([])
	const [formError, setFormError] = useState(null)

	const { documents } = useCollection("users")
	const [users, setUsers] = useState([])

	const { user } = useAuthContext()
	const { addDocument, response } = useFirestore("projects")
	const history = useHistory()

	useEffect(() => {
		if (documents) {
			const options = documents.map((user) => {
				return {
					value: user,
					label: user.displayName,
				}
			})
			setUsers(options)
		}
	}, [documents])

	async function handleSubmit(e) {
		e.preventDefault()
		setFormError(null)

		if (!category) {
			setFormError("Please select a category")
			return
		}
		if (assignedUsers.length < 1) {
			setFormError("Please assign the project to at least one user")
			return
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		}

		const assignedUsersList = assignedUsers.map((user) => {
			return {
				displayName: user.value.displayName,
				photoURL: user.value.photoUrl,
				id: user.value.id,
			}
		})

		const project = {
			name,
			details,
			category: category.value,
			dueDate: timestamp.fromDate(new Date(dueDate)),
			comments: [],
			createdBy,
			assignedUsersList,
		}

		await addDocument(project)
		if (!response.error) {
			history.push("/")
		}
	}

	const categories = [
		{ value: "development", label: "Development" },
		{ value: "design", label: "Design" },
		{ value: "sales", label: "Sales" },
		{ value: "marketing", label: "Marketing" },
	]

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project name:</span>
					<input type="text" required onChange={(e) => setName(e.target.value)} value={name} />
				</label>
				<label>
					<span>Project details:</span>
					<textarea
						type="text"
						required
						onChange={(e) => setDetails(e.target.value)}
						value={details}
					/>
				</label>
				<label>
					<span>Project due date:</span>
					<input
						type="date"
						required
						onChange={(e) => setDueDate(e.target.value)}
						value={dueDate}
					/>
				</label>
				<label>
					<span>Project category:</span>
					<Select options={categories} onChange={(option) => setCategory(option)} />
				</label>
				<label>
					<span>Assign to:</span>
					<Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti />
				</label>
				<button className="btn">Add Project</button>
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	)
}
