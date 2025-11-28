#!/bin/bash

# Script de despliegue para SIGA Frontend
# Uso: ./scripts/deploy.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
BUILD_DIR="build"
DEPLOY_USER="usuario"
declare -A SERVERS
SERVERS=( ["staging"]="staging.tudominio.com" ["production"]="prod.tudominio.com" )
DEPLOY_PATH="/var/www/html/siga"

echo "Iniciando despliegue de SIGA Frontend para entorno: $ENVIRONMENT"

# Validar entorno
if [[ -z "${SERVERS[$ENVIRONMENT]}" ]]; then
    echo "Entorno no válido. Usar: staging o production"
    exit 1
fi

SERVER=${SERVERS[$ENVIRONMENT]}

echo "Construyendo aplicación..."
npm run build

echo "Subiendo archivos al servidor ($SERVER)..."
rsync -avz --delete \
    --exclude '*.map' \
    $BUILD_DIR/ $DEPLOY_USER@$SERVER:$DEPLOY_PATH/

echo "Limpiando cache..."
ssh $DEPLOY_USER@$SERVER "cd $DEPLOY_PATH && find . -name \"*.html\" -exec touch {} \;"

echo "Despliegue completado exitosamente en $ENVIRONMENT"
echo "URL: https://$SERVER"
