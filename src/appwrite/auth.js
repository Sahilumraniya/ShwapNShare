import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthSerivce {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call the login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
      console.log("AuthSerivce :: createAccount: ", e);
      throw e;
    }
  }

  async login({ email, password }) {
    try {
      const userAccount = await this.account.createEmailSession(email, password);
      if (userAccount) {
        return userAccount;
      }
    } catch (e) {
      console.log("AuthSerivce :: login: ", e);
      throw e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.log("AuthSerivce :: getCurrentUser: ", e);
      throw e;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (e) {
      console.log("AuthSerivce :: logout: ", e);
      throw e;
    }
  }

  async getUser(id){
    try {
      const data =  await this.account.get(id);
      if(data){
        console.log("AuthSerivce :: getUser: ", data);
        return data;
      }
    } catch (e) {
      console.log("AuthSerivce :: getUser: ", e);
      throw e;
    }
  }

}

const authserivce = new AuthSerivce();

export default authserivce;