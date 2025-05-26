import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

function Screen1() {
  const { height, width } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: height / 2 }}>
        <FlatList
          data={[1, 1, 1, 1, 1]} // The data array seems to have 5 items in the third image, whereas it has 4 items in the second image. I'm going with 5 items as it's the most recent state
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: width,
                  height: height / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  disabled={true} // In the third image, disabled is set to true
                  style={{
                    width: '90%',
                    height: '90%',
                    backgroundColor: 'green',
                    borderRadius: 10,
                  }}
                ></TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default Screen1;