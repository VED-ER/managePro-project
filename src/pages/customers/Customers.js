import { useState } from "react"
import "./Customers.css"
import { v4 as uuidv4 } from "uuid"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import { useCollection } from "../../hooks/useCollection"
import CustomerList from "./CustomerList"

export default function Customers() {
	const [showModal, setShowModal] = useState(false)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [number, setNumber] = useState("")
	const { user } = useAuthContext()
	const { addDocument, deleteDocument, response } = useFirestore("customers")
	const { documents } = useCollection("customers", null, ["createdAt", "desc"])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const customer = {
			id: uuidv4(),
			name,
			email,
			number,
			createdById: user.uid,
		}
		setShowModal(false)

		await addDocument(customer)

		setName("")
		setEmail("")
		setNumber("")
	}

	const deleteCustomer = async (id) => {
		await deleteDocument(documents.filter((customer) => customer.id === id)[0].id)
	}
	return (
		<div>
			<div className="customers-header">
				<h2>Customers</h2>
				<button className="btn" onClick={() => setShowModal(true)}>
					Add a Customer
				</button>
			</div>
			<div className="customers-content">
				<div className="customers-heading-row">
					<div className="customers-id">
						<p>Id</p>
					</div>
					<div className="customers-name">
						<p>Name</p>
					</div>
					<div className="customers-email">
						<p>Email</p>
					</div>
					<div className="customers-number">
						<p>Number</p>
					</div>
				</div>
				{documents && <CustomerList customers={documents} deleteCustomer={deleteCustomer} />}

				{showModal && (
					<div className="customer-modal-overlay" onClick={() => setShowModal(false)}></div>
				)}
				{showModal && (
					<div className="customer-modal">
						<form className="customer-form" onSubmit={handleSubmit}>
							<label>
								<span>Name</span>
								<input
									type="text"
									required
									onChange={(e) => setName(e.target.value)}
									value={name}
								/>
							</label>
							<label>
								<span>Email</span>
								<input
									type="email"
									required
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<label>
								<span>Number</span>
								<input
									type="text"
									required
									onChange={(e) => setNumber(e.target.value)}
									value={number}
								/>
							</label>
							{response.isPending && <button className="btn">Adding...</button>}
							{!response.isPending && <button className="btn">Add customer</button>}
						</form>
					</div>
				)}
			</div>
		</div>
	)
}
