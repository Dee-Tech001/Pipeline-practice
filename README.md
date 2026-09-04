# Pipeline-practice

A small Express.js API built to practice a full Jenkins CI/CD pipeline: checkout → install dependencies → run tests → build Docker image → push to Docker Hub.

## What this demonstrates

- Jenkins declarative pipeline (`Jenkinsfile`) with NodeJS tool provisioning (`Node20`)
- Credential-based Docker Hub authentication via Jenkins credentials store (no secrets in code)
- Automated test run gating the build (pipeline fails before ever touching Docker if tests fail)
- Docker image build and dual-tagging (`BUILD_NUMBER` + `latest`) on every successful pipeline run
- Clean post-build steps: Docker logout on every run, explicit success/failure messaging

## Pipeline stages

| Stage | What happens |
|---|---|
| Checkout | Pulls source from SCM |
| Install Dependencies | `npm install` |
| Run Tests | `npm test` |
| Build Docker Image | `docker build`, tagged `:${BUILD_NUMBER}` and `:latest` |
| Push to Docker Hub | Authenticates via Jenkins credentials, pushes both tags |
| Post Actions | Docker logout, success/failure message |

## Endpoints

- `GET /` — welcome message
- `GET /health` — health check
- `GET /tasks` — list tasks
- `POST /tasks` — create a task (`{ "title": "..." }`)
- `PATCH /tasks/:id/done` — mark a task done

## Run locally

```bash
npm install
npm start
```

## Run tests

```bash
npm test
```

## Build and run with Docker

```bash
docker build -t jenkins-practice-app .
docker run -p 3000:3000 jenkins-practice-app
```

## Jenkins setup

The `Jenkinsfile` expects:

- A Jenkins credential with ID `docker-hub-credentials` (type: Username with password) pointing at your Docker Hub account
- NodeJS tool named `Node20` configured in Jenkins Global Tool Configuration
- Update `IMAGE_NAME` in the `environment` block if pushing under a different Docker Hub username

## Image

Published to Docker Hub as [`jhayzee/jenkins-practice-app`](https://hub.docker.com/r/jhayzee/jenkins-practice-app).
