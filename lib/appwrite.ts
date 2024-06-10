import { Client, Account, ID, Avatars, Databases, Query, Storage, QueryTypesList } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.wzh.aora",
    projectId: "66471b10002a59ee2d58",
    databaseId: '66472679002789e7d446',
    userCollectionId: '66472696001e7dbb2819',
    videoCollectionId: '664726d5002ee7f54a6c',
    storageId: "6647287b0033227bacab"
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config


// Init your React Native SDK
const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)


const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email: string, username: string, password: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount || username === '') throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser

    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}


export const signIn = async (email: string, password: string) => {
    try {
        // await account.deleteSession('current')
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) {
            throw Error
        }

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [(Query.equal('accountId', currentAccount.$id))]
        )
        if (!currentUser) {
            throw Error
        }

        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
            
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(5)]
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

export const searchPosts = async (query: string) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserPosts = async (userId: number) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('users', userId)]
        )

        return posts.documents
    } catch (error: any) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error: any) {
        throw new Error(error)
    }
}

export const uploadFile = async (file: { fileName: any; mimeType: any; fileSize: any; uri: any; }, type: string) => {
    if (!file) return

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadFile.$id, type)

        return fileUrl

    } catch (error: any) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId: string, type: string) => {
    let fileUrl

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000)
        } else {
            throw new Error('Invalid file type')
        }

        if (!fileUrl) throw Error

        return fileUrl

    } catch (error: any) {
        throw new Error(error)
    }
}

export const createVideo = async (form: { thumbnail: { fileName: any; mimeType: any; fileSize: any; uri: any; }; video: { fileName: any; mimeType: any; fileSize: any; uri: any; }; title: any; prompt: any; userId: any; }) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            databaseId, videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            users: form.userId
        })

        return newPost


    } catch (error: any) {
        throw new Error(error)
    }
}

