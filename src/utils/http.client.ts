/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export class HttpClient {
  static async get(url: string, query?: Record<string, unknown> | null) {
    return (
      await axios({
        method: 'get',
        url,
        params: query,
      })
    ).data;
  }
}