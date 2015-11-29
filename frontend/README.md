# Frontend
Basic Node.js and AngularJS app for viewing and submitting messages.

## Usage
Run using `node app.js` and go to [http://localhost:3000](http://localhost:3000).

## Docker
### Build
`docker build -t microservices/frontend .`

### Run
`docker run -d -p 80:3000 --name=frontend microservices/frontend`
