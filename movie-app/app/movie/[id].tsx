import { icons } from "@/constants/icons";
import { useFetch } from "@/hooks/use-fetch";
import { fetchMovieCredits, fetchMovieDetails } from "@/services/api";
import { getSavedMovies, saveMovie } from "@/services/appwrite";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CastCard from "../../components/CastCard";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [director, setDirector] = useState<string | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);

  const { data: movie, loading } = useFetch(async () => {
    const [details, credits] = await Promise.all([
      fetchMovieDetails(id as string),
      fetchMovieCredits(id as string),
    ]);

    const directorInfo = credits.crew?.find(
      (member: any) => member.job === "Director"
    );
    setDirector(directorInfo?.name || null);
    setCast(credits.cast?.slice(0, 10) || []);

    return details;
  });

  const { data: savedMovies, loading: savedMovieLoading, refetch } = useFetch(() =>
    getSavedMovies(), 
  );

  const handleSavedMovie = async () => {
    try {
      await saveMovie(movie);
      refetch();
      Alert.alert("Success", "Movie saved to your collection");
    } catch (error: any) {
      if (error.message === "User not authenticated") {
        Alert.alert(
          "Sign in required",
          "Please sign in to save movies to your collection",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Sign In", onPress: () => router.push("/sign-in") },
          ]
        );
      } else {
        Alert.alert("Error", "Failed to save movie");
      }
      console.log("Error saving movie:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator
          size="large"
          color="#ffffff"
          className="mt-[230px]"
        />
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="relative h-[450px] w-full">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity className="absolute -bottom-7 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading || savedMovieLoading}
            onPress={handleSavedMovie}
            className="absolute -bottom-7 right-24 rounded-full size-14 bg-white flex items-center justify-center"
          >
            {savedMovies?.some((m) => m.movie_id === movie?.id) ? (
              <Ionicons name="bookmark" size={24} color="#AB8BFF" />
            ) : (
              <Image source={icons.save} className="size-6" />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-start mt-5 px-5 ">
          <Text className="text-white font-bold text-2xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}
            </Text>

            <Text className="text-light-200 text-sm ml-1">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g: any) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c: any) => c.name)
                .join(" • ") || "N/A"
            }
          />

          {director && <MovieInfo label="Director" value={director} />}

          {cast.length > 0 && (
            <View className="mt-8">
              <Text className="text-white font-bold text-xl mb-4">
                Top Cast
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={cast}
                keyExtractor={(item) => `cast-${item.id}`}
                renderItem={({ item }) => (
                  <CastCard
                    name={item.name}
                    character={item.character}
                    profilePath={item.profile_path}
                  />
                )}
                contentContainerStyle={{
                  paddingHorizontal: 5,
                  paddingRight: 20,
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
