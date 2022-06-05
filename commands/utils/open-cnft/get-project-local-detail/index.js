const projects = require('../../../../storage/opencnft-projects.json')

const buildProject = (project) => {
  const projectId = project.slug || project.link.split('.io/')[1]

  return {
    ...project,
    project_id: projectId
  }
}

const getProjectByPolicyId = (policy_id) => {
  const project = projects.find(project => project.policies.indexOf(policy_id) !== -1)

  return buildProject(project)
}

module.exports = {
  getProjectByPolicyId
}