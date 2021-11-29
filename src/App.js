import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import "./App.css"
import Create from "./pages/create/Create"
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Project from "./pages/project/Project"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useAuthContext } from "./hooks/useAuthContext"
import OnlineUsers from "./components/OnlineUsers"
import Tasks from "./pages/tasks/Tasks"
import Task from "./pages/tasks/Task"
import Projects from "./pages/projects/Projects"
import Customers from "./pages/customers/Customers"

function App() {
	const { user, authIsReady } = useAuthContext()
	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					{user && <Sidebar />}
					<div className="container">
						<Navbar />
						<Switch>
							<Route exact path="/">
								{!user && <Redirect to="/login" />}
								{user && <Dashboard />}
							</Route>
							<Route exact path="/projects">
								{!user && <Redirect to="/login" />}
								{user && <Projects />}
							</Route>
							<Route path="/create">
								{!user && <Redirect to="/login" />}
								{user && <Create />}
							</Route>
							<Route path="/tasks">
								{!user && <Redirect to="/login" />}
								{user && <Tasks />}
							</Route>
							<Route path="/task/:id">
								{!user && <Redirect to="/login" />}
								{user && <Task />}
							</Route>
							<Route path="/projects/:id">
								{!user && <Redirect to="/login" />}
								{user && <Project />}
							</Route>
							<Route path="/login">
								{!user && <Login />}
								{user && <Redirect to="/" />}
							</Route>
							<Route path="/signup">
								{!user && <Signup />}
								{user && <Redirect to="/" />}
							</Route>
							<Route path="/customers">
								{!user && <Redirect to="/login" />}
								{user && <Customers />}
							</Route>
						</Switch>
					</div>
					{user && <OnlineUsers />}
				</BrowserRouter>
			)}
		</div>
	)
}

export default App
