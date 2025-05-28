import { View, type DimensionValue } from 'react-native'
import React from 'react'

interface SpacerProps {
    width?: DimensionValue;
    height?: DimensionValue;
}

const Spacer = ({width = "100%", height = 10}: SpacerProps) => {
  return (
    <View style={{width: width, height: height}}/>
  )
}

export default Spacer