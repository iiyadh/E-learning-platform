#!/bin/bash
set -e

echo "=== E-Learning Platform - Start ==="

case "${1:-infra}" in
  infra)
    echo "Starting infrastructure services..."
    docker compose up -d postgres rabbitmq redis minio prometheus grafana
    ;;
  all)
    echo "Starting all services..."
    docker compose up -d
    ;;
  frontend)
    echo "Starting frontend..."
    cd frontend/web && npm run dev
    ;;
  backend)
    echo "Building and starting backend services..."
    cd backend && mvn clean install -DskipTests
    ;;
  *)
    echo "Usage: $0 {infra|all|frontend|backend}"
    echo "  infra    - Start infrastructure (PostgreSQL, RabbitMQ, Redis, MinIO, monitoring)"
    echo "  all      - Start everything"
    echo "  frontend - Start frontend dev server"
    echo "  backend  - Build all backend services"
    ;;
esac

echo "=== Done ==="
