import { db } from "@/firebase/config";
import { PostDto } from "@/types/post";
import { Link } from "expo-router";
import { collection, getDocs, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

// https://www.slog.gg/post/14460

export default function Posts() {
  const [posts, setPosts] = useState<PostDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, "post"),
        orderBy("createDate", "desc")
      );

      // await onSnapshot : post 컬렉션의 데이터를 실시간으로 가져옴
      // snapShot : Firestore에서 가져온 데이터
      await onSnapshot(postsQuery, (snapShot) => {
        const postsData = snapShot.docs.map((doc) => {
          const { id, title, content, createDate } = doc.data();

          return {
            id: doc.id,
            postId: id,
            createDate: createDate as Timestamp,
            title: title,
            content: content,
          };
        });

        setPosts(postsData);
      });
    } catch (error) {
      console.log("오류 발생 : " + error);
      setError("오류 발생");
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  // 가드 클로즈 패턴
  if (!posts) {
    return (
      <View style={styles.postsContainer}>
        <Text style={styles.loadingText}>로딩중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        contentContainerStyle={styles.listWrap}
        renderItem={({ item }) => (
          // console.log("item : ", item),
          <View style={styles.postItem}>
            <Link
              style={{ flex: 1 }}
              href={{
                pathname: `/posts/[id]/post`, // [id] : 동적 라우팅
                params: {
                  id: item.id,
                  postId: item.postId,
                  title: item.title,
                  content: item.content,
                },
              }}
            >
              <View style={styles.postItemContent}>
                <View style={styles.postTextContainer}>
                  <Text style={styles.postId}>{item.postId}번 게시물</Text>
                  <Text style={styles.postTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                  <Text style={styles.postContent} numberOfLines={1} ellipsizeMode="tail">{item.content}</Text>
                </View>
              </View>
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    backgroundColor: "#76C1C3",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  listWrap: {
    width: WIDTH - 16,
    paddingTop: 70,
    paddingBottom: 16,
    paddingHorizontal: 6,
  },
  postItem: {
    flexDirection: "row",
    backgroundColor: "#E89E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
  },
  postItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postId: {
    fontSize: 14,
    color: '#000',
    marginRight: 10,
    minWidth: 30,
  },
  postTextContainer: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  postContent: {
    fontSize: 14,
    color: '#000',
  },
});