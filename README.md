# Prueba Nexos

Este proyecto fué realizado por Juan David Alzate

## Development server backend

Las configuraciones de la base de datos se encuentran en el archivo application.properties

## Development server frontend

Despues de tener el backend corriendo correctamente, se debe correr el frontend utilizando el comando  `ng serve --proxy-config proxy.conf.json` para poder consumir correctamente la aplicacion.
 
Si no se usa el proxy especificado obtendrá error de cors al hacer peticiones al backend
 
Despues de ejecutar el comando con el proxy se accede normalmente en `http://localhost:4200/`. La app recargará automaticamente si realizas algun cambio al codigo fuente.