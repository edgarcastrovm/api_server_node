
## Estructura del proyecto

```txt
│── app/
│   ├── config/
│   │   └── db.config.js
│   ├── controllers/
│   │   ├── home.controller.js
│   │   └── product.controller.js
│   ├── env
│   ├── models/
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── home.html
│   ├── routes/
│   │   ├── page.routes.js
│   │   └── product.routes.js
│   └── server.js
├── db/
│   ├── sp.sql
│   └── tables.sql
├── docker-compose.yml
└── README.md

```

## Configuración 

### DB
En la carpeta **db** tenemos los script necesarios para inicializar el proyecto 
- **tables.sql** Crea las tablas
- **sp.sql** Contiene los stored procedures para el CRUD de la tabla

### Conexión a db

Crear **app/.env** y en el poner la configuración para el acceso a base de datos

```properties
DB_HOST=localhost
DB_PORT=5432
DB_USER=db_user
DB_PASSWORD=db_pass
DB_NAME=db_name
```

## Instalación  

```sh
cd app
npm install
```
## Ejecución 

```sh
node server.js
```