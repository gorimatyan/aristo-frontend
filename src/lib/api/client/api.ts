/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios"

/**
 * API Client
 * @param メソッド
 * @param エンドポイント
 * @param クエリパラメータ
 * @param ボディデータ
 * @param 認証が必要かどうか
 *
 * @return レスポンスデータ
 */
export const api = (
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  queryParams?: Record<string, any>,
  bodyData?: any,
  requiresAuth: boolean = true,
): Promise<AxiosResponse> => {
  // .envからバックエンドのエンドポイントを使う
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"

  // axiosのクライアント作成（Authorizationヘッダにローカルストレージからトークンがあればそれを付与する）
  const createApiClient = (): AxiosInstance => {
    const client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // リクエストインターセプターでトークンを自動付与
    client.interceptors.request.use(
      (config) => {
        // 認証が必要な場合のみトークンを付与
        if (requiresAuth) {
          // ローカルストレージからトークンを取得
          const token = localStorage.getItem("auth_token")

          if (token) {
            // BearerトークンとしてAuthorizationヘッダーに設定
            config.headers["Authorization"] = `Bearer ${token}`
          }
        }

        console.log("API Request:", {
          method: config.method?.toUpperCase(),
          url: config.url,
          baseURL: config.baseURL,
          headers: config.headers,
          data: config.data,
          params: config.params,
          requiresAuth,
        })

        return config
      },
      (error) => {
        console.error("Request Error:", error)
        return Promise.reject(error)
      },
    )

    // レスポンスインターセプター
    client.interceptors.response.use(
      (response) => {
        console.log("API Response:", {
          status: response.status,
          url: response.config.url,
          data: response.data,
        })
        return response
      },
      (error) => {
        console.error("Response Error:", {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        })

        // 認証が必要なAPIで401エラーの場合は認証状態をクリア
        if (requiresAuth && error.response?.status === 401) {
          localStorage.removeItem("auth_token")
          localStorage.removeItem("user_data")
          // 必要に応じてログインページにリダイレクト
          if (typeof window !== "undefined") {
            window.location.href = "/login"
          }
        }

        return Promise.reject(error)
      },
    )

    return client
  }

  const apiClient = createApiClient()

  // メソッドを指定し、クエリパラメータ・ボディデータがあればそれを渡す。
  const config: AxiosRequestConfig = {
    method: method.toLowerCase() as any,
    url: endpoint,
  }

  // クエリパラメータがある場合は設定
  if (queryParams) {
    config.params = queryParams
  }

  // ボディデータがある場合は設定（GET以外）
  if (bodyData && method !== "GET") {
    config.data = bodyData
  }

  // axiosでAPIを叩く
  return apiClient.request(config)
}

// 便利なメソッドを提供
export const apiClient = {
  get: (
    endpoint: string,
    queryParams?: Record<string, any>,
    requiresAuth: boolean = true,
  ) => api("GET", endpoint, queryParams, undefined, requiresAuth),

  post: (
    endpoint: string,
    bodyData?: any,
    queryParams?: Record<string, any>,
    requiresAuth: boolean = true,
  ) => api("POST", endpoint, queryParams, bodyData, requiresAuth),

  put: (
    endpoint: string,
    bodyData?: any,
    queryParams?: Record<string, any>,
    requiresAuth: boolean = true,
  ) => api("PUT", endpoint, queryParams, bodyData, requiresAuth),

  patch: (
    endpoint: string,
    bodyData?: any,
    queryParams?: Record<string, any>,
    requiresAuth: boolean = true,
  ) => api("PATCH", endpoint, queryParams, bodyData, requiresAuth),

  delete: (
    endpoint: string,
    queryParams?: Record<string, any>,
    requiresAuth: boolean = true,
  ) => api("DELETE", endpoint, queryParams, undefined, requiresAuth),
}
