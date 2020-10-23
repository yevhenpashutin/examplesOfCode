import * as React from "react";
import { useContext, useState } from "react";
import { ActivityIndicator, View, TextInput, Dimensions, TouchableOpacity, Text, Image, Linking } from "react-native";
import { PluginContext } from "../Config/PluginData";
import ASSETS from "../Config/AssetsForMobile";
const { height, width } = Dimensions.get("window");

export default function LoginForm(props) {
  const { onLogin, isLoading } = props;
  const {
    customText,
    usernameInputStyle,
    passwordInputStyle,
    forgottenStyle,
    loginButtonStyle
  } = useContext(PluginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  const handleValidation = () => {
    username.length === 0 && setUsernameError("Invalid Username");
    password.length === 0 && setPasswordError("Invalid Password");
    username.length !== 0 && password.length !== 0 && onLogin(username, password);
  };

  return (
    <View style={styles.loginContainer}>
      <View>
        <TextInput
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setUsernameError(null);
          }}
          style={[usernameInputStyle, styles.textInput]}
          placeholderTextColor={"#ffffff"}
          placeholder={customText.usernamePlaceholder}
        />
        {usernameError && <Image resizemode="stretch" source={{ uri: ASSETS.errorIcon }} style={styles.errorIcon} />}
      </View>

      <View>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(null);
          }}
          style={[passwordInputStyle, styles.textInput]}
          placeholderTextColor={"#ffffff"}
          placeholder={customText.passwordPlaceholder}
        />
        {passwordError && (
          <Image
            resizemode="contain"
            source={{ uri: ASSETS.errorIcon }}
            style={{ top: 14, width: 20, height: 20, position: "absolute", right: 0 }}
          />
        )}
      </View>

      <TouchableOpacity onPress={() => Linking.openURL("http://televisionacademy.com/forgot")}>
        <Text style={[forgottenStyle ,styles.forgotten]}>Forgotten your Username or Password?</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={() => handleValidation()}>
          <Text style={[loginButtonStyle, styles.loginText]}>{customText.loginLabel.toUpperCase()}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = {
  loginContainer: {
    flex: 1,
    width: (width / 375) * 250,
    height,
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    color: "#ffffff",
    height: 48,
  },
  errorIcon: {
    top: 14,
    width: 20,
    height: 20,
    position: "absolute",
    right: 0,
  },
  forgotten: {
    marginVertical: 20,
    color: "#ffffff",
    textAlign: "center",
    fontSize: 11,
  },
  loginButton: {
    backgroundColor: "#f2b204",
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
  },
  loginText: {
    textAlign: "center",
  },
};
