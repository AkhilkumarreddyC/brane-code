#!/usr/bin/env bun
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.branecode.env');

if (!fs.existsSync(CONFIG_PATH)) {
  console.log("Welcome to Brane Code! Please run 'npm run setup' or 'node setup.mjs' first to configure your API provider.");
  process.exit(1);
}

const envContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
const envLines = envContent.split('\n');
const config = {};
envLines.forEach(line => {
  const [key, ...values] = line.split('=');
  if (key) config[key.trim()] = values.join('=').trim();
});

const env = { ...process.env };
env.ANTHROPIC_API_KEY = config.API_KEY || '';
env.ANTHROPIC_BASE_URL = config.BASE_URL || '';
env.ANTHROPIC_MODEL = config.DEFAULT_MODEL || '';

// Force the CLI to skip Anthropic 1P Auth
env.CLAUDE_CODE_SKIP_LOGIN = 'true';
env.DISABLE_LOGIN_COMMAND = 'true';

if (config.PROVIDER !== 'Anthropic') {
  console.log(`\x1b[36m[Brane Code] Initialized with ${config.PROVIDER} (Model: ${config.DEFAULT_MODEL})\x1b[0m`);
}

// If OpenAI is selected, since Anthropic SDK doesn't natively speak OpenAI format without a proxy,
// we warn the User. OpenRouter natively proxies Anthropic SDK to OpenAI models!
if (config.PROXY_MODE === 'openai-proxy') {
  console.warn(`\x1b[33m[Brane Code] Note: Direct OpenAI proxy layer is experimental. OpenRouter is recommended for stable Anthropic Tool-Use translation.\x1b[0m`);
}

// Start the actual Brane Code entrypoint
const child = spawn('bun', ['run', path.join(__dirname, '../src/main.tsx'), ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: env
});

child.on('close', (code) => {
  process.exit(code);
});
