# REST Server
Basic REST server for storing processed messages.

## Usage
Run using `grails run-app` and go to [http://localhost:8080](http://localhost:8080).

## Docker
### Build
`docker build -t microservices/rest-server .`

### Run
`docker run -d --name=rest-server microservices/rest-server`
