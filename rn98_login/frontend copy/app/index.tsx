import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [isIdHovered, setIsIdHovered] = useState(false);
  const [isPwHovered, setIsPwHovered] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);

  const handleLoginPress = () => {
    console.log('Login button pressed');
  };

  const handleFindIdPress = () => {
    console.log('Find ID button pressed');
  };

  const handleFindPasswordPress = () => {
    console.log('Find Password button pressed');
  };

  const handleRegisterPress = () => {
    console.log('Register button pressed');
  };

  const handleLogoutPress = () => {
    console.log('Logout button pressed');
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable style={[styles.button]} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <View style={styles.text}>
          {/* onHoverIn/Out은 Desktop에서만 작동 */}
          <Pressable
            onPress={handleFindIdPress}
            onHoverIn={() => setIsIdHovered(true)}
            onHoverOut={() => setIsIdHovered(false)}>
            <Text style={[styles.link, isIdHovered && styles.linkHover]}>아이디찾기</Text>
          </Pressable>
          <Text> / </Text>
          <Pressable 
            onPress={handleFindPasswordPress}
            onHoverIn={() => setIsPwHovered(true)}
            onHoverOut={() => setIsPwHovered(false)}
          >
            <Text style={[styles.link, isPwHovered && styles.linkHover]}>비밀번호찾기</Text>
          </Pressable>
          <Text> / </Text>
          <Pressable 
            onPress={handleRegisterPress}
            onHoverIn={() => setIsRegisterHovered(true)}
            onHoverOut={() => setIsRegisterHovered(false)}
          >
            <Text style={[styles.link, isRegisterHovered && styles.linkHover]}>회원가입</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable style={styles.button} onPress={handleLogoutPress}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "mediumseagreen",
    borderRadius: 5,
    minWidth: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  link: {
    color: "#007AFF",
    padding: 5,
    borderRadius: 4,
  },
  linkHover: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
});