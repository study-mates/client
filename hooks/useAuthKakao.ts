import config from '@/config';
import { getLoginUser } from '@/services';
import { TokenResponse } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

function useAuthKakao() {
  const [authURL, setAuthURL] = useState('');
  const url = `${config.KAKAO_AUTH_URL}?response_type=code&client_id=${config.KAKAO_API_KEY}&redirect_uri=${config.REDIRECT_URI}`;

  /**
   * @deprecated
   */
  const login = useCallback(async (authCode: string | string[]) => {
    try {
      const { data } = await axios<TokenResponse>({
        method: 'post',
        url: config.KAKAO_TOKEN_URL,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          grant_type: 'authorization_code',
          client_id: config.KAKAO_API_KEY,
          code: authCode,
        },
      });
      return await getLoginUser(data.access_token);
    } catch (error) {
      alert('로그인 실패');
      throw new Error('로그인 실패');
    }
  }, []);

  useEffect(() => {
    setAuthURL(url);
  }, [url]);

  return { authURL };
}

export default useAuthKakao;
