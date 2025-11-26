FROM node:18-alpine as builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias del frontend
COPY ./cafeteria-front/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente del frontend
COPY ./cafeteria-front .

# Ejecuta el comando de construcción (asumo 'npm run build' y que la salida es la carpeta 'dist')
# ¡AJUSTA ESTO si tu comando o carpeta de salida es diferente!
RUN npm run build

# --- Etapa 2: Servir los Assets con Nginx (Serve Stage) ---
# Usa una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Remueve la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los assets estáticos generados en la etapa 'builder' a la carpeta de Nginx
# ¡AJUSTA '/app/dist' si tu carpeta de salida es diferente (ej. '/app/build')!
COPY --from=builder /app/dist /usr/share/nginx/html

# El puerto 80 es el puerto por defecto de Nginx
EXPOSE 80