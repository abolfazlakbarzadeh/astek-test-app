import http from "@/lib/http.ts";
import type {User} from "@/types.ts";
import type { AxiosResponse } from 'axios'

export class AuthService {
    static async login(username: string, password: string): Promise<any> {
        return http.post('/auth/login', { username, password }).catch(reason => {
            console.log(reason);
            return Promise.reject(reason);
        })
    }
    static async getUser(token: string): Promise<AxiosResponse<User>> {
        return http.get<User>('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).catch(reason => {
            console.log(reason);
            return Promise.reject(reason);
        })
    }
}