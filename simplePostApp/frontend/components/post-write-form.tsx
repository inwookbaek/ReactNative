import { db } from "@/firebase/config";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const useKeyboardOffsetHook = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // 키보드가 나타났을 때
  const keyboardDidShowListener = (e: any) => {
    const { height } = e.endCoordinates;
    setKeyboardHeight(height);
    setKeyboardVisible(true);

    Animated.timing(keyboardOffset, {
      toValue: -height,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // 키보드가 사라졌을 때
  const keyboardDidHideListener = () => {
    setKeyboardHeight(0);
    setKeyboardVisible(false);

    Animated.timing(keyboardOffset, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShowListener
    );
    const keyboardHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHideListener
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return { keyboardHeight, keyboardVisible, keyboardOffset };
};

export default function PostWriteForm() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useFocusEffect : 화면이 포커스 될 때마다 실행
  useFocusEffect(
    useCallback(() => {
      setTitle("");
      setContent("");
    }, [])
  );

  const { keyboardHeight, keyboardVisible, keyboardOffset } =
    useKeyboardOffsetHook();

  const handleClose = () => {
    if (title || content) {
      Alert.alert("작성을 취소하시겠습니까?", "", [
        {
          text: "확인",
          onPress: () => router.navigate("/(tabs)/posts/page"),
        },
        {
          text: "취소",
          onPress: () => {},
          style: "cancel",
        },
      ]);
      return;
    }

    router.navigate("/(tabs)/posts/page");
  };

  const validateForm = useCallback(() => {
    if (title.trim().length == 0) {
      Alert.alert("제목을 입력해주세요.");
      return false;
    }

    if (content.trim().length == 0) {
      Alert.alert("내용을 입력해주세요.");
      return false;
    }

    return true;
  }, [title, content]);

  const onSubmit = useCallback(async () => {
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, "post"), {
        title: title,
        content: content,
        createDate: Timestamp.now(),
      });

      setTitle("");
      setContent("");
      setError(null);
      Alert.alert("게시물이 등록되었습니다.");
      router.navigate("/(tabs)/posts/page");
    } catch (error) {
      console.log("오류 발생 : " + error);
      Alert.alert("게시물 등록에 실패했습니다.");
      setError("오류 발생");
    }
  }, [title, content, validateForm]);

  const onTopicSelect = useCallback(() => {
    console.log("주제 선택");
  }, []);

  const onImageSelect = useCallback(() => {
    console.log("이미지 선택");
  }, []);

  const onLocationSelect = useCallback(() => {
    console.log("장소 선택");
  }, []);

  const onVoteSelect = useCallback(() => {
    console.log("투표 선택");
  }, []);

  const onTagSelect = useCallback(() => {
    console.log("태그 선택");
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.statusBar}></View>

      {/* 네비게이션 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeButton} onPress={onSubmit}>
          <Text style={styles.completeButtonText}>저장</Text>
        </TouchableOpacity>
      </View>

      {/* 주제 선택 영역 */}
      <TouchableOpacity style={styles.topicSelector} onPress={onTopicSelect}>
        <Text style={styles.topicText}>게시글의 주제를 선택해주세요.</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 제목 입력 */}
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력하세요."
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      {/* 내용 입력 (스크롤뷰 사용) */}
      <ScrollView style={styles.contentContainer}>
        <TextInput
          style={styles.contentInput}
          placeholder="이야기를 나눠보세요.
#맛집 #병원 #산책 ..."
          placeholderTextColor="#999"
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />
      </ScrollView>

      {/* 하단 툴바 */}
      <Animated.View
        style={[
          styles.toolbar,
          {
            transform: [{ translateY: keyboardOffset }],
          },
        ]}
      >
        <TouchableOpacity style={styles.toolbarButton} onPress={onImageSelect}>
          <Ionicons name="image-outline" size={24} color="white" />
          <Text style={styles.toolbarText}>사진</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={onLocationSelect}
        >
          <Ionicons name="location-outline" size={24} color="white" />
          <Text style={styles.toolbarText}>장소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={onVoteSelect}>
          <MaterialIcons name="how-to-vote" size={24} color="white" />
          <Text style={styles.toolbarText}>투표</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={onTagSelect}>
          <FontAwesome name="hashtag" size={24} color="white" />
          <Text style={styles.toolbarText}>태그</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    // marginBottom: 320,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    paddingBottom: 5,
  },
  time: {
    color: "white",
    fontWeight: "bold",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  networkText: {
    color: "white",
    marginRight: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  completeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
  },
  topicSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  topicText: {
    color: "white",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "white",
  },
  titleInput: {
    color: "white",
    fontSize: 18,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  contentInput: {
    color: "white",
    fontSize: 16,
    padding: 15,
    height: "100%",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "white",
    paddingBottom: 30,
  },
  toolbarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  toolbarText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
});
