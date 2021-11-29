import Stopwatch from "../../assets/stopwatch.svg"
import { Link } from "react-router-dom"

export default function TasksList({ documents }) {
	return (
		<ul className="task-list">
			{documents.map((task) => (
				<li key={task.id} className="task">
					{task.checked && (
						<div className="stopwatch">
							<img src={Stopwatch} alt="stopwatch icon" />
						</div>
					)}
					<p className="task-name">{task.name}</p>
					<p className="task-details">{task.details.substring(0, 50)}...</p>
					<div className="task-buttons">
						<Link className="btn" to={`/task/${task.id}`}>
							View task
						</Link>
						{task.status === "Pending" && (
							<button className="task-status-btn" disabled>
								{task.status}
							</button>
						)}
						{task.status === "Completed" && (
							<button className="task-status-btn-completed" disabled>
								{task.status}
							</button>
						)}
					</div>
				</li>
			))}
		</ul>
	)
}
