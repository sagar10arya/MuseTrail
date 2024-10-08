import conf from "../conf.js";
import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client = this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug,   // considering slug as document id
                {title, content, featuredImage, status, userId}
            ) 
        } catch (error) {
            console.log("Appwrite Service : createPost : error : ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug,   // document id
                {title, content, featuredImage, status}
            ) 
        } catch (error) {
            console.log("Appwrite Service : updatePost : error : ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service : deletePost : error : ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service : getPost : error : ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                [
                    queries,
                    // Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log("Appwrite Service : getPosts : error : ", error);
            return false;
        }
    }

    // File Upload Service
    
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Service : uploadFile : error : ", error);
            return false;
        }
    }
    
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service : deleteFile : error : ", error);
            return false;
        }
    }
    
    getFilePreview(fileId) {
        this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()

export default service;