import SavedCard from "@/components/saved-card";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useSavedMovies } from "@/context/SavedMoviesContext";
import { useEffect } from "react";

const Saved = () => {
  const { savedMovies, refreshSavedMovies, isLoading, error } = useSavedMovies();

   useEffect(() => {
    const loadMovies = () => {
     refreshSavedMovies();
    };
    loadMovies();
   }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="w-full absolute h-2/3 inset-0 z-0"
        resizeMode="cover"
      />
      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <SavedCard movie={item} />}
        keyExtractor={(item) => item.movie_id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 16,
        }}
        className="mt-2 px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex-row w-full items-center justify-center mt-20">
              <Image
                source={icons.logo}
                className="w-12 h-12 object-contain mx-auto"
              />
            </View>

            <View className="mt-10">
              <Text className="text-lg text-white font-bold mb-3">
                Your Collections
              </Text>
            </View>

            {isLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-5"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">Error: {error}</Text>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">No movies found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Saved;
