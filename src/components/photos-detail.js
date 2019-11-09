import React from 'react'

const PhotosDetail = ({ data }) => {
    return (
        <div className="card">
            <div className="card-header">
                <p className="card-header-title">
                    {
                        data.title
                    }
                </p>
            </div>
            <div className="card-content">
                <img src={data.thumbnailUrl} />
            </div>
        </div>
    )
}

export default PhotosDetail