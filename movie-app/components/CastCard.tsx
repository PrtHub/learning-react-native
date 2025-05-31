import { View, Text, Image } from 'react-native';
import React from 'react';

interface CastCardProps {
  name: string;
  character: string;
  profilePath: string | null;
}

const CastCard = ({ name, character, profilePath }: CastCardProps) => (
  <View className="mr-4 items-center" style={{ width: 100 }}>
    <View className="rounded-full overflow-hidden mb-2">
      {profilePath ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w200${profilePath}` }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          resizeMode="cover"
        />
      ) : (
        <View className="bg-dark-200 items-center justify-center" style={{ width: 80, height: 80, borderRadius: 40 }}>
          <Text className="text-white text-2xl">👤</Text>
        </View>
      )}
    </View>
    <Text className="text-white text-xs font-bold text-center" numberOfLines={1}>
      {name}
    </Text>
    <Text className="text-light-200 text-xs text-center" numberOfLines={1}>
      {character}
    </Text>
  </View>
);

export default CastCard;
