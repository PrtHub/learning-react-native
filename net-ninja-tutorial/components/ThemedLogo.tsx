import React, { useMemo } from 'react';
import { Image, ImageStyle, StyleSheet, useColorScheme, View, ViewProps } from 'react-native';

interface ThemedLogoProps extends Omit<ViewProps, 'style'> {
  size?: number;
  style?: ImageStyle;
  rounded?: boolean;
}


const IMAGES = {
  light: {
    uri: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    alt: 'Mountain landscape in daylight',
    author: 'eberhard grossgasteiger',
  },
  dark: {
    uri: 'https://images.pexels.com/photos/1314543/pexels-photo-1314543.jpeg',
    alt: 'Night sky with stars',
    author: 'Eberhard Grossgasteiger',
  },
};

const ThemedLogo: React.FC<ThemedLogoProps> = ({ 
  size = 100, 
  style, 
  rounded = false,
  ...props 
}) => {
  const colorScheme = useColorScheme();

  const { uri, alt } = useMemo(() => (
    colorScheme === 'dark' ? IMAGES.dark : IMAGES.light
  ), [colorScheme]);

  const dynamicStyles = useMemo(() => ({
    width: size,
    height: size,
    borderRadius: rounded ? size / 2 : 0,
  }), [size, rounded]);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri }}
        style={[styles.logo, dynamicStyles]}
        resizeMode="cover"
        accessibilityLabel={alt}
        {...props}
      />
    </View>
  );
};

export default ThemedLogo;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  logo: {
    // Base styles that don't change
  },
});
