import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getSavedMovies } from '@/services/appwrite';

interface SavedMoviesContextType {
  savedMovies: SavedMovie[];
  refreshSavedMovies: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(undefined);

export const SavedMoviesProvider = ({ children }: { children: ReactNode }) => {
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [moviesCount, setMoviesCount] = useState<number>(0);

  const refreshSavedMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const movies = await getSavedMovies();
      
      if (movies && movies.length !== moviesCount) {
        setSavedMovies(movies);
        setMoviesCount(movies.length);
      }
    } catch (err) {
      setError('Failed to fetch saved movies');
      console.error('Error fetching saved movies:', err);
    } finally {
      setIsLoading(false);
    }
  }, [moviesCount]);

  useEffect(() => {
    refreshSavedMovies();
  }, [refreshSavedMovies]);

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, refreshSavedMovies, isLoading, error }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = (): SavedMoviesContextType => {
  const context = useContext(SavedMoviesContext);
  if (context === undefined) {
    throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
  }
  return context;
};
