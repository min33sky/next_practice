import axios from 'axios';

// ? baseURL을 미리 지정하여 api 호출 시 생략 가능하다.
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
