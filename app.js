const express = require("express");
const app = express();
const router = require("./routers/router.js");
const session = require('express-session');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// use session
app.use(session ({
    secret: 'recommend 128 bytes random string',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30 
    },
    rolling: true
}));

// set up view engine
app.set("view engine", "ejs");

// static
app.use('/', express.static("./public"));
app.use('/avatars', express.static("./avatars"));

// list of routers
app.get("/", router.showIndex);                                         // display index page
app.get("/sign_up", router.showSign_up);                                // display sign up page
app.post("/check_sign_up", router.doSign_up);                           // do sign up action
app.get("/login", router.showLogin);                                    // display login page
app.post("/check_login", router.doLogin);                               // do login action
app.get("/logout", router.doLogout);                                    // do logout action
app.get("/set_avatar", router.showSet_avatar);                          // display set avatar page
app.post("/check_set_avatar", router.doSet_avatar);                     // do set avatar action
app.get("/edit_avatar", router.showEdit_avatar);                        // display edit avatar page
app.get("/check_edit_avatar", router.doEdit_avatar);                    // do edit avatar action
app.post("/post_message", router.sendMessage);                          // send message action
app.get("/all_twitters", router.listAll_twitters);                      // list all twitters: Ajax service
app.get("/get_users_info", router.getUsers_info);                       // get all users info
app.get("/get_all_messages", router.getAll_messages);                   // spilt pages  -->> unused
app.get("/user/:user", router.showUser_info);                           // display user's personal info
app.get("/users_list", router.showAll_users);                           // display a list that show all users
app.get("/chat", router.showChat);

users = [];
connections = [];

io.sockets.on('connection', (socket) => {
    // Connect
    connections.push(socket);
    console.log('Connected: %s sockets connected', socket.id, connections.length);

    // Disconnect
    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.username), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', socket.id, connections.length);
    });

    // Send Message
    socket.on('send message', (data) => {
        console.log(data);
        io.sockets.emit('new message', {msg: data, user: socket.username})
    });

    // New User
    socket.on('new user', (data, callback) => {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUserNames();
    });

    function updateUserNames() {
        io.sockets.emit('get users', users);
    }
});

server.listen(process.env.PORT || 3000);
console.log("Server is running 3000");