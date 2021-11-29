import "./Sidebar.css"
import DashboardIcon from "../assets/dashboard_icon.svg"
import AddIcon from "../assets/add_icon.svg"
import TasksIcon from "../assets/tasks-icon.svg"
import HomeIcon from "../assets/home.svg"
import CustomersIcon from "../assets/people.svg"
import { NavLink } from "react-router-dom"
import Avatar from "./Avatar"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Sidebar() {
	const { user } = useAuthContext()
	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					<Avatar src={user.photoURL} />
					<p>Hello, {user.displayName}</p>
				</div>
				<nav className="links">
					<ul>
						<li>
							<NavLink exact to="/">
								<img src={HomeIcon} alt="icon" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink exact to="/projects">
								<img src={DashboardIcon} alt="icon" />
								<span>Projects</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create">
								<img src={AddIcon} alt="icon" />
								<span>New Project</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/tasks">
								<img src={TasksIcon} alt="icon" />
								<span>Tasks</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/customers">
								<img src={CustomersIcon} alt="icon" />
								<span>Customers</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}
