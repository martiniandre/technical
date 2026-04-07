import { http } from '../../../helpers/api';
import type { DashboardDTO } from '../../dto/dashboard';


const URLS = {
  base: '/dashboard',
}

export const dashboardResource = {
  getSnapshot: () => http.get<DashboardDTO>(URLS.base),
};
