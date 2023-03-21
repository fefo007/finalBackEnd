# Bienvenidos a la App para un ecommerce

proyecto creado con Node.js para poder ser utilizado en la creacion de un ecommerce;
la creacion de este proyecto es para el examen final del curso de BackEnd de [Coderhouse](https://www.coderhouse.com/ 'coderhouse')

## Tecnologias y dependencias utilizadas

- NodeJs
- ExpressJs
- artillery
- autocannon
- axios
- bcrypt
- chai
- compression
- connect-mongo
- dotenv
- express
- express-handlebars
- express-session
- firebase-admin
- forever
- jsonwebtoken
- log4js
- mime-types
- minimist
- mocha
- mongodb
- mongoose
- multer
- nodemailer
- passport
- passport-local
- pm2
- socket.io
- supertest
- twilio
- yargs

### Antes de iniciar la aplicacion

1- configurar el archivo .env con los datos indicados a continuacion

HOST: el host a utilizar (en desarrollo http://localhost)
MONGO_STORE: la ruta con el usuario , contraseña y base de datos brindada por [MongoAtlas](https://account.mongodb.com/account/login?n=%2Fv2%2F6382833e08be62157cc74ac9%23%2Fmetrics%2FreplicaSet%2F63c7e1b19bf3705188357b83%2Fexplorer%2Fecommerce%2Fcarritos%2Ffind 'mongoAtlas')
SESSION_SECRET: clave personalizada para session, de no querer configurarla colocar 'shhhhhhhhhhhhhhhhhhhhh'
GMAIL_ACCOUNT: Gmail al cual seran enviada notificaciones 
GMAIL_PASS: clave dada por Gmail para el uso en aplicaciones [tutorial](https://support.google.com/accounts/answer/185833?hl=es 'ayudaDeGoogle')
TWILIO_SID: SID dada por twilio al tener una cuenta
TWILIO_TOKEN:TOKEN dado por twilio al tener una cuenta [twilio](https://www.twilio.com/login?g=%2Fconsole-zen%2F%3FframeUrl%3D%2Fconsole%3Fx-target-region%3Dus1&t=c2d53af65346496b65aa70b2e4d1ac05753a4bf97fc4e81079ebc7fa31a586ae 'twilio')
FIREBASE_CONFIG: configuracion para firebase, descargar el JSON brindado por firebase y colocar de la siguiente manera : '{objeto firebase}'[firebase](https://firebase.google.com/?hl=es)
PRIVATE_KEY: clave utilizada para el Json Web Token, cualquiera que decida el usuario
TWILIO_NUMBER: numero dado por twilio para recibir sms y whatsapp

2- 
-npm start iniciara la aplicacion por defecto en modo fork, en el puerto 8080 y usando Mongo Atlas en la persistencia
-el archivo src/server.js puede iniciar el servidor de las siguientes maneras:
    -src/server.js file (inicia usando filesistem como persistencia en local)
    -src/server.js fire (inicia usando firebase como persistencia)
    -src/server.js o -src/server.js mongo (inicia usando mongo atlas como persistencia)
    -src/server.js -p numero de puerto (permite setear el puerto)
    Nota
    -permite el inicio con forever src/server.js
    - permite el uso de pm2 start para iniciar el servidor en fork o cluster
    comandos : 
    pm2 start
    pm2 list
    pm2 delete id/name
    pm2 desc name
    pm2 monit
    pm2 --help
    pm2 logs
    pm2 flush

#### Metodos, rutas y respuestas

Metodo:GET  /carritos (responde un json con la lista de todos los carrito o un json error)
Metodo:GET  /carritos/carrito (responde un json con el carrito creado o un json error)
Metodo:DELETE   /carrito/carrito/:id (responde un json con el carrito que se elimino al colocar su id o un json error)
Metodo:GET  /carrito/:id/productos (responde un json con el carrito elegido o json error)
Metodo:POST /carrito/:id/productos/:id_prod (responde un json con el carrito elegido donde se guardo el producto o json error)
Metodo:DELETE   /carrito/:id/productos/:id_prod (responde un json con el carrito elegido donde se borro el producto o json error)

Metodo:GET  /usuarios (responde un json con la lista de todos los usuarios o un json error)
Metodo:PUT  /usuarios/:username (responde un json con el usuario actualizado o un json error)
Metodo:DELETE   /usuarios/:id (responde un json con el usuario borrado o un json error)
Metodo:GET  /usuarios/register (responde una vista con el formulario para registrar)
Metodo:POST /usuarios/register (en error redirecciona a '/usuarios/registerError', en succes redirecciona a '/')
Metodo:POST /usuarios/login (en caso de exito responde un json con el token y el username)
Metodo:GET  /usuarios/registerError (responde una vista de error)
Metodo:GET  /usuarios/loginError (responde una vista de error)
Metodo:GET  /usuarios/logout (responde un json con 'usuario deslogeado')
Metodo:GET  /usuarios/sistemInfo (responde una vista con la informacion del sistema)

Metodo:GET /mensajes (responde una vista con todos los mensajes y el formulario para el metodo:POST)
Metodo:GET  /mansajes/:username (responde un json con el mensaje seleccionado o un json error)
Metodo:POST /mensajes (redirecciona al '/mensajes' metodo:GET)

Metodo:GET /ordenes (responde un json con todas las ordenes o un json error)
Metodo:GET  /ordenes/username/:username (responde un json con la orden seleccionada o un json error)
Metodo:GET /ordenes/id/:id (responde un json con la orden seleccionada o un json error)
Metodo:POST /ordenes (responde un json con la orden guardada o un jeson error)

Metodo:GET  /productos (responde una vista con los productos cargados y el formulario del metodo:POST)
Metodo:GET  /productos/front (responde un json copn todos los productos o un json error)
Metodo:GET  /productos/:id  (responde un json con el producto seleccionado o un json error)
Metodo:POST /productos/cargarProductos (redirecciona el '/productos' metodo:GET)
Metodo:PUT  /productos/cargarProductos/:id (responde un json con el producto actualizado o un json error)
Metodo:DELETE  /productos/cargarProductos/:id (responde un json con el producto eliminado o un json error)
