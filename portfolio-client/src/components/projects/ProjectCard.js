import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import ProjectAdminButtons from './ProjectAdminButtons'

const ProjectCard = props => {
  const { match, project, admin } = props
  const { id, name, img_url, description, created_at } = props.project

  const date = new Date(created_at)
    .toLocaleDateString('en-US', {
      year: 'numeric', month: 'long'
    })

  return (
    <div className='project-card'>
      {admin.auth &&
      <ProjectAdminButtons project={project} admin={admin} />}
      <Link to={`${match.url}/${id}`}>
        <img src={img_url} alt={name} />
        <h4>{name}
          <span>{date}, Website</span>
        </h4>
        <p>{description}</p>
        <a>Details</a>
      </Link>     
    </div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired
}

export default withRouter(ProjectCard)
