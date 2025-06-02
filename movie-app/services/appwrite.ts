import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_COLLECTION_ID!;
const SAVED_MOVIES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_DB_SAVED_MOVIES_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
const account = new Account(client);

export const updateSearchCount = async (searchQuery: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchQuery),
    ]);

    if (result.documents.length > 0) {
      const existingDocument = result.documents[0];
      const updatedCount = existingDocument.count + 1;
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingDocument.$id,
        {
          count: updatedCount,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: searchQuery,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveMovie = async (movie: Movie) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    const existingMovie = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
      Query.equal("movie_id", movie.id),
      Query.equal("user_id", currentUser.$id),
    ]);

    if(existingMovie.documents.length > 0){
      return { success: true, message: 'Movie already saved' };
    }

    const result = await database.createDocument(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID,
      ID.unique(),
      {
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        user_id: currentUser.$id,
      }
    );

    return { success: true, data: result, message: 'Movie saved to your collection' };
  } catch (error) {
    console.log('Error saving movie:', error);
    throw error;
  }
};

export const unsaveMovie = async (movie: Movie) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    const existingMovie = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
      Query.equal("movie_id", movie.id),
      Query.equal("user_id", currentUser.$id),
    ]);

    if(existingMovie.documents.length === 0){
      return { success: true, message: 'Movie not saved' };
    }

    const result = await database.deleteDocument(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID,
      existingMovie.documents[0].$id
    );

    return { success: true, data: result, message: 'Movie removed from your collection' };
  } catch (error) {
    console.log('Error unsaving movie:', error);
    throw error;
  }
};

export const getSavedMovies = async (): Promise<SavedMovie[] | undefined> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
      Query.equal("user_id", currentUser.$id),
    ]);

    return result.documents as unknown as SavedMovie[];
  } catch (error) {
    console.log('Error getting saved movies:', error);
    throw error;
  }
};

export const createAccount = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    if (response.$id) {
      return await login(email, password);
    }
    return response;
  } catch (error) {
    console.log("Error creating account:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Error logging in:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.log("Error getting current user:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    return { success: true };
  } catch (error) {
    console.log("Error logging out:", error);
    throw error;
  }
};

export const updateUserName = async (name: string) => {
  try {
    const response = await account.updateName(name);
    return response;
  } catch (error) {
    console.log("Error updating user name:", error);
    throw error;
  }
};

export const updateUserPassword = async (
  password: string,
  oldPassword: string
) => {
  try {
    const response = await account.updatePassword(password, oldPassword);
    return response;
  } catch (error) {
    console.log("Error updating password:", error);
    throw error;
  }
};
