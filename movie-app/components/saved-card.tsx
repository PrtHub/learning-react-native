import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

const SavedCard = ({movie: {
  movie_id,
  title,
  poster_url
}}: SavedCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="w-[30%] relative">
      <Image
          source={{
            uri: poster_url
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text
          className="text-base font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedCard;
