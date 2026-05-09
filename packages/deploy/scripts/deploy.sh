#!/bin/bash
# Simplified deploy script for Ai-Whisperers client sites on Docker Swarm
# Usage: ./deploy.sh [stack-name] [image-tag]

set -euo pipefail

STACK_NAME="${1:-$(basename $(pwd))}"
IMAGE_TAG="${2:-prod}"

echo "🏗️  Building ${STACK_NAME}:${IMAGE_TAG}..."
docker build -t "${STACK_NAME}:${IMAGE_TAG}" .

echo "🚀 Deploying ${STACK_NAME} to swarm..."
docker stack deploy -c docker-compose.yml "${STACK_NAME}" --detach=false

echo "✅ Done! Stack: ${STACK_NAME}, Image: ${STACK_NAME}:${IMAGE_TAG}"
echo "   Healthcheck: curl -I https://${STACK_NAME}.paragu-ai.com"
