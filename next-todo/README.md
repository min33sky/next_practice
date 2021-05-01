# 투두 앱

## Next에 Styled Components의 SSR 적용하기

> Next에서 Styled Components를 사용 시 **SSR**을 적용하기 위한 방법

- [참고 링크](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)

### Required

- babel-plugin-styled-components
- babel-plugin-inline-react-svg (`svg` 사용 시)

### Code

> .babelrc에 다음 코드를 붙여넣기

```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      { "ssr": true, "fileName": true, "displayName": true }
    ],
    "inline-react-svg" // svg 사용 시
  ]
}
```
