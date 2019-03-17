// This file contains the hard-coded users used for this project.
// Every user object has the following info: email, username, password, and type.

import types from './types';

let users = [
  {
    email: "wadah@hotmail.com",
    username: "Wadah Esam",
    password: "112233",
    type: types['doctor']
  },
  {
    email: "mohammed@hotmail.com",
    username: "Mohammed Khaled",
    password: "112233",
    type: types['receptionist']
  },
  {
    email: "dr.alobaili@gmail.com",
    username: "Abdulaziz Alobaili",
    password: "112233",
    type: types['laboratoryTechnician']
  },
  {
    email: "khalid@gmail.com",
    username: "Khalid Ahmad",
    password: "112233",
    type: types['radiologist']
  }
];

export default users;