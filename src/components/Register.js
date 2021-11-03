import React from "react"
import { connect } from "react-redux"
import agent from "../agent"
import { REGISTER, REGISTER_PAGE_UNLOADED, UPDATE_AUTH_FIELD } from "../constants/actionTypes"

const mapStateToProps = state => ({ ...state.auth })
const mapDispatchToProps = dispatch => ({
	onSubmit: (username, password) => 
		dispatch({ type: REGISTER, payload: agent.Auth.register(username, password)}),
	onChangePassword: value =>
		dispatch({ type: UPDATE_AUTH_FIELD, key: 'password', value }),
	onChangeUsername: value =>
		dispatch({ type: UPDATE_AUTH_FIELD, key: 'username', value }),
	onUnload: () =>
		dispatch({ type: REGISTER_PAGE_UNLOADED })
})

class Register extends React.Component {
	constructor() {
		super()
		this.changePassword = ev => this.props.onChangePassword(ev.target.value)
		this.changeUsername = ev => this.props.onChangeUsername(ev.target.value)
		this.submitForm = (username, password) => ev => {
			ev.preventDefault()
			this.props.onSubmit(username, password)
		}
	}

	componentWillUnmount() {
		this.props.onUnload()
	}

	render() {
		const password = this.props.password
		const username = this.props.username

		const inputClass = 'px-2 py-1 border-b border-gray-800 focus:outline-none placeholder-shown:italic'

		return (<div className="flex flex-col items-center justify-center mt-8">
			<form onSubmit={this.submitForm(username, password)} className="flex flex-col space-y-2" >
				<div className="flex flex-col">
					<label>Username</label>
					<input
						className={inputClass}
						type="text"
						placeholder="username"
						value={username}
						onChange={this.changeUsername}
					/>
				</div>
				<div className="flex flex-col">
					<label>Password</label>
					<input
						className={inputClass}
						type="password"
						placeholder="password"
						value={password}
						onChange={this.changePassword}
					/>
				</div>

				<button
					type="submit"
					className="py-2 rounded shadow bg-green-500 text-white uppercase tracking-wide"
				>
					Register
				</button>
			</form>
		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)