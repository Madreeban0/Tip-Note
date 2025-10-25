# Stage 1: Build the JAR with Gradle + JDK21
FROM gradle:8.9-jdk21-alpine AS builder
WORKDIR /workspace
COPY build.gradle settings.gradle ./
COPY gradle gradle
COPY src src
RUN gradle clean bootJar --no-daemon

# Stage 2: Run with JDK21
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=builder /workspace/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]