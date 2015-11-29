#!/bin/bash

docker build -t microservices/frontend ./frontend/

docker kill frontend rabbitmq
docker rm frontend rabbitmq

docker run -d -p 5672:5672 --name=rabbitmq rabbitmq
docker run -d -p 80:3000 --link rabbitmq --name=frontend microservices/frontend
