import type { NextConfig } from "next";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import i18nConfig from './next-i18next.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  i18n: i18nConfig.i18n,
};

export default nextConfig;