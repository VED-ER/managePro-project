import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import "./Login.css"

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { isPending, error, login } = useLogin()

	function handleSubmit(e) {
		e.preventDefault()
		login(email, password)
	}
	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Login</h2>

			<label>
				<span>email:</span>
				<input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
			</label>
			<label>
				<span>password:</span>
				<input
					type="password"
					required
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>

			{!isPending && <button className="btn">Login</button>}
			{isPending && (
				<button className="btn" disabled>
					loading
				</button>
			)}
			{error && <div className="error">{error}</div>}
		</form>
	)
}
