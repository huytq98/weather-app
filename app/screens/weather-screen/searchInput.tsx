import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    borderRadius: 18,
    height: 40,
    marginHorizontal: 40,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    color: 'white',
    flex: 1
  },
});

export class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

    handleChangeText = text => {
      this.setState({ text })
    };

    handleSubmitEditing = () => {
      const { onSubmit } = this.props;
      const { text } = this.state;
      if (!text) return;
      onSubmit(text);
      this.setState({ text: '' })
    };

    render() {
      const { placeholder } = this.props;
      const { text } = this.state;
      return (
        <View style={styles.container}>
          <TextInput
            autoCorrect={false}
            value={text}
            placeholder={placeholder}
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
            style={styles.textInput}
            clearButtonMode='always'
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
          />
        </View>
      )
    }
}
