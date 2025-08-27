import { Stack } from "expo-router";

/*
  Expo Router의 헤더 뒤로가기 버튼 표시 여부는 headerBackVisible 옵션과 
  presentation 속성에 따라 결정된다. 

  presentation 속성이 없으면 기본값(card)이 적용된다. 이 경우 이전 화면이 있으면 
  자동으로 뒤로가기 버튼이 표시된다.

  presentation: 'modal'로 설정되어 있으면 iOS에서는 기본적으로 모달로 표시되며, 
  이 경우 뒤로가기 버튼 대신 아래로 내려서 닫는 제스처가 기본 동작이이다.

  모든 화면에 일관되게 뒤로가기 버튼을 표시하려면 headerBackVisible: true를 추가한다.
  이렇게 하면 모달에서도 뒤로가기 버튼이 항상 표시된다.

  presentation 속성은 화면 전환 방식을 제어하는 옵션입니다. 
  두 가지 주요 옵션의 차이점을 설명드리겠습니다:

  1. presentation: 'card' (기본값)

  동작 방식:
  일반적인 화면 스택 방식으로 전환
  iOS에서는 오른쪽에서 왼쪽으로 슬라이드하는 전환 효과
  Android에서는 기본 플랫폼 전환 효과 사용
  특징:
  이전 화면이 스택에 쌓임
  iOS에서 뒤로 스와이프 제스처 지원
  헤더에 뒤로가기 버튼 기본 표시

  2. presentation: 'modal'

  동작 방식:
  모달 형태로 화면이 열림
  iOS에서는 하단에서 위로 올라오는 애니메이션
  Android에서는 다이얼로그처럼 중앙에 표시
  특징:
  iOS에서는 아래로 스와이프하여 닫을 수 있음
  기본적으로 뒤로가기 버튼이 표시되지 않음
  headerBackVisible: true로 명시적으로 설정해야 뒤로가기 버튼이 표시됨

*/

export default function UsersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9C27B0',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
          name="create" 
          options={{ 
            title: "새 사용자 등록",
            presentation: 'modal', // 
            headerBackVisible: true 
          }} 
      />
      <Stack.Screen 
          name="detail/[email]" 
          options={{ 
            title: "사용자 상세",
            headerBackVisible: true // 모달에서도 뒤로가기 버튼 표시
          }} 
      />
      <Stack.Screen 
          name="edit/[email]" 
          options={{ 
            title: "사용자 수정",
            presentation: 'card', // card 기본값, 생략가능
          }} 
      />
    </Stack>
  );
}
