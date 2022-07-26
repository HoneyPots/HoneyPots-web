declare namespace Kakao {
  export function init(appKey: string): void;
  export function cleanup(): void;
  export function isInitialized(): boolean;
}
