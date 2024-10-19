const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    baseUrl: String(import.meta.env.VITE_BASEURL),
    cookieName: String(import.meta.env.VITE_COOKIE),
    appId: Number(import.meta.env.VITE_APPID),
    serverSecret: String(import.meta.env.VITE_SERVERSECRET),
    googleClientId: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
}

export default conf;