import type { AppConfig } from '~/types/config'

export default eventHandler((event) => {
  const appConfig = useAppConfig(event) as AppConfig
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TOTP Generator - ${appConfig.title}</title>
    <meta name="description" content="Advanced TOTP Generator"/>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Inter:400,700" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50">
  <div class="min-h-screen p-6 sm:p-10 md:p-12">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8">
          <h1 class="text-3xl font-bold text-white">TOTP Generator</h1>
          <p class="text-violet-100 mt-2">Generate secure time-based one-time passwords</p>
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
      <div class="text-center mt-6 sm:mt-8 text-gray-500 text-sm">
        Made with ❤️ by Aris Ripandi
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
