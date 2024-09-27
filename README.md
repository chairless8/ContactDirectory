Frontend de la Aplicación de Contactos
Este proyecto es el frontend de una aplicación de gestión de contactos desarrollada con Angular.

Requisitos
Node.js y npm instalados en tu sistema.

Angular CLI instalado globalmente. Si no lo tienes, puedes instalarlo con:

bash
Copy code
npm install -g @angular/cli
Backend de la aplicación en funcionamiento (desarrollado con Laravel).

Instalación
Clona el repositorio:

bash
Copy code
git clone https://github.com/tu-usuario/tu-repositorio.git
Accede al directorio del proyecto:

bash
Copy code
cd tu-repositorio
Instala las dependencias:

bash
Copy code
npm install
Ejecución
Para iniciar la aplicación en modo de desarrollo:

bash
Copy code
ng serve
La aplicación estará disponible en http://localhost:4200.

Configuración
Backend API: Asegúrate de que el backend está corriendo y accesible. Si necesitas cambiar la URL de la API, modifícala en el servicio ContactService:

typescript
Copy code
// src/app/services/contact.service.ts
private apiUrl = 'http://tu-backend.com/api/contacts';
Funcionalidades
Listar Contactos: Visualiza todos los contactos almacenados.
Buscar Contactos: Utiliza la barra de búsqueda para encontrar contactos por nombre, empresa, teléfono, email o dirección.
Agregar Contacto: Añade nuevos contactos con información detallada, incluyendo teléfonos, emails y direcciones.
Editar Contacto: Modifica la información de contactos existentes.
Eliminar Contacto: Elimina contactos y sus datos asociados.
Tecnologías Utilizadas
Angular: Framework para desarrollar aplicaciones web dinámicas.
TypeScript: Superconjunto de JavaScript que añade tipado estático.
Tailwind CSS: Framework de utilidades para estilizar la aplicación.