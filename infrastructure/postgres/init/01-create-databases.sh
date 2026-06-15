#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE elearning_users;
    CREATE DATABASE elearning_courses;
    CREATE DATABASE elearning_quizzes;
    CREATE DATABASE elearning_payments;
    CREATE DATABASE elearning_notifications;
    CREATE DATABASE elearning_analytics;
EOSQL
