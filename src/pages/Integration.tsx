import React, { useState } from 'react';
import { 
  Copy, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  ExternalLink,
  Terminal,
  AlertCircle,
  ChevronDown,
  Globe,
  Key,
  Lock,
  Webhook,
  Code,
  History,
  Search,
  Filter,
  ArrowRight,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKey {
  type: 'public' | 'secret';
  value: string;
  isActive: boolean;
}

interface WebhookLog {
  id: string;
  timestamp: string;
  status: 'success' | 'error';
  event: string;
  url: string;
  responseCode: number;
}

const Integration: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { type: 'public', value: 'pk_test_51ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', isActive: true },
    { type: 'secret', value: 'sk_test_51ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', isActive: true },
  ]);

  const [webhookUrl, setWebhookUrl] = useState('https://api.example.com/webhooks');
  const [webhookSecret, setWebhookSecret] = useState('whsec_abcdefghijklmnopqrstuvwxyz0123456789');
  const [selectedEvents, setSelectedEvents] = useState([
    'payment.success',
    'payment.failed',
    'refund.created'
  ]);
  const [activeTab, setActiveTab] = useState('curl');
  const [showCopied, setShowCopied] = useState<string | null>(null);

  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([
    {
      id: '1',
      timestamp: '2024-03-20 14:30:00',
      status: 'success',
      event: 'payment.success',
      url: 'https://api.example.com/webhooks',
      responseCode: 200
    },
    {
      id: '2',
      timestamp: '2024-03-20 14:15:00',
      status: 'error',
      event: 'payment.failed',
      url: 'https://api.example.com/webhooks',
      responseCode: 500
    }
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  const handleRegenerateKey = (type: 'public' | 'secret') => {
    console.log(`Regenerating ${type} key`);
  };

  const handleTestWebhook = () => {
    console.log('Testing webhook');
  };

  const codeExamples = {
    curl: `curl https://api.trapay.com/v1/payments \\
  -H "Authorization: Bearer ${apiKeys.find(k => k.type === 'secret')?.value}" \\
  -d amount=1000 \\
  -d currency=usd`,
    node: `const trapay = require('trapay');
const client = new trapay('${apiKeys.find(k => k.type === 'secret')?.value}');

const payment = await client.payments.create({
  amount: 1000,
  currency: 'usd'
});`,
    python: `import trapay

client = trapay.Client('${apiKeys.find(k => k.type === 'secret')?.value}')

payment = client.payments.create(
    amount=1000,
    currency='usd'
)`
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Integration</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your API keys, webhooks, and view documentation</p>
        </div>
        <a
          href="https://docs.trapay.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          <Code className="h-4 w-4 mr-2" />
          View Documentation
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* API Keys Section */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 md:px-6 py-4">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-6">
              {apiKeys.map((key) => (
                <motion.div
                  key={key.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group"
                >
                  <div className="border rounded-lg p-4 group-hover:border-primary transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {key.type} Key
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          key.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {key.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCopy(key.value, key.type)}
                          className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          {showCopied === key.type ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRegenerateKey(key.type)}
                          className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm break-all">
                      <span className="text-gray-600">{key.value}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Code Examples Section */}
          <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900">Code Examples</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['curl', 'node', 'python'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-white text-sm">
                      <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
                    </pre>
                  </div>
                  <button
                    onClick={() => handleCopy(codeExamples[activeTab as keyof typeof codeExamples], `code-${activeTab}`)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {showCopied === `code-${activeTab}` ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-white" />
                    )}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Webhook Settings Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 md:px-6 py-4">
              <div className="flex items-center space-x-2">
                <Webhook className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Webhook Settings</h2>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-6">
              <div>
                <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm"
                    placeholder="https://your-domain.com/webhooks"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="webhook-secret" className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook Secret
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="webhook-secret"
                    value={webhookSecret}
                    onChange={(e) => setWebhookSecret(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary pr-10 text-sm"
                  />
                  <button
                    onClick={() => handleCopy(webhookSecret, 'webhook-secret')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showCopied === 'webhook-secret' ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook Events
                </label>
                <div className="space-y-2">
                  {['payment.success', 'payment.failed', 'refund.created', 'payout.created'].map((event) => (
                    <label key={event} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEvents([...selectedEvents, event]);
                          } else {
                            setSelectedEvents(selectedEvents.filter(e => e !== event));
                          }
                        }}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors"
                      />
                      <span className="ml-2 text-sm text-gray-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleTestWebhook}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                Test webhook
              </button>
            </div>
          </div>

          {/* Recent Webhook Deliveries */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 md:px-6 py-4">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Deliveries</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {webhookLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{log.event}</span>
                    {log.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{log.timestamp}</div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.responseCode}
                    </span>
                    <span className="text-xs text-gray-500 truncate">{log.url}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;