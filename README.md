# ContolFid

######Control de acceso/asistencia 

## Descripción

Proyecto de fin de curso 2014-2016 del ciclo formativo de desarrollo de aplicaciones web

En éste proyecto, hemos creado una empresa temporal, la cual se dedica mediante tecnologías de hoy en día al control de asistencia/acceso en cualquier entorno mediante un dispositivo electrónico y una aplicación web.

En el siguente apartado se detallan los pasos a seguir para la implementación de nuestra aplicación.

* * *

[Web ControlFid](controlfid.zubirimanteoweb.com)  

* * *

## Documentación

Primeramente descargar el código desde éste repositorio, acceder a él desde la línea de comandos y ejecutar 'npm install' para instalar los módulos necésarios para el funcionamiento. [Guía de instalación de NodeJS y npm](https://github.com/ionatibia/nodejs)

### Base de datos

*   MySQL: Importar base de datos mediante phpMyAdmin o línea de comandos a MySQL local o en la nube. Hay 2 opciones:
    1.  Cotrolfid.sql: Contiene datos de alumnos, clases, profesores, etc... preinsertados para una utilización rápida de la aplicación. **Las contraseñas** de los profesores son como usuario profesor(1-5)@zubirimanteo.com y como contraseña para todos su correspondiente profesor(1-5).
    2.  ControlfidVacio.sql: Contiene 1 único usuario con permisos de administrador para tener el esquema vacio e ir configurándolo a gusto del consumidor (seguir pasos del apartado Uso). Ususario: admin pasword: admin.

*   Conexión en local: Modificar los parámetros que están entre comillas simples host,puerto,usuario,contraseña, el nombre de la base de datos no es necesario modificar.
*   Openshift: No hay que modificar nada.
*   Cloud 9: Comentar el código existente y descomentar el segundo código.

*   Mongo: Crear una cuenta en MongoLabs o utilizar servidor Mongo local. Crear una Collection llamada 'faltas' y modificar la dirección del servidor mongo (@ds059215.mongolab.com:59215/faltas) en el archivo 'models/mongo.js'. Para el usuario y la contraseña guardarlos en variables de entorno con los nombres, MONGO_USER y MONGO_PASSWORD. [Guía Openshift](https://developers.openshift.com/en/managing-environment-variables.html). En local utilizar en la llamada a la aplicación "MONGO_USER='el usuario' MONGO_PASSWORD='el password' node ./bin/www.js"

### Correo

*   Maigun: Crear cuenta en Mailgun, guardar el dominio y la ApiKey como variables de entorno con los nombres MAILGUN_DOMAIN y MAILGUN_API_KEY. Para la configuración del correo con el dominio [acceder aquí](https://github.com/ionatibia/php/tree/master/tests/3-mailgun)


###Uso

###API