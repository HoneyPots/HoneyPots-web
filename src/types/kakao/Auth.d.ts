declare namespace Kakao.Auth {
  // eslint-disable-next-line import/prefer-default-export
  export function authorize(settings: KakaoAuthorizeSetting): void;
}

interface KakaoAuthorizeSetting {
  redirectUri: string;

  state?: string;

  scope?: string;

  prompts?: string;

  nonce?: string;

  throughTalk?: boolean;
}
