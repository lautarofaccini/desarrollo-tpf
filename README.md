# Trabajo Práctico - Desarrollo de Software

## Alumnos
- Lautaro Faccini
- Mauricio Nicolás Schefer
- Fabricio Víctor Kinweiler
- Facundo Nahuel Fernández
- Yamil Apas Moselli
- Agustín Juan Luis Arduña Zago
- Juan Ignacio Velazco Gez Schegtel

## Instrucciones:
1. Clonar el repositorio de GitHub
2. Ejecutar npm install tanto en /client como en /server
3. Crear un .env en /client con la siguiente información:
    VITE_HOST: Tu direccion IP (opcional)
    VITE_PORT: El puerto donde se ejecutará el cliente (opcional)
4. Crear un .env en la carpeta raíz con la siguiente información:
    DB_HOST: Host de la base de datos
    DB_PORT: Puerto de la base de datos
    DB_USER: Usuario de la base de datos
    DB_PASSWORD: Contraseña del usuario de la base de datos
    DB_DATABASE: Nombre de la base de datos
    HOST: Tu direccion IP (opcional)
    PORT: El puerto donde se ejecutará el cliente (opcional)
    TOKEN_SECRET: Clave para los token de autenticación 
    SECRET_KEY: Clave para los token de los QR
5. Ajustar el puerto del servidor en /server/config.js
6. Instalar la base de datos desde /database/Creación de base de datos/esquema_desarrollo_tpf
7. Disfrutar :)

## Actividad 1: Escenario
La organización de la **Bienal Internacional de Escultura del Chaco** se ha contactado con su empresa para planificar, analizar, desarrollar e implementar un sistema de gestión que soporte el registro de los eventos y escultores, así como también aplicaciones satélites para que los ciudadanos y el público en general puedan realizar comentarios y votaciones durante el evento.

## Requerimientos Funcionales

### 1. Gestión de Eventos
- Generar eventos futuros y cargar eventos pasados para mantener un historial.
- Posibilidad de **agregar, ver, modificar y eliminar** información de cada evento.
- **Detalle del evento**: Información sobre la fecha, lugar, descripción y temática.

### 2. Gestión de Escultores
- Mantener la información de los escultores.
- Posibilidad de **agregar, ver, modificar y eliminar** información de los escultores.
- **Perfil del escultor**: Información detallada como nombre, biografía, contacto y obras previas.

### 3. Gestión de Esculturas
- Posibilidad de **agregar, ver, modificar y eliminar** información sobre cada escultura.
- **Temática de la escultura**: Descripción de la temática, fecha de creación, entre otros detalles.

### 4. Gestión de Imágenes
- **Subir y visualizar imágenes**: Posibilidad de subir y ver fotos de las esculturas en diferentes etapas (antes, durante y después del evento).

### 5. Aplicación Web Pública
- Un sitio web público para visualizar el próximo evento y los eventos anteriores.
- Un sitio web para ver los escultores y sus esculturas.

### 6. Sistema de Votación
- **Votación por visitantes**: Funcionalidad para que los visitantes puedan votar por sus esculturas favoritas. El sistema de votación estará disponible en el sitio web público y permitirá calificar de 1 a 5 (donde 5 es la puntuación más alta).
- **Autenticación de votantes**: Asegurar que cada visitante puede votar solo una vez, mediante una cuenta de usuario o validación por correo electrónico.
  
### 7. Votación por Sitio Web Público
- Un botón de votación estará disponible en el perfil de cada escultor en el sitio web.

### 8. Votación mediante QR
- En cada escultura habrá una tablet/pantalla que mostrará un QR único que cambiará cada minuto. Esto evitará el uso del QR fuera del predio. Los QRs caducarán después de un minuto y no podrán reutilizarse.

### 9. Aplicación Web Progresiva (PWA)
- La aplicación web pública será una **PWA** (Aplicación Web Progresiva), lo que permitirá su uso offline y una mejor experiencia de usuario.

## Requerimientos No Funcionales

### 1. Interfaz de Usuario (UI)
- Adaptable a diferentes dispositivos como tablets, computadoras de escritorio y móviles.

### 2. Multiplataforma
- Compatibilidad con diferentes navegadores y dispositivos (PC, tablet, móvil).

### 3. Autenticación y Autorización
- Uso de mecanismos seguros para la autenticación y autorización de usuarios, tanto en el área de gestión como en el área de usuarios para la votación.

### 4. Protección de Datos
- Asegurar la protección de los datos de escultores y visitantes contra accesos no autorizados.

### 5. Tiempo de Respuesta
- Garantizar tiempos de respuesta rápidos en la carga de vistas y procesamiento de datos.

### 6. Optimización de Imágenes
- Asegurar que las fotos subidas estén optimizadas para una carga rápida sin pérdida de calidad significativa.

### 7. Usabilidad
- Diseño de una interfaz intuitiva y fácil de usar para administradores y visitantes.

### 8. Accesibilidad
- Asegurar que la aplicación sea accesible para usuarios con discapacidades.

### 9. Integración con Redes Sociales
- Posibilidad de compartir eventos y esculturas en redes sociales.

### 10. Sistema de Validación de Votantes
- Implementar medidas para evitar fraudes, como la integración de un sistema de autenticación externo o CAPTCHA.
