# Usar una imagen base oficial de PHP con Apache
FROM php:8.3.7-apache

# Instalar extensiones necesarias
RUN docker-php-ext-install mysqli

# Copiar los archivos de la aplicación al directorio raíz de Apache
COPY ./frontend /var/www/html/frontend
COPY ./backend /var/www/html/backend

# Establecer los permisos correctos
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Apache en modo foreground
CMD ["apache2-foreground"]
