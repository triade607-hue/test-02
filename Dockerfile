# Utilise Node.js 20
FROM node:20-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe TOUTES les dépendances (dev + prod)
RUN npm ci

# Copie tout le code source
COPY . .

# Build de l'application Next.js
RUN npm run build

# Expose le port 3000
EXPOSE 3000

# Démarre l'application
CMD ["npm", "start"]