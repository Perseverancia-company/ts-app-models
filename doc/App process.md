# App process

- [x] Process

Name: "process"
appName: belongs to app

- [ ] Workspace model

Name: "workspace"

Fields:
id: Workspace id
name: The name of the workspace

A workspace has many apps, so a union model is required

- [ ] Process model

Name: "process-info"

Fields:
appType: "frontend", "backend", "application", "library"
services: "all", "app", "ci/cd", "authentication", "authorization", etc.

- [ ] Tests results

Name: "test-results"

Fields:
appId: The application id
workspaceId: Belongs to workspace
