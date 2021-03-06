import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import AdminRoute from './../admin/AdminRoute'
import ProjectAdminControls from './ProjectAdminControls'
import Projects from './Projects'
import ProjectContainer from './ProjectContainer'
import ProjectForm from './ProjectForm'
import ProjectUpdateForm from './ProjectUpdateForm'
import { getProjects } from '../../actions/projectsActions'

class ProjectsContainer extends Component {

  componentDidMount() {
    const { projects, getProjects } = this.props
    if(projects.length === 0) {
      getProjects()
    }
  }

  render() {
    const { match, admin, projects } = this.props
    const shownProjects = admin.showHidden ? projects : projects.filter(p => !p.hidden)
    const sortedProjects = shownProjects.sort((a, b) => a.id < b.id)

    return (
      <>
        <Switch>
          <Route exact path={match.path} render={(props) =>
            <Projects {...props} projects={sortedProjects} admin={admin} />}
          />
          <AdminRoute path={`${match.path}/new`} component=
            {ProjectForm} admin={admin} />
          <AdminRoute path={`${match.path}/edit/:projectId`} component=
            {ProjectUpdateForm} admin={admin} />
          <Route path={`${match.path}/:projectId`} render={props =>
            <ProjectContainer {...props} admin={admin} />}
          />
        </Switch>
      </>
    )
  }

  static propTypes = {
    projects: PropTypes.array.isRequired,
    admin: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
  }
}

const mapStateToProps = ({ projects }) => ({ projects })

export default connect(
  mapStateToProps, { 
    getProjects 
  })(ProjectsContainer)