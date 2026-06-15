FROM maven:3.9-eclipse-temurin-21
WORKDIR /app
COPY pom.xml ./
COPY shared/ ./shared/
COPY api-gateway/ ./api-gateway/
COPY services/ ./services/
RUN mvn clean install -DskipTests -q
EXPOSE 8080
ARG SERVICE=api-gateway
ENV SERVICE=${SERVICE}
ENTRYPOINT ["sh", "-c", "if [ -d \"/app/services/$SERVICE\" ]; then exec java -jar /app/services/$SERVICE/target/*.jar; else exec java -jar /app/$SERVICE/target/*.jar; fi"]
