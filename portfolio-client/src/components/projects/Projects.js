import React from 'react'
import PropTypes from 'prop-types'
import ProjectCard from './ProjectCard'
import ProjectAdminControls from './ProjectAdminControls'

const Projects = props => {

  const { projects, admin } = props

  const renderProjects = projects.map(project=> 
      <ProjectCard key={project.id} project={project} admin={admin} />
  )

  return (
    <div>      
      {admin.auth && <ProjectAdminControls />}

      <h2>Projects
        <span>What You're Here For</span>
      </h2>
      {renderProjects}
    </div>
  )
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired
}

export default Projects


