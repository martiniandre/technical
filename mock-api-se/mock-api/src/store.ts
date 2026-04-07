import path from 'path';
import { MockData, DashboardData } from './types';

const initialData: MockData = require(path.join(__dirname, '..', 'data.json'));

let liveData: MockData = JSON.parse(JSON.stringify(initialData));

export function getSeedData(): MockData {
  return initialData;
}

export function getLiveData(): MockData {
  return liveData;
}

export function getDashboard(): DashboardData {
  const { users: _users, ...dashboard } = liveData;
  return dashboard;
}

export function setLiveData(data: MockData): void {
  liveData = data;
}
