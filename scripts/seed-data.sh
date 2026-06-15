#!/bin/bash
set -e

echo "=== E-Learning Platform - Seed Data ==="

echo "Seeding user-service..."
# TODO: curl -X POST http://localhost:8081/api/v1/users/seed

echo "Seeding course-service..."
# TODO: curl -X POST http://localhost:8082/api/v1/courses/seed

echo "Seeding quiz-service..."
# TODO: curl -X POST http://localhost:8083/api/v1/quizzes/seed

echo "=== Done ==="
