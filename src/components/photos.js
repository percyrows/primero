// Import de React & component
import React, { Component } from 'react'
import axios from 'axios'
import PhotosDetail from './photos-detail'

const instance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com'
})

class Photos extends Component {
	constructor (props) {
		super(props)
		this.state={
			photos: [],
			formData: {},
			name: "",
			acceptConditions:false, 
		}
	}

	componentDidMount =async () =>{
		await this.loadElements()
	}

	loadElements =async () =>{
		try {
			const body =await instance.get('/photos?_page=1&_limit=5')

			this.setState({
				photos: body.data || []
			})
		} catch (error) {
			console.log('Error =>', error)
		}
	}

	cleanElements =() => {
		this.setState({
			photos:[]
		})
	}
	 
	onInputChange =(event) =>{
console.log(event)
		let{
			formData
		} = this.state

		let{
			target
		}= event

		formData[target.name]=target.type ==='checkbox' ? target.checked : target.value

		this.setState({
			formData
		})
	}

	render () {
		// desctructuring
		const { photos, formData } =this.state

		return (
			<div>
				<div className="columns">
					<div className="colum">
						<button
							onClick={this.cleanElements}
							className="button is-success">
							Limpiar Registros
						</button>
					</div>

					<div className="column">
						<button
							onClick={this.loadElements}
							className="button is-success">
							Cargar Registros
						</button>
					</div>
					<div className="column">
						<div className="select">
						<select value={formData.option} className="select">
						{
							photos.map((photo, index)=>{
								return (<option value={photo.id}>
									{
										`${index + 1} .- ${photo.title}`
									}
									</option>)

							})
						}
						</select>
						</div>
						</div>

						<div className="column">
							<input
							className="input"
							value={formData.search}
							onChange={this.onInputChange}
							/>
						</div>

						<div className="column">
							<input
								value={formData.name}
								name="name"
								className="input"
								onChange={this.onInputChange}
							/>
							</div>
						</div>

							<div className="column">
								<input
									onChange={this.onInputChange}
									type="checkbox"
									value={formData.acceptConditions}
									checked={formData.acceptConditions}
									name="acceptConditions"
								/>
							</div>

							<div className="column">

								<input
									onChange={this.onInputChange}
									type="checkbox"
									value={formData.acceptConditions}
									checked={formData.acceptConditions}
									name="acceptConditions"
								/>
							</div>
							<div className="column">
								<div className="control">
								<label className="radio">
										<input
											type="radio"
											name= "answer"
											value="yes"
											checked={formData.answer ==="yes"}
											onChange={this.onInputChange}/>
											Yes 
									</label>
									<label className="radio">
										<input
										type="radio"
										name= "answer"
										value="no"
										checked={formData.answer ==="yes"}
										onChange={this.onInputChange}/>
											NO
									</label>
								</div>
							</div>



						<div className="columns is-multiline">
							{
								photos.map(photo => 
								(<div
								className="column is-6"
								key={photo.id}
								>
								<PhotosDetail
									data={photo}
								/>
								</div>)
							)
							}
				</div>
			</div>
		)
	}
}

export default Photos