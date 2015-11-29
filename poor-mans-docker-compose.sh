#!/bin/bash

usage() {
	echo "Usage: poor-mans-docker-compose.sh [-bdra]"
	echo "       poor-mans-docker-compose.sh -h for help"
	exit
}

showhelp() {
	echo "Usage: poor-mans-docker-compose.sh [-bdra]"
	echo "Docker compsition which works on Windows (in Cygwin)"
	echo "  -b: Build containers only"
	echo "  -d: Delete containers only"
	echo "  -r: Delete and run containers"
	echo "  -a: Build, delete, and run containers"
	exit
}

build() {
	docker build -t microservices/frontend ./frontend/
	docker build -t microservices/worker ./worker/
	docker build -t microservices/rest-server ./rest-server/
}

remove() {
	docker kill frontend worker rest-server rabbitmq
	docker rm frontend worker rest-server rabbitmq
}

run() {
	remove
	docker run -d -p 5672:5672 --name=rabbitmq rabbitmq
	docker run -d -p 8080:8080 --name=rest-server microservices/rest-server
	docker run -d --link rabbitmq --link rest-server --name=worker microservices/worker
	docker run -d -p 80:3000 --link rabbitmq --link rest-server --name=frontend microservices/frontend
}

all() {
	build
	run
}

while getopts "bdrah" name; do
	case $name in
		b)  build $0;;
		d)  remove $0;;
		r)  run $0;;
		a)  all $0;;
		h)  showhelp $0;;
		[?])  usage $0;;
	esac
done
