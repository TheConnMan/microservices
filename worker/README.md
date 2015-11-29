# Worker
Basic Node.js worker used to process incoming messages.

## Usage
Run using `node app.js` and go to [http://localhost:3000](http://localhost:3000).

## Docker
### Build
`docker build -t microservices/worker .`

### Run
`docker run -d --name=worker microservices/worker`
