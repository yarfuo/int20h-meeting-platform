install-deps:
	cd backend; \
	python3 -m pip install -r requirements-dev.txt; \
	cd ../frontend; \
	npm install

docker-run-dev:
	docker-compose -f docker/docker-compose.yml up --build

docker-run-prod:
	docker-compose -f docker/docker-compose.prod.yml up
