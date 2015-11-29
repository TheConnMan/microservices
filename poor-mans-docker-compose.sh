#!/bin/bash

docker build -t microservices/frontend ./frontend/
docker build -t microservices/worker ./worker/
docker build -t microservices/rest-server ./rest-server/

docker kill frontend worker rest-server rabbitmq
docker rm frontend worker rest-server rabbitmq

docker run -d -p 5672:5672 --name=rabbitmq rabbitmq
docker run -d -p 8080:8080 --name=rest-server microservices/rest-server
docker run -d --link rabbitmq --link rest-server --name=worker microservices/worker
docker run -d -p 80:3000 --link rabbitmq --link rest-server --name=frontend microservices/frontend
