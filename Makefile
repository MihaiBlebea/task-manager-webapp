setup: build run

build:
	docker build -t serbanblebea/task-manager-webapp:0.1 .

run:
	docker run --name task-manager-webapp -d -p 5000:80 serbanblebea/task-manager-webapp:0.1

stop:
	docker rm -f task-manager-webapp