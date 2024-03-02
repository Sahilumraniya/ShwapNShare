import conf from "../conf/conf.js";
import { Client, Databases, ID , Storage , Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    static generateUniqueId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uniqueId = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          uniqueId += characters.charAt(randomIndex);
        }
      
        return uniqueId;
      }

    async createProduct({ name, description, price, image , userId , isExchange , items}) {
        try{
            let id = Service.generateUniqueId(25);
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,id,{
                id,
                name,
                description,
                price,
                isExchange,
                items,
                image,
                userId
            });
        }catch(e){
            console.log("Service :: createProduct: ", e);
            throw e;
        }
    }

    async updateProduct(id , { name, description, price, image , items , isExchange}) {
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,id,{
                name,
                description,
                price,
                image,
                items,
                isExchange
            });
        }catch(e){
            console.log("Service :: updateProduct: ", e);
            throw e;
        }
    }

    async deleteProduct(id) {
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,id);
            return true;
        }catch(e){
            console.log("Service :: deleteProduct: ", e);
            return false;
        }
    }

    async getProduct(id) {
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,id);
        }catch(e){
            console.log("Service :: getProducts: ", e);
            return false;
        }
    }

    async getProducts(){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId);
        }catch(e){
            console.log("Service :: getProducts: ", e);
            return false;
        }
    }

    async getProductsOfExchange(queries = [Query.equalTo("isExchange", true)]){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
        }catch(e){
            console.log("Service :: getProducts: ", e);
            return false;
        }
    }

    // file service

    async uploadImage(file){
        try{
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
        }catch(e){
            console.log("Service :: uploadImage: ", e);
            return false;
        }
    }

    async deleteImage(id){
        try{
            await this.bucket.deleteFile(conf.appwriteBucketId,id);
            return true;
        }catch(e){
            console.log("Service :: deleteImage: ", e);
            return false;
        }
    }

    getImagePreview(id){
        return this.bucket.getFilePreview(conf.appwriteBucketId,id);
    }

}

const service = new Service();

export default service;