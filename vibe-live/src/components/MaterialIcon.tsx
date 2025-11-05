import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextProps } from 'react-native';

interface MaterialIconProps extends TextProps {
  name: string;
  size?: number;
  color?: string;
}

export default function MaterialIcon({ 
  name, 
  size = 24, 
  color = '#000', 
  ...props 
}: MaterialIconProps) {
  return (
    <MaterialCommunityIcons 
      name={name} 
      size={size} 
      color={color}
      {...props}
    />
  );
}
