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
		this.state = {
			photos: []
		}
	}

	componentDidMount = async () => {
		try {
			const body = await instance.get('/photos?_page=1&_limit=5')

			this.setState({
				photos: body.data || []
			})
		} catch (error) {
			console.log('Error =>', error)
		}
	}

	render () {
		// desctructuring
		const { photos, user } = this.state

		return <div className="columns is-multiline">
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
	}
}

export default Photos