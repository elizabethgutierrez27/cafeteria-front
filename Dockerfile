# --- Build stage ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Serve stage (nginx) ---
FROM nginx:alpine

# borrar config por defecto
RUN rm /etc/nginx/conf.d/default.conf

# copiar tu nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPIA CORRECTA según tu estructura
COPY --from=builder /app/dist/cafe-app/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
