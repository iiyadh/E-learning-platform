.PHONY: infra up down frontend backend build clean seed help

help:
	@echo "E-Learning Platform - Makefile"
	@echo ""
	@echo "Targets:"
	@echo "  infra     Start infrastructure (PostgreSQL, RabbitMQ, Redis, MinIO, monitoring)"
	@echo "  up        Start all services"
	@echo "  down      Stop all services"
	@echo "  frontend  Start frontend dev server"
	@echo "  backend   Build all backend services"
	@echo "  build     Build everything"
	@echo "  clean     Clean build artifacts"
	@echo "  seed      Seed sample data"
	@echo "  help      Show this message"

infra:
	@echo "Starting infrastructure..."
	docker compose up -d postgres rabbitmq redis minio prometheus grafana

up:
	@echo "Starting all services..."
	docker compose up -d

down:
	@echo "Stopping all services..."
	docker compose down

frontend:
	@echo "Starting frontend..."
	cd frontend/web && npm run dev

backend:
	@echo "Building backend..."
	cd backend && mvn clean install -DskipTests

build: backend
	@echo "Building frontend..."
	cd frontend/web && npm ci && npm run build

clean:
	@echo "Cleaning backend..."
	cd backend && mvn clean
	@echo "Cleaning frontend..."
	cd frontend/web && rm -rf node_modules .next

seed:
	@echo "Seeding data..."
	./scripts/seed-data.sh
