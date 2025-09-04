import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { PostWithContentDto } from "@/types/post";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Feather, FontAwesome6, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

export default function Post() {

  const router = useRouter();

  // useLocalSearchParams : 동적 라우팅을 위한 파라미터
  // 받아온 파라미터를 문자열로 처리
  const { id } = useLocalSearchParams();
 
  const [post, setPost] = useState<PostWithContentDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPost = async () => {
    try {
      // firebase는 문서 참조 방식
      const postRef = doc(db, "post", id as string);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const post = postSnap.data() as PostWithContentDto;
        console.log("post ===> ", post);
        setPost(post);
      }
    } catch (error) {
      console.log("오류 발생 : " + error);
      setError("오류 발생");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // 가드 클로즈 패턴
  if (!post) {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.loadingText}>로딩중...</Text>
      </View>
    );
  }

  // return (
  // <View style={styles.postContainer}>
  //   <View style={styles.postInner}>
  //     <View style={styles.postHeader}>
  //       <Text style={styles.postTitle}>제목</Text>
  //       <Text style={styles.postTitleContent}>{post?.title}</Text>
  //     </View>
  //     <View style={styles.postBodyContainer}>
  //       <Text style={styles.postBody}>{post?.content}</Text>
  //     </View>
  //   </View>
  // </View>
  // );

  return (
    <View style={styles.postContainer}>
      <View style={styles.postInner}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderLeft}>
            <Pressable onPress={() => router.back()}>
              <Octicons name="chevron-left" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.postHeaderRight}>
            <Pressable onPress={() => console.log("bell")}>
              <Octicons name="bell" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => console.log("upload")}>
              <Feather name="upload" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => console.log("dots-vertical")}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.postContentContainer}>
          <View style={styles.contentHeader}>
            <View style={styles.profileImage}>
              <Pressable onPress={() => console.log("MyPage")}>
                <FontAwesome6 name="user-circle" size={30} color="black" />
              </Pressable>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileNickname}>닉네임</Text>
              <Text style={styles.profileDate}>2025년 7월 27일</Text>
            </View>
          </View>
          <View style={styles.contentBody}>
            <View style={styles.contentTitleWrap}>
              <Text style={styles.postTitle}>{post?.title}</Text>
            </View>
            <View style={styles.contentBodyWrap}>
              <Text style={styles.postTitleContent}>{post?.content}</Text>
            </View>
            <View style={styles.contentFooter}>
              <Pressable
                onPress={() => console.log("recommend")}
                style={styles.contentFooterItem}
              >
                <Feather name="thumbs-up" size={18} color="black" />
                <Text>추천</Text>
              </Pressable>
              <Pressable
                onPress={() => console.log("save")}
                style={styles.contentFooterItem}
              >
                <Feather name="save" size={18} color="black" />
                <Text>저장</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.postReplyContainer}>
        <View style={styles.postReplyInner}>
          <View>
            <Text style={{ fontWeight: "bold" }}>댓글0</Text>
          </View>
          <View style={styles.postReplyContent}>
            <Text>아직 댓글이 없어요.</Text>
            <Text>가장 먼저 댓글을 남겨보세요.</Text>
          </View>
        </View>
      </View>
      <View style={styles.postReplyInputContainer}>
        <View style={styles.postReplyInputInner}>
          <Text style={{ fontWeight: "bold" }}>댓글 입력창</Text>
        </View>
      </View>
    </View>
  );  
}

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E8681E",
  },
  postInner: {
    width: WIDTH - 15,
    marginTop: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#FFC421",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  postHeaderLeft: {},
  postHeaderRight: {
    flexDirection: "row",
    gap: 10,
  },
  postContentContainer: {
    padding: 10,
    flexGrow: 1,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    gap: 10,
  },  
  profileImage: {},
  profileInfo: {},
  profileNickname: {
    fontWeight: "bold",
  },
  profileDate: {
    fontSize: 13,
    color: "#666",
  },  
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  postTitleContent: {
    fontSize: 16,
    color: "#000",
  },
  postBodyContainer: {
    marginTop: 5,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },  
  contentBody: {
    flexGrow: 1, 
  },
  contentTitleWrap: {
    //flex: 1,
  },
  contentBodyWrap: {
    //flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  contentFooter: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentFooterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  postBody: {
    flex: 1,
    fontSize: 16,
  },
  postReplyContainer: {
    width: WIDTH - 15,
    backgroundColor: "#E89E1E",
    flex: 0.3,
    marginBottom: 10,
    borderRadius: 10,
  },
  postReplyInner: {
    padding: 10,
    flex: 1,
  },
  postReplyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postReplyInputContainer: {
    width: WIDTH - 15,
    backgroundColor: "#FF9A2E",
    flex: 0.1,
    marginBottom: 10,
    borderRadius: 10,
  },
  postReplyInputInner: {
    padding: 10,
  }, 
});