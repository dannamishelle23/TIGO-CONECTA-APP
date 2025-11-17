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

- #### chat.ts

Su función es para enviar mensajes, suscribirse a mensajes_chat con filtros por conversación, manejar indicador "escribiendo..." si se implementa. 

_ionic generate service core/services/chat_

### Guards

- #### auth.guard.ts

Verifica que exista sesión activa; en caso contrario, redirige a /login. Este proteger rutas que requieren autenticación (ej: chat en tiempo real).

_ionic generate guard core/guards/auth_

Se elige la opción: CanActivate

- #### role.guard.ts

Verifica que el usuario autenticado tenga uno de los roles permitidos en la ruta. 

_ionic generate guard core/guards/role_

Elegir también la opción CanActivate 

### 4. Configuración de variables de entorno (credenciales de Supabase)

Este proyecto utiliza Supabase para autenticación, base de datos, almacenamiento e interacciones en tiempo real. Por motivos de seguridad, es importante que las credenciales reales (URL y ANON KEY) NO sean expuestas en el repositorio.

Por eso, los siguientes archivos: environment.ts y environment.prod.ts están ignorados mediante .gitignore

En la carpeta src/environments/ se encuentran los siguientes archivos:

- environment.example.ts
- environment.prod.example.ts

Estos archivos son una plantilla para que cualquiera que descargue el proyecto sepa qué valores debe configurar.

Las credenciales se configuran siguiendo los siguientes pasos:

Duplicar los archivos de ejemplo:

- environment.example.ts → environment.ts
- environment.prod.example.ts → environment.prod.ts

Reemplazar los placeholders con la URL y ANON KEY de Supabase reales:

#### Ejemplo.
export const environment = {
  - production: false,
  - supabaseUrl: 'https://YOUR_PROJECT_ID.supabase.co',
  - supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY'
};

En environment.prod.ts, cambiar production: true para hacer el build de la APK.