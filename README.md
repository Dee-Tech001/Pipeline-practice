# jenkins-practice-app

A small Express API used to practice a Jenkins CI/CD pipeline: install → test → build Docker image → push to Docker Hub.

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
The `Jenkinsfile` expects a Jenkins credential with ID `dockerhub-creds`
(Username with password) pointing at your Docker Hub account, and updates
the image name `jhayzee/jenkins-practice-app` if you push under a different
Docker Hub username.

## Push this project to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Jenkins practice app"
git branch -M main
git remote add origin https://github.com/<your-username>/jenkins-practice-app.git
git push -u origin main
```
