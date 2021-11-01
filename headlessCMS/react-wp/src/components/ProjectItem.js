import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

const ProjectItem = ({project}) => {

    const [image, setImage] = useState('');
    
    const {featured_media} = project;
    useEffect(async() => {
     const res = await axios.get(`/wp-json/wp/v2/media/${featured_media}`)
     setImage(res.data.media_details.sizes.full.source_url)
    
    })
    return (
        <div>
            <h2>{project.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{__html: project.excerpt.rendered}}/>
            <img style={{width: '50%'}}src={ image } alt={project.title.rendered} />

            <Link to={`/project/${project.id}`}>Go to page</Link>
            
        </div>
    )
}

export default ProjectItem
