import { http } from '../../../helpers/api';
import type { LoginRequestDTO, LoginResponseDTO } from '../../dto/auth';

const URLS = {
  LOGIN: '/login',
}

export const authResource = {
  login: (payload: LoginRequestDTO) =>
    http.post<LoginResponseDTO, LoginRequestDTO>(URLS.LOGIN, payload),
};
