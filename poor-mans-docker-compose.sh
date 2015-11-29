#!/bin/bash

WORKERS=3

usage() {
	echo "Usage: poor-mans-docker-compose.sh [-w worker count] [-bdra]"
	echo "       poor-mans-docker-compose.sh -h for help"
	exit
}

showhelp() {
	echo "Usage: poor-mans-docker-compose.sh [-w worker count] [-bdra]"
	echo "Docker compsition which works on Windows (in Cygwin)"
	echo "  -w: Worker container count (default: $WORKERS)"
	echo "  -b: Build containers only"
	echo "  -d: Delete containers only"
	echo "  -r: Delete and run containers"
	echo "  -a: Build, delete, and run containers"
	exit
}

build() {
	npm --prefix ./frontend/ i ./frontend/
	npm --prefix ./worker/ i ./worker/
	docker build -t microservices/frontend ./frontend/
	docker build -t microservices/worker ./worker/
	docker build -t microservices/rest-server ./rest-server/
	docker pull rabbitmq
	docker pull mysql
}

remove() {
	docker kill frontend mysql rest-server rabbitmq
	docker rm frontend mysql rest-server rabbitmq
	W=""
	for (( i=1; i<=$WORKERS; i++ )); do
		W+=" worker-$i"
	done
	docker kill $W
	docker rm $W
}

run() {
	remove
	docker run -d -p 5672:5672 --name=rabbitmq rabbitmq
	docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=micro -e MYSQL_DATABASE=micro mysql
	docker run -d -p 8080:8080 --link mysql --name=rest-server microservices/rest-server
	docker run -d -p 80:3000 --link rabbitmq --link rest-server --name=frontend microservices/frontend
	for (( i=1; i<=$WORKERS; i++ )); do
		docker run -d --link rabbitmq --link rest-server --name=worker-$i microservices/worker
	done
}

all() {
	build
	run
}

while getopts "w:bdrah" name; do
	case $name in
		w)  WORKERS=$OPTARG;;
		b)  build $0;;
		d)  remove $0;;
		r)  run $0;;
		a)  all $0;;
		h)  showhelp $0;;
		[?])  usage $0;;
	esac
done
