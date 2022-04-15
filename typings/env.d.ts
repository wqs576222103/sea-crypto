interface ImportMetaEnv {
  readonly VITE_CLIENT_PRIVATE_KEY: string;
  readonly VITE_CLIENT_PUBLIC_KEY: string;
  readonly VITE_SERVER_PUBLIC_KEY: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
