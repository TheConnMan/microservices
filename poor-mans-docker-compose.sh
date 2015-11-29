#!/bin/bash

docker build -t microservices/frontend ./frontend/
docker build -t microservices/worker ./worker/

docker kill frontend worker rabbitmq
docker rm frontend worker rabbitmq

docker run -d -p 5672:5672 --name=rabbitmq rabbitmq
docker run -d --link rabbitmq --name=worker microservices/worker
docker run -d -p 80:3000 --link rabbitmq --name=frontend microservices/frontend
