const { escapeId } = require("mysql");

let users = [];

const checkUser = ({ id1, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    users = users.map((item) =>
      item.id === existingUser.id ? { ...item, id: id1 } : item
    );
    return existingUser;
    // console.log(existingUser);
    // return { error: "Username is taken." };
    //  removeUser(existingUser.id);
  }
  return null;
};
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) {
    // console.log(existingUser);
    // return {
    //    error: "Username is taken." };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  // console.log(users);
  // console.log(id);
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  //console.log(users, id);
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, checkUser };
