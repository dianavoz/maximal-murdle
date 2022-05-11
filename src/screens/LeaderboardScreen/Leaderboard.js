import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

export default function Leaderboard({ leaderboardArr }) {
  const [selectedId, setSelectedId] = React.useState(null);
  console.log('leaderboardArr:', leaderboardArr);

  function handleNamePress(item) {
    console.log('item:', item.scores, Object.keys(item.scores.games));
    setSelectedId(item.id);
    Alert.alert(
      `${item.fullName}'s Murdle`,
      `Games played: ${item.scores.total} \nPoints/Game: ${
        item.scores.total / Object.keys(item.scores.games).length
      }`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        }
      ],
      {
        cancelable: true,
        onDismiss: () => setSelectedId(null)
      }
    );
  }

  const Item = ({ item, onPress, textColor, imageSource }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <View
        style={[
          styles.nameContainer,
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }
        ]}
      >
        <Image
          // source={{ uri: item.icon }}
          style={[styles.tinyIcon]}
        ></Image>
        <Text style={[styles.name, textColor]}>{item.fullName}</Text>
      </View>
      <View style={{ alignContent: 'center' }}>
        <Text style={[styles.total, textColor]}>{item.scores.total}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const color = item.id === selectedId ? '#bb0a1e' : '#D7DADC';

    return (
      <Item
        item={item}
        onPress={() => handleNamePress(item)}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={leaderboardArr}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    textAlign: 'centre',
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 2
  },
  name: {
    fontSize: 14,
    marginLeft: 10
  },
  total: {
    fontSize: 14,
    marginRight: 10
  },
  nameContainer: {
    flex: 1
  },
  tinyIcon: {
    width: 40,
    height: 40,
    borderRadius: 50
  }
});
