windows & android 개발 환경을 위한 포스팅 입니다.
[GITHUB에서 코드보기]()

# 목차
- [버전](#버전)
- [Start-with-typescript](#Start-with-typescript)
- [react-navigation 설치](#react-navigation-설치)
- [파일구조](#파일구조)
- [스택 네비게이션 구성하기](#스택네비게이션구성하기)
- [스택 네비게이션 사용하기](#)

# 버전
- react-native 0.62.2
- react-navigation 5

# Start with typescript
[참고링크](https://reactnative.dev/docs/typescript#getting-started-with-typescript)
터미널에서 다음 명령어를 실행해주세요
```
npx react-native init app --template react-native-template-typescript
// app 부분은 생성될 파일의 이름입니다. 임의로 수정하셔도 됩니다.
```
사람마다 다르겠지만 풀스택을 하는 저의 입장에서는 아래와 같은 파일 구조를 사용하기 때문에 따로 이름을 짓지 않고 그냥 app이라는 키워드를 사용합니다.
```
project
├ app
└ server
```
명령어가 정상적으로 작동했다면 아래와 같은 파일들이 설치 됩니다.
[image]
정상적으로 설치가 됬다면 **tsconfig.json** 파일의 **BaseUrl** 이라는 속성을 app 으로 바꿔 줍시다. (이 이름은 폴더 이름과 같아야 합니다)
```json
{
  "compilerOptions": {
    ...
    "baseUrl": "app",
    ...
  }
}
```

```yarn android```로 실행을 하면 아래와 같이 정상 작동합니다.
[image]


# react-navigation-설치
[참고링크](https://reactnavigation.org/docs/getting-started/)
아래 명령어로 react-navigation을 설치해 주세요.
```yarn add @react-navigation/native```
그 다음 아래 명령어를 실행해서 react-navigation에 사용에 필요한 라이브러리들을 다운받아 주세요.
```yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view```

그리고 **react-native-gesture-handler**라는 라이브러리를 활성화 하기 위해 app -> **index.js**에 아래 코드를 추가해 주세요.
```js
// app/index.js
import 'react-native-gesture-handler';
```

아래 사진 처럼 추가히면 됩니다


# 파일구조
네비게이션을 실행시켜보기 전에 파일구조를 먼저 잡아야 합니다. 여러가지 파일구조가 있지만 아래와 같은 파일구조를 추천 드립니다.
```
app
  ├ App.tsx // 최상위 Component 입니다.
  └ src
    ├ components등 기타 폴더
    └ screens // 모든 screen들을 담는 폴더 입니다.
      ├ index.tsx // 네비게이션을 다루는 파일 입니다.
      ├ HomeScreen // 스크린 예시 입니다. 바로 HomeScreen.tsx로 가는 것이 아닌 폴더로 만들고 파일을 분할하는 것을 추천드립니다.
      │ ├ index.tsx 
      │ └ // index.tsx 파일이 길어지지 않도록 코드를 분할 합시다. 예) Header.tsx, Drawer.tsx ...
      └ //기타 스크린들도 HomeScreen과 같은 형식으로 추가 해줍시다.
```
아래 사진과 같은 모습으로 폴더와 파일을 추가하시면 됩니다. HomeScreen에 Drawer.tsx는 예시용이여서 무시 하셔도 상관 없습니다.

[IMAGE]
# 스택 네비게이션 구성하기

이제 간단하게 스택 네비게이션을 구현해 보겠습니다. 일단 아래 명령어를 통해 stack-navigation을 설치해 주세요.
```yarn add @react-navigation/stack```

HomeScreen에 TestScreen을 스택 네비게이션으로 지정해 주는 코드를 작성해 보겠습니다.
일단 HomeScreen과 TestScreen의 index.tsx파일을 각각 수정해 주세요.

```ts
// app/src/screens/HomeScreen/index.tsx
import React from 'react'
import { View, Text } from 'react-native'

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Text>Home</Text>
        </View>
    )
}

export default HomeScreen
```

```ts
// app/src/screens/TestScreen/index.tsx
import React from 'react'
import { View, Text } from 'react-native'

const TestScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Text>Test</Text>
        </View>
    )
}

export default TestScreen
```

그리고 **screens/index.tsx** 파일을 수정하여 Stack Navigation을 구성해 주세요
```ts
// app/src/screens/index.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import TestScreen from './TestScreen';

const Stack = createStackNavigator()

const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home' // 초기 스크린 설정
            >
                <Stack.Screen name="Home" component={HomeScreen} /> //name 속성은 나중에 화면 이동을 할때 사용됩니다.
                <Stack.Screen name="Test" component={TestScreen} />
                // 스택 네비게이션을 추가하실때는 이 부분에다가 이어서 추가하시면 됩니다.
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer
```
마지막으로 **App.tsx** 파일에 모든 내용을 지우고 아래와 같이 수정해 주세요.
```ts
import React from 'react';
import AppContainer from './src/screens';

const App = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
```
이제 실행 시켜보면 HomeScreen이 정상적으로 뜰것입니다.

# 스택 네비게이션 사용하기
HomeScreen에서 TestScreen으로 이동하는 코드를 작성해 보겠습니다.
화면이동은 useNavigation이라는 hooks안에 있는 navigate라는 함수로 실행가능합니다.
```ts
// app/src/screens/HomeScreen/index.tsx
import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const { navigate } = useNavigation()


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Text>Home</Text>
            <Button
                onPress={() => navigate("Test")}
                title='Go to the TestScreen'
            />
        </View>
    )
}

export default HomeScreen
```
정상적으로 작동한다면 Test 스크린이 나타날 것입니다.

[소스코드]()