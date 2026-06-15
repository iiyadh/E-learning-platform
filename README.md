# E-Learning Platform

A microservices-based e-learning platform built with Spring Boot 3.4 (Java 21) and Next.js 14.

## Architecture

- **Frontend**: Next.js 14 (App Router), React 18, Zustand, TanStack Query, Tailwind CSS
- **Backend**: Spring Boot 3.4, Spring Cloud Gateway, PostgreSQL, RabbitMQ, Redis, MinIO
- **Monitoring**: Prometheus, Grafana

### Services

| Service              | Port | Description                    |
| -------------------- | ---- | ------------------------------ |
| API Gateway          | 8080 | Spring Cloud Gateway           |
| User Service         | 8081 | Authentication & user management |
| Course Service       | 8082 | Course & lesson management     |
| Quiz Service         | 8083 | Quiz & assessment engine       |
| Payment Service      | 8084 | Payment processing             |
| Notification Service | 8085 | Email & push notifications     |
| Analytics Service    | 8086 | Tracking & reporting           |

### Infrastructure

| Service    | Ports              |
| ---------- | ------------------ |
| PostgreSQL | 5432               |
| RabbitMQ   | 5672, 15672 (UI)   |
| Redis      | 6379               |
| MinIO      | 9000 (API), 9001 (Console) |
| Prometheus | 9090               |
| Grafana    | 3001               |

## Prerequisites

- Java 21
- Node.js 20
- Docker & Docker Compose
- Maven 3.9+

## Quick Start

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Start infrastructure
make infra

# 3. Build and run backend
make backend

# 4. Start frontend
make frontend
```

## Project Structure

```
e-learning-platform/
├── frontend/web/       # Next.js application
├── backend/
│   ├── api-gateway/    # Spring Cloud Gateway
│   ├── services/       # Microservices
│   └── shared/         # Shared modules
├── infrastructure/     # Docker configs
└── scripts/            # Utility scripts
```
