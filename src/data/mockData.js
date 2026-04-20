export const user = {
  name: 'Alex Rivera',
  email: 'alex.rivera@email.com',
  avatar: 'AR',
  plan: 'Premium',
  balance: 48_294.52,
  savingsBalance: 12_800.00,
  accountNumber: '20251069',
  routing: '021000021',
  tag: '$alexrivera',
  currencies: [
    { code: 'USD', symbol: '$',  balance: 48_294.52, flag: '🇺🇸' },
    { code: 'EUR', symbol: '€',  balance: 12_430.00, flag: '🇪🇺' },
    { code: 'CAD', symbol: 'C$', balance: 5_200.00,  flag: '🇨🇦' },
    { code: 'GBP', symbol: '£',  balance: 8_950.75,  flag: '🇬🇧' },
    { code: 'AUD', symbol: 'A$', balance: 3_100.00,  flag: '🇦🇺' },
  ],
};

export const transactions = [
  { id: 't1',  type: 'credit', name: 'Freelance — Stripe Inc.',  avatar: 'SI', amount: 8500.00, date: '2025-04-15', category: 'Income',      icon: '💼' },
  { id: 't2',  type: 'debit',  name: 'Figma Pro',                avatar: 'FG', amount: 45.00,   date: '2025-04-14', category: 'Software',    icon: '🎨' },
  { id: 't3',  type: 'debit',  name: 'Sarah Chen',               avatar: 'SC', amount: 320.00,  date: '2025-04-13', category: 'Transfer',    icon: '👤' },
  { id: 't4',  type: 'credit', name: 'Marcus Webb',              avatar: 'MW', amount: 250.00,  date: '2025-04-12', category: 'Transfer',    icon: '👤' },
  { id: 't5',  type: 'debit',  name: 'AWS',                      avatar: 'AW', amount: 184.37,  date: '2025-04-11', category: 'Cloud',       icon: '☁️' },
  { id: 't6',  type: 'debit',  name: 'Vercel',                   avatar: 'VC', amount: 20.00,   date: '2025-04-10', category: 'Software',    icon: '▲' },
  { id: 't7',  type: 'credit', name: 'Client — Acme Corp',       avatar: 'AC', amount: 5200.00, date: '2025-04-09', category: 'Income',      icon: '💼' },
  { id: 't8',  type: 'debit',  name: 'Delta Airlines',           avatar: 'DL', amount: 612.00,  date: '2025-04-08', category: 'Travel',      icon: '✈️' },
  { id: 't9',  type: 'debit',  name: 'Notion',                   avatar: 'NT', amount: 16.00,   date: '2025-04-07', category: 'Software',    icon: '📝' },
  { id: 't10', type: 'debit',  name: 'OpenAI API',               avatar: 'OA', amount: 93.50,   date: '2025-04-06', category: 'Cloud',       icon: '🤖' },
  { id: 't11', type: 'credit', name: 'Consulting — Design Co.',  avatar: 'DC', amount: 3000.00, date: '2025-04-05', category: 'Income',      icon: '💼' },
  { id: 't12', type: 'debit',  name: 'Jordan Kim',               avatar: 'JK', amount: 150.00,  date: '2025-04-04', category: 'Transfer',    icon: '👤' },
];

export const contacts = [
  { id: 'c1', name: 'Sarah Chen',   avatar: 'SC', tag: '$sarahchen',   color: '#8B5CF6' },
  { id: 'c2', name: 'Marcus Webb',  avatar: 'MW', tag: '$marcuswebb',  color: '#EC4899' },
  { id: 'c3', name: 'Jordan Kim',   avatar: 'JK', tag: '$jordankim',   color: '#F59E0B' },
  { id: 'c4', name: 'Priya Mehta',  avatar: 'PM', tag: '$priyamehta',  color: '#10B981' },
  { id: 'c5', name: 'Diego Reyes',  avatar: 'DR', tag: '$diegoreyes',  color: '#3B82F6' },
  { id: 'c6', name: 'Yuna Park',    avatar: 'YP', tag: '$yunapark',    color: '#EF4444' },
];

export const card = {
  number:   '4521 8834 2291 6647',
  masked:   '4521 •••• •••• 6647',
  holder:   'ALEX RIVERA',
  expiry:   '09/28',
  cvv:      '372',
  brand:    'VISA',
  status:   'active',
  type:     'Virtual USD',
  spent:    1479.86,
  limit:    5000.00,
  transactions: [
    { id: 'c1', merchant: 'Amazon',         amount: 129.99, date: '2025-04-14', icon: '📦' },
    { id: 'c2', merchant: 'Apple One',      amount: 21.95,  date: '2025-04-12', icon: '🍎' },
    { id: 'c3', merchant: 'Google Ads',     amount: 200.00, date: '2025-04-10', icon: '📢' },
    { id: 'c4', merchant: 'Airbnb',         amount: 890.00, date: '2025-04-07', icon: '🏡' },
    { id: 'c5', merchant: 'Uber',           amount: 38.42,  date: '2025-04-05', icon: '🚗' },
    { id: 'c6', merchant: 'Spotify',        amount: 9.99,   date: '2025-04-01', icon: '🎵' },
  ],
};

export const spendingByMonth = [
  { month: 'Nov', amount: 4200 },
  { month: 'Dec', amount: 6100 },
  { month: 'Jan', amount: 3800 },
  { month: 'Feb', amount: 5200 },
  { month: 'Mar', amount: 4700 },
  { month: 'Apr', amount: 1480 },
];
