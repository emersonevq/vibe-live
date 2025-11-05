import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const activeColor = '#16a34a';
  const inactiveColor = '#9ca3af';

  return (
    <View style={[styles.container, { paddingBottom: Platform.OS === 'ios' ? (insets?.bottom ?? 0) : 8 }]}> 
      {state.routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        const focused = state.index === index;
        const label =
          descriptor.options.tabBarLabel !== undefined
            ? descriptor.options.tabBarLabel
            : descriptor.options.title !== undefined
            ? descriptor.options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        // Try to call the provided tabBarIcon, if present
        const iconElement = (descriptor.options.tabBarIcon as any)
          ? (descriptor.options.tabBarIcon as any)({ focused, color: focused ? activeColor : inactiveColor, size: 22 })
          : null;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={descriptor.options.tabBarAccessibilityLabel}
            testID={descriptor.options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrap}>
              {iconElement ?? <MaterialCommunityIcons name={focused ? 'circle' : 'circle-outline'} size={18} color={focused ? activeColor : inactiveColor} />}
            </View>
            <Text style={[styles.label, { color: focused ? activeColor : inactiveColor }]} numberOfLines={1}>{String(label)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 64,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
