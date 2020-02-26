const index = require("../routers/index");
const sign_up = require("../routers/sign_up");
const do_sign_up = require("../routers/do_sign_up");
const login = require("../routers/login");
const do_login = require("../routers/do_login");
const do_logout = require("../routers/do_logout");
const set_avatar = require("../routers/set_avatar");
const do_set_avatar = require("../routers/do_set_avatar");
const edit_avatar = require("../routers/edit_avatar");
const do_edit_avatar = require("../routers/do_edit_avatar");
const send_message = require("../routers/sendMessage");
const list_all_twitters = require("../routers/list_all_twitters");
const get_users_info = require("../routers/get_users_info");
const get_all_messages = require("../routers/get_all_messages");
const show_user_info = require("../routers/show_user_info");
const show_all_users = require("../routers/showAll_users");
const show_chatting_room = require("../routers/showChat");

// display home page
exports.showIndex = index.showIndex;
// display sign up page
exports.showSign_up = sign_up.showSign_up;
// do sign up action
exports.doSign_up = do_sign_up.doSign_up;
// display login page
exports.showLogin = login.showLogin;
// do login action
exports.doLogin = do_login.doLogin;
// do logout action
exports.doLogout = do_logout.doLogout;
// display set avatar
exports.showSet_avatar = set_avatar.showSet_avatar;
// do set avatar action
exports.doSet_avatar = do_set_avatar.doSet_avatar;
// display edit avatar
exports.showEdit_avatar = edit_avatar.showEdit_avatar;
// do edit avatar action
exports.doEdit_avatar = do_edit_avatar.doEdit_avatar;
// post message
exports.sendMessage = send_message.sendMessage;
// list all twitters
exports.listAll_twitters = list_all_twitters.list_all_twitters;
// get users info
exports.getUsers_info = get_users_info.getUsers_info;
// get all messages and spilt
exports.getAll_messages = get_all_messages.getAll_messages;
// display personal user's info
exports.showUser_info = show_user_info.showUSer;
// display all users who are on the list
exports.showAll_users = show_all_users.showAll_users;
// display chat page
exports.showChat = show_chatting_room.showChat;