FROM mcr.microsoft.com/devcontainers/java:1-21-bookworm

ARG INSTALL_MAVEN="true"
ARG MAVEN_VERSION="3.9.9"

RUN if [ "${INSTALL_MAVEN}" = "true" ]; then \
    su vscode -c "mvn --version"; \
    fi

ARG INSTALL_NODE="true"
ARG NODE_VERSION="20"

RUN if [ "${INSTALL_NODE}" = "true" ]; then \
    su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; \
    fi

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
