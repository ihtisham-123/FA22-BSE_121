import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import fetchdata from '@/hooks/fetchdata'; // Custom hook

export default function HomeScreen() {
  const [expandedSurah, setExpandedSurah] = useState(null);

  // Fetch data from the API or local storage
  const { data, loading, error } = fetchdata({ url: 'https://api.alquran.cloud/v1/quran/en.asad' });

  // Display a loading screen
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Display an error screen if there's an error
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // Function to toggle the visibility of Surah content
  const toggleSurah = (number) => {
    setExpandedSurah(expandedSurah === number ? null : number);
  };

  // Function to render each Surah item and its verses
  const renderSurahItem = ({ item }) => (
    <View style={styles.surahCard}>
      <TouchableOpacity onPress={() => toggleSurah(item.number)}>
        <View style={styles.surahLeft}>
          <View style={styles.surahNumberContainer}>
            <Text style={styles.surahNumber}>{item.number}</Text>
          </View>
          <View>
            <Text style={styles.surahName}>{item.englishName}</Text>
            <Text style={styles.surahDetails}>{item.revelationType} - {item.numberOfAyahs} VERSES</Text>
          </View>
        </View>
        <Text style={styles.arabicName}>{item.name}</Text>
      </TouchableOpacity>

      {/* Show verses if the surah is expanded */}
      {expandedSurah === item.number && (
        <View style={styles.versesContainer}>
          {item.ayahs.map(ayah => (
            <Text key={ayah.number} style={styles.ayahText}>
              {ayah.numberInSurah}. {ayah.text}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.lastReadContainer}>
          <Image source={require('@/assets/quran-icon.png')} style={styles.quranImage} />
          <View>
            <Text style={styles.lastReadTitle}>Last Read</Text>
            <Text style={styles.lastReadSurah}>Al-Fatihah</Text>
            <Text style={styles.lastReadAyah}>Ayah No: 1</Text>
          </View>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {["Surah", "Para", "Page", "Hijb"].map(category => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Surah List */}
      <FlatList
        data={data?.data?.surahs || []} // Using the 'surahs' array from the fetched data
        renderItem={renderSurahItem}
        keyExtractor={item => item.number.toString()}
        contentContainerStyle={styles.surahList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Header Section
  header: {
    backgroundColor: '#6c63ff',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  lastReadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quranImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  lastReadTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  lastReadSurah: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  lastReadAyah: {
    color: '#fff',
    fontSize: 14,
  },
  // Categories
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  categoryText: {
    color: '#333',
    fontWeight: 'bold',
  },
  // Surah List
  surahCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  surahLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surahNumberContainer: {
    backgroundColor: '#6c63ff',
    borderRadius: 25,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  surahNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  surahName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  surahDetails: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  arabicName: {
    fontSize: 20,
    color: '#6c63ff',
  },
  versesContainer: {
    marginTop: 10,
  },
  ayahText: {
    fontSize: 14,
    marginBottom: 5,
  },
  surahList: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});
