import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  ImageBackground,
  View,
  ActivityIndicator,
  StatusBar
} from "react-native"
import getImageForWeather from '../../utils/getImageForWeather'
import { SearchInput } from './searchInput'
import { fetchLocationId, fetchWeather } from "../../utils/api"

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34495E',
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    height: null,
    resizeMode: 'cover',
    width: null,
  },
  imageContainer: {
    flex: 1,
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textStyle: {
    color: 'white',
    fontFamily:
        Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    textAlign: 'center',
  },
})

export class Weather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    }
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco')
  }

  handleUpdateLocation = async city => {
    if (!city) return

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city)
        const { location, weather, temperature } = await fetchWeather(
          locationId,
        )

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        })
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        })
      }
    })
  };

  render() {
    const { loading, error, location, weather, temperature } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
      >
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator
              animating={loading}
              color="white"
              size="large"
            />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                          Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                    <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}
