import "./Navbar.css"
import ProjectIcon from "../assets/project-icon.svg"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Navbar() {
	const { isPending, logout } = useLogout()
	const { user } = useAuthContext()
	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<img src={ProjectIcon} alt="logo" />
					<span>managePro</span>
				</li>

				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Sign Up</Link>
						</li>
					</>
				)}
				{user && (
					<li>
						{!isPending && (
							<button className="btn" onClick={logout}>
								Logout
							</button>
						)}
						{isPending && (
							<button className="btn" disabled>
								Logging out
							</button>
						)}
					</li>
				)}
			</ul>
		</div>
	)
}
