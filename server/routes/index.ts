import { env } from 'std-env'
import type { AppConfig } from '~/types/config'

export default eventHandler((event) => {
  const appConfig = useAppConfig(event) as AppConfig

  const analyticsCode = env.CF_PAGES_URL
    ? '\n\t<script defer data-domain="auth.web.id" src="https://stats.web.id/js/script.js"></script>'
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TOTP Generator - ${appConfig.title}</title>
    <meta name="description" content="${appConfig.description}"/>
    <meta name="author" content="${appConfig.author}" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Inter:400,700" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <script src="https://cdn.tailwindcss.com"></script>${analyticsCode}
</head>
<body class="bg-slate-50">
  <div class="min-h-screen p-6 sm:p-10 md:p-12">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <div class="flex justify-between items-end">
            <div class="flex justify-between items-start w-full p-8">
              <div>
                <h1 class="text-3xl font-bold text-white">TOTP Generator</h1>
                <p class="text-violet-100 mt-2">Generate secure time-based one-time passwords</p>
              </div>
            </div>
            <div class="flex space-x-4 text-white p-8 rounded-tr-lg">
              <a href="https://github.com/riipandi/authweb" target="_blank" rel="noopener" class="hover:text-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c-5.421 0-9.837 4.416-9.837 9.837 0 4.354 2.813 8.067 6.72 9.372.491.09.672-.214.672-.476 0-.235-.009-.857-.014-1.682-2.737.594-3.313-1.319-3.313-1.319-.447-1.135-1.092-1.439-1.092-1.439-.892-.611.068-.599.068-.599 1.105.078 1.686 1.135 1.686 1.135.982 1.684 2.576 1.198 3.204.917.099-.713.385-1.199.699-1.475-2.187-.248-4.487-1.093-4.487-4.865 0-1.075.384-1.954 1.014-2.644-.101-.248-.439-1.244.096-2.591 0 0 .827-.265 2.707 1.008.785-.218 1.627-.326 2.464-.33.836.004 1.679.112 2.464.33 1.879-1.273 2.706-1.008 2.706-1.008.536 1.347.198 2.343.097 2.591.63.69 1.013 1.569 1.013 2.644 0 3.78-2.303 4.614-4.497 4.855.396.342.75 1.015.75 2.046 0 1.478-.013 2.671-.013 3.034 0 .265.18.57.676.475 3.905-1.308 6.716-5.02 6.716-9.372 0-5.421-4.416-9.837-9.837-9.837z"/>
                </svg>
              </a>
              <a href="https://x.com/intent/follow?screen_name=riipandi" target="_blank" rel="noopener" class="hover:text-blue-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.556c-.884.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.896-.954-2.172-1.549-3.591-1.549-2.719 0-4.924 2.204-4.924 4.924 0 .386.043.762.127 1.124-4.092-.205-7.719-2.166-10.141-5.144-.424.727-.667 1.57-.667 2.472 0 1.705.869 3.212 2.188 4.096-.807-.026-1.567-.247-2.231-.616v.062c0 2.381 1.693 4.366 3.946 4.818-.412.111-.846.171-1.293.171-.316 0-.624-.031-.924-.088.625 1.953 2.437 3.377 4.584 3.416-1.68 1.316-3.801 2.101-6.102 2.101-.396 0-.786-.023-1.17-.068 2.176 1.395 4.755 2.209 7.527 2.209 9.03 0 13.974-7.483 13.974-13.974 0-.213-.005-.426-.014-.637.961-.695 1.794-1.562 2.453-2.549z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column - Input Parameters -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Configuration</h2>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                <input type="text" id="issuer"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="e.g., Company Name"
                  value="My App"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input type="text" id="label"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="e.g., john@example.com"
                  value="somebody@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                <div class="relative">
                  <input type="text" id="secret"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Enter your secret key"
                    value="JBSWY3DPEHPK3PXP"
                  />
                  <button id="generateSecret"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-600"
                    title="Generate Random Secret">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Algorithm</label>
                  <select id="algorithm"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                    <option value="SHA1">SHA1</option>
                    <option value="SHA256">SHA256</option>
                    <option value="SHA512">SHA512</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Digits</label>
                  <select id="digits"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                    <option value="6">6 digits</option>
                    <option value="8">8 digits</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Period (seconds)</label>
                <input type="number" id="period" value="30" min="10" max="300"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Right Column - Output & QR -->
            <div class="bg-gray-50 rounded-xl p-6 space-y-6">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <h3 class="text-lg font-semibold text-gray-800">Current Token</h3>
                  <span id="countdown" class="text-sm font-mono bg-violet-100 text-violet-600 px-2 py-1 rounded">30s</span>
                </div>
                <div class="relative">
                  <input type="text" id="totpToken" readonly value="000 000"
                    class="w-full px-4 py-3 text-2xl tracking-wider font-mono text-center border border-gray-200 rounded-lg bg-white"
                  />
                  <button id="copyToken"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-600"
                    title="Copy Token">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">QR Code</h3>
                <div id="qrcode" class="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div class="w-48 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    <img src="/qrcode?chl=otpauth://totp/Example:john@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example" alt="QR Code" class="w-48 h-48" />
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">TOTP URI</h3>
                <div class="relative">
                  <input type="text" id="totpUri" readonly
                    class="w-full pl-4 pr-9 py-2 text-sm font-mono border border-gray-200 rounded-lg bg-white"
                    value="otpauth://totp/Example:john@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example"
                  />
                  <button id="copyUri"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-600"
                    title="Copy URI">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6 sm:mt-8 space-y-4">
        <div class="text-sm text-gray-500">
          Made with ❤️ by ${appConfig.author}
        </div>
        <div class="text-sm text-gray-500">
          <a href="/privacy" class="hover:text-gray-700">Privacy Policy</a>
          <span class="mx-2">•</span>
          <a href="/terms" class="hover:text-gray-700">Terms of Service</a>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Sample data dan helper functions
    const sampleData = {
      secrets: [
        'HXDMVJECJJWSRB3H',
        'K3HV4UQJF4BXIU2N',
        'MFRGGZDFMZTWQ2LK'
      ],
      issuers: [
        'GitHub',
        'Google',
        'Microsoft'
      ],
      labels: [
        'admin@company.com',
        'security@org.com',
        'user@domain.com'
      ]
    };

    // Generate random secret
    function generateRandomSecret() {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
      let secret = '';
      for (let i = 0; i < 16; i++) {
        secret += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return secret;
    }

    // Update form dengan random sample
    function updateWithRandomSample() {
      const randomIndex = Math.floor(Math.random() * sampleData.secrets.length);
      document.getElementById('issuer').value = sampleData.issuers[randomIndex];
      document.getElementById('label').value = sampleData.labels[randomIndex];
      document.getElementById('secret').value = sampleData.secrets[randomIndex];
    }

    // Event listeners
    document.getElementById('generateSecret').addEventListener('click', () => {
      document.getElementById('secret').value = generateRandomSecret();
    });

    // Countdown timer
    function updateCountdown() {
      const period = parseInt(document.getElementById('period').value) || 30;
      const remaining = period - Math.floor(Date.now() / 1000) % period;
      document.getElementById('countdown').textContent = remaining + 's';

      // Update progress bar
      const percent = (remaining / period) * 100;
      document.getElementById('countdown').style.background =
        \`linear-gradient(to right, rgb(124 58 237 / 0.1) \${percent}%, rgb(124 58 237 / 0.05) \${percent}%)\`;
    }

    // Copy functions dengan feedback visual
    function copyWithFeedback(elementId, buttonId) {
      const element = document.getElementById(elementId);
      const button = document.getElementById(buttonId);

      navigator.clipboard.writeText(element.value).then(() => {
        const originalColor = button.style.color;
        button.style.color = '#10B981'; // Success color
        setTimeout(() => {
          button.style.color = originalColor;
        }, 1000);
      });
    }

    document.getElementById('copyToken').addEventListener('click', () => {
      copyWithFeedback('totpToken', 'copyToken');
    });

    document.getElementById('copyUri').addEventListener('click', () => {
      copyWithFeedback('totpUri', 'copyUri');
    });

    // Initialize
    updateWithRandomSample();
    setInterval(updateCountdown, 1000);
    updateCountdown();
  </script>
</body>
</html>`
})
