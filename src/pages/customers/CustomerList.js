import Trashcan from "../../assets/trashcan.svg"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function CustomerList({ customers, deleteCustomer }) {
	const { user } = useAuthContext()
	return (
		<>
			{customers.map((customer) => (
				<div className="customer-row" key={customer.id}>
					<div className="customers-id">
						<p>#{customer.id.substring(0, 5)}</p>
					</div>
					<div className="customers-name">
						<p>{customer.name}</p>
					</div>
					<div className="customers-email">
						<p>{customer.email}</p>
					</div>
					<div className="customers-number">
						<p>{customer.number}</p>
					</div>
					{user.uid === customer.createdById && (
						<div className="customer-delete" onClick={() => deleteCustomer(customer.id)}>
							<img src={Trashcan} alt="icon" />
						</div>
					)}
				</div>
			))}
		</>
	)
}
