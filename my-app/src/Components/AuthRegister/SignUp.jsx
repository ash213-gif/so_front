import React from "react";
import { useState } from "react";

const SignUp = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const fields = [
		{ name: 'username', type: 'text', placeholder: 'Enter username' },
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
		// Add signup logic here
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
			<button type="submit">Sign Up</button>
		</form>
	</>
}

export default SignUp;