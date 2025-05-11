import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';

const WeatherApp = () => {
  const [city, setCity] = useState('Islamabad');
  const [weather, setWeather] = useState({
    temperature: '',
    condition: '',
    icon: '',
  });

  const fetchWeather = async (cityName) => {
    try {
      const apiKey = 'c1dac4d1cf73c18a33fcbe1d0b9479a9';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        alert('City not found! Try again.');
        return;
      }

      setWeather({
        temperature: data.main.temp.toFixed(0),
        condition: data.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });

      setCity(data.name);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>📶 WiFi | 🔋 80% | 📅 {new Date().toDateString()}</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Enter city name..."
        placeholderTextColor="gray"
        onChangeText={(text) => setCity(text)}
        onSubmitEditing={() => fetchWeather(city)}
      />
      
      <TouchableOpacity style={styles.searchButton} onPress={() => fetchWeather(city)}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      {/* City Name */}
      <Text style={styles.city}>{city}</Text>

      {/* Weather Icon */}
      {weather.icon ? <Image source={{ uri: weather.icon }} style={styles.weatherIcon} /> : null}

      {/* Temperature */}
      <Text style={styles.temperature}>{weather.temperature}°C</Text>

      {/* Weather Condition */}
      <Text style={styles.condition}>{weather.condition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B91C1C', // Reddish Background
  },
  statusBar: {
    position: 'absolute',
    top: 20,
    width: '100%',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#7F1D1D',
  },
  statusText: {
    color: 'lightgray',
    fontSize: 12,
  },
  searchInput: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginTop: 50,
    color: 'black',
  },
  searchButton: {
    backgroundColor: '#FACC15',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  searchText: {
    fontSize: 16,
    color: '#7F1D1D',
    fontWeight: 'bold',
  },
  city: {
    fontSize: 36,
    color: '#FACC15',
    fontWeight: 'bold',
    marginTop: 20,
  },
  weatherIcon: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  temperature: {
    fontSize: 50,
    color: '#EAB308',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 26,
    color: '#F97316',
    marginTop: 10,
  },
});

export default WeatherApp;
