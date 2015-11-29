# Microservices
TheConnMan's venture into microservices

This repo represents a collection of microservices for a very basic distributed message processing system. The app will be boring, but the system will be cool (I hope).

![Frontend](/resources/Frontend.png)

Screenshot of Kitematic showing a few of the Docker containers running

![Kitematic](/resources/Kitematic.png)

## Architecture Diagram
![Poorly Drawn Architecture Diagram](/resources/Architecture.jpg)

## Toolstack
- AngularJS
- Node.js
- RabbitMQ
- Grails
- MySQL
- Docker

## Usage
- Set up Docker for your machine
- Run `poor-mans-docker-compose.sh -a`
- Wait until all containers are up and the **rest-server** logs read:
  > Grails application running at [http://localhost:8080](http://localhost:8080) in environment: production

- Go to the Docker VM IP address

## License
MIT as always
