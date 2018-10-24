import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Projects from './Projects'
import ProjectContainer from './ProjectContainer'
import ProjectForm from './ProjectForm'
import ProjectUpdateForm from './ProjectUpdateForm'
import { getProjects } from '../../actions/projectsActions'

class ProjectsContainer extends Component {

  static PropTypes = {
    projects: PropTypes.array.isRequired,
    admin: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { projects, getProjects } = this.props

    if(projects.length === 0) {
      getProjects()
    }
  }

  render() {
    const { match, projects, admin } = this.props
    const shownProjects = admin.showHidden ? projects : projects.filter(p => !p.hidden)

    return (
      <div className="ProjectList">
        <h1>Projects</h1>
        <Switch>
          <Route exact path={match.path} render={(props) => (
            <Projects
              {...props}
              projects={shownProjects} 
            />
          )} />

      {/* protect these routes */}
          <Route path={`${match.path}/new`} component={ProjectForm} />
          <Route path={`${match.path}/edit/:projectId`} component={ProjectUpdateForm} />
      {/* protect these routes */}
          <Route path={`${match.path}/:projectId`} component={ProjectContainer} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ projects, admin }) => ({ projects, admin })

export default connect(
  mapStateToProps, { 
    getProjects 
  })(ProjectsContainer)