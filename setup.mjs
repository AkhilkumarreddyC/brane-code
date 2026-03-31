import { select, input } from '@inquirer/prompts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.branecode.env');

async function fetchModels(apiUrl, apiKey, provider) {
  try {
    const headers = { 'Authorization': `Bearer ${apiKey}` };
    if (provider === 'OpenRouter') headers['HTTP-Referer'] = 'https://github.com/UditAkhourii/brane-code';
    
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    
    const data = await response.json();
    return data.data.map(m => m.id);
  } catch (err) {
    console.error(`\nFailed to fetch models: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Welcome to Brane Code Setup 🚀\n');
  
  const provider = await select({
    message: 'Which API Provider would you like to use?',
    choices: [
      { name: 'OpenRouter (Recommended, supports Anthropic, OpenAI, etc)', value: 'OpenRouter' },
      { name: 'OpenAI (Direct interface)', value: 'OpenAI' },
      { name: 'Anthropic (Original)', value: 'Anthropic' }
    ]
  });

  const apiKey = await input({
    message: `Enter your ${provider} API Key:`,
    validate: value => value.length > 10 ? true : 'API Key must be valid'
  });

  let baseUrl = '';
  let modelsUrl = '';
  let proxyMode = 'none';

  if (provider === 'OpenRouter') {
    baseUrl = 'https://openrouter.ai/api/v1';
    modelsUrl = 'https://openrouter.ai/api/v1/models';
  } else if (provider === 'OpenAI') {
    baseUrl = 'https://api.openai.com/v1';
    modelsUrl = 'https://api.openai.com/v1/models';
    proxyMode = 'openai-proxy';
    console.log('\nNote: Brane Code uses Anthropic SDK formats natively. For OpenAI direct integration, Brane Code will use an internal translator layer or direct compatibility flags.\n');
  } else {
    modelsUrl = 'https://api.anthropic.com/v1/models';
  }

  let selectedModel = '';
  if (provider !== 'Anthropic') {
    console.log(`\nFetching available models from ${provider}...`);
    const models = await fetchModels(modelsUrl, apiKey, provider);
    
    if (models && models.length > 0) {
      selectedModel = await select({
        message: 'Select the default model you want to use:',
        choices: models.map(m => ({ name: m, value: m })).slice(0, 100) // Display top 100 for safety
      });
    } else {
      selectedModel = await input({
        message: 'Could not automatically fetch models. Please type your desired model string (e.g. gpt-4o, anthropic/claude-3-5-sonnet):',
      });
    }
  } else {
    selectedModel = 'claude-3-7-sonnet-20250219'; // Default anthropic model
  }

  const envContent = `PROVIDER=${provider}
API_KEY=${apiKey}
BASE_URL=${baseUrl}
DEFAULT_MODEL=${selectedModel}
PROXY_MODE=${proxyMode}
`;

  fs.writeFileSync(CONFIG_PATH, envContent);
  console.log(`\n✅ Setup complete! Configuration saved to ${CONFIG_PATH}`);
  console.log(`\nYou can now run 'brane' to start coding!`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
