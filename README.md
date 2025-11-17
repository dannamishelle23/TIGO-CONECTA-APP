# TIGO-CONECTA-APP

## Objetivo general 

Desarrollar la aplicación móvil "Tigo Conecta" que permitirá a la empresa promocionar y gestionar
sus planes móviles a través de canales digitales modernos.

## Objetivos especificos 

- Implementar autenticación y autorización con diferentes roles de usuario
- Gestionar bases de datos con Supabase o Firebase
- Implementar almacenamiento de archivos con Supabase Storage
- Utilizar Authentication con Supabase o Firebase

# Desarrollo

### 1. Crear el proyecto en Ionic 

Ejecutar el comando en el cmd: 

_ionic start tigo-conecta tabs --type=angular --standalone_

Esto genera la plantilla tabs con páginas standalone.

### 2. Instalar las dependencias 

Supabase client: npm install @supabase/supabase-js

### 3. Creacion de carpetas

Dentro de src/app se crea una carpeta _core_ y dentro de esta se crean dos carpetas:

1. _services/_: Contendrá los servicios que encapsulan la lógica de la aplicación como: autenticación, subida de imágenes o consultas CRUD con la API Supabase.

2. _guards/_: Contendrá los guards que protegen rutas según estado de sesión y roles, que son esenciales para el control de acceso.

Cada una de estas dos carpetas sigue la siguiente estructura:

### Services

- #### supabase.ts: 

Se encarga de inicializar el cliente de Supabase con URL y anon key. Evita inicializar Supabase en múltiples lugares y facilita cambios de configuración.

_ionic generate service core/services/supabase_ 

- #### auth.ts

Se encarga de centralizar todo lo relacionado a la autenticación del usuario como: registro, inicio y cierre de sesión, obtener perfil de usuario, exponer observable del usuario y su rol. También actualiza la tabla usuarios en Supabase tras el signUp para asignar usuario_registrado.

_ionic generate service core/services/auth_

- #### plan.ts

Es responsable del CRUD de planes_moviles, subir/obtener/eliminar imágenes en planes-imagenes, obtener lista y soporte de filtros/búsqueda, suscripción a cambios.

_ionic generate service core/services/plan_

#### chat.ts

Su función es para enviar mensajes, suscribirse a mensajes_chat con filtros por conversación, manejar indicador "escribiendo..." si se implementa. 

_ionic generate service core/services/chat_

