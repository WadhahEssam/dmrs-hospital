// This file contains the different functions for the models (i.e. permissions, types, and users).

import users from './users';
import types from './types';

export default class Model {

  // Check if the passed user exists in the prefilled users list
  static checkUser(email, password, type) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password && users[i].type.name === type) {
        console.log(users[i])
        return true;
      } 
    }
    return false;
  }

  static getUser(email) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return users[i];
      } 
    }
    return null;
  }

  static getUsers() {
    return users;
  }

  static getTypes() {
    return types;
  }
}