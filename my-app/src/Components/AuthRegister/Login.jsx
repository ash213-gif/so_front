import React from "react";
import { useState } from "react";

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const fields = [
		{ name: 'email', type: 'email', placeholder: 'Enter email' },
		{ name: 'password', type: 'password', placeholder: 'Enter password' },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// Add login logic here
	};

	return <>
		<form onSubmit={handleSubmit}>
			{fields.map((field) => (
				<div key={field.name}>
					<input
						type={field.type}
						name={field.name}
						placeholder={field.placeholder}
						value={formData[field.name]}
						onChange={handleChange}
						required
					/>
				</div>
			))}
			<button type="submit">Login</button>
		</form>
	</>
}

export default Login;