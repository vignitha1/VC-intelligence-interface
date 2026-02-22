import { Company } from '../types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'NeuralFlow AI',
    industry: 'Artificial Intelligence',
    location: 'San Francisco, CA',
    foundedYear: 2021,
    employees: 45,
    website: 'https://neuralflow.ai'
  },
  {
    id: '2',
    name: 'CloudScale Systems',
    industry: 'Cloud Infrastructure',
    location: 'Austin, TX',
    foundedYear: 2019,
    employees: 120,
    website: 'https://cloudscale.io'
  },
  {
    id: '3',
    name: 'MedTech Solutions',
    industry: 'Healthcare',
    location: 'Boston, MA',
    foundedYear: 2020,
    employees: 78,
    website: 'https://medtechsol.com'
  },
  {
    id: '4',
    name: 'FinGuard Security',
    industry: 'Cybersecurity',
    location: 'New York, NY',
    foundedYear: 2018,
    employees: 95,
    website: 'https://finguard.io'
  },
  {
    id: '5',
    name: 'GreenEnergy Labs',
    industry: 'CleanTech',
    location: 'Denver, CO',
    foundedYear: 2019,
    employees: 62,
    website: 'https://greenenergylabs.co'
  },
  {
    id: '6',
    name: 'DataPulse Analytics',
    industry: 'Data Analytics',
    location: 'Seattle, WA',
    foundedYear: 2020,
    employees: 34,
    website: 'https://datapulse.ai'
  },
  {
    id: '7',
    name: 'RoboticsX',
    industry: 'Robotics',
    location: 'Pittsburgh, PA',
    foundedYear: 2017,
    employees: 150,
    website: 'https://roboticsx.io'
  },
  {
    id: '8',
    name: 'EduVerse',
    industry: 'EdTech',
    location: 'Los Angeles, CA',
    foundedYear: 2021,
    employees: 28,
    website: 'https://eduverse.com'
  },
  {
    id: '9',
    name: 'QuantumLeap Computing',
    industry: 'Quantum Computing',
    location: 'Boulder, CO',
    foundedYear: 2018,
    employees: 55,
    website: 'https://quantumleap.io'
  },
  {
    id: '10',
    name: 'BioSynth Labs',
    industry: 'Biotechnology',
    location: 'San Diego, CA',
    foundedYear: 2019,
    employees: 89,
    website: 'https://biosynthlabs.com'
  },
  {
    id: '11',
    name: 'AutoDrive Technologies',
    industry: 'Autonomous Vehicles',
    location: 'Detroit, MI',
    foundedYear: 2020,
    employees: 200,
    website: 'https://autodrive.tech'
  },
  {
    id: '12',
    name: 'ChainBlock Systems',
    industry: 'Blockchain',
    location: 'Miami, FL',
    foundedYear: 2021,
    employees: 42,
    website: 'https://chainblock.io'
  },
  {
    id: '13',
    name: 'SpaceHorizon',
    industry: 'Aerospace',
    location: 'Huntsville, AL',
    foundedYear: 2017,
    employees: 180,
    website: 'https://spacehorizon.com'
  },
  {
    id: '14',
    name: 'AgriTech Solutions',
    industry: 'AgTech',
    location: 'Des Moines, IA',
    foundedYear: 2020,
    employees: 35,
    website: 'https://agritechsol.com'
  },
  {
    id: '15',
    name: 'VRWorld Studios',
    industry: 'Virtual Reality',
    location: 'Portland, OR',
    foundedYear: 2019,
    employees: 67,
    website: 'https://vrworld.studio'
  },
  {
    id: '16',
    name: 'SmartGrid Networks',
    industry: 'Energy',
    location: 'Chicago, IL',
    foundedYear: 2018,
    employees: 92,
    website: 'https://smartgrid.net'
  },
  {
    id: '17',
    name: 'LanguageAI',
    industry: 'Natural Language Processing',
    location: 'Toronto, ON',
    foundedYear: 2020,
    employees: 51,
    website: 'https://languageai.ca'
  },
  {
    id: '18',
    name: 'CryptoVault',
    industry: 'Cryptocurrency',
    location: 'Singapore',
    foundedYear: 2021,
    employees: 38,
    website: 'https://cryptovault.sg'
  },
  {
    id: '19',
    name: 'OceanTech',
    industry: 'Marine Technology',
    location: 'San Diego, CA',
    foundedYear: 2019,
    employees: 44,
    website: 'https://oceantech.io'
  },
  {
    id: '20',
    name: 'MentalHealth AI',
    industry: 'Digital Health',
    location: 'London, UK',
    foundedYear: 2021,
    employees: 29,
    website: 'https://mentalhealthai.co.uk'
  },
  {
    id: '21',
    name: 'SupplyChain AI',
    industry: 'Logistics',
    location: 'Atlanta, GA',
    foundedYear: 2020,
    employees: 73,
    website: 'https://supplychainai.com'
  },
  {
    id: '22',
    name: 'ClimateSense',
    industry: 'Climate Tech',
    location: 'Berlin, DE',
    foundedYear: 2019,
    employees: 56,
    website: 'https://climatesense.de'
  },
  {
    id: '23',
    name: 'FoodTech Innovations',
    industry: 'Food Technology',
    location: 'Tel Aviv, IL',
    foundedYear: 2020,
    employees: 48,
    website: 'https://foodtech.io'
  },
  {
    id: '24',
    name: 'RetailAI',
    industry: 'Retail Technology',
    location: 'New York, NY',
    foundedYear: 2021,
    employees: 61,
    website: 'https://retailai.com'
  },
  {
    id: '25',
    name: 'SportsAnalytics Pro',
    industry: 'Sports Tech',
    location: 'Barcelona, ES',
    foundedYear: 2019,
    employees: 39,
    website: 'https://sportsanalytics.pro'
  }
];

export const industries = Array.from(new Set(mockCompanies.map(c => c.industry))).sort();
export const locations = Array.from(new Set(mockCompanies.map(c => c.location))).sort();