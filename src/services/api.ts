import Taro from '@tarojs/taro'
import type { ApiResponse } from '@/types'

// API 基础配置
const API_BASE_URL = 'https://api.family-museum.com'
const REQUEST_TIMEOUT = 10000

// 请求拦截器
const request = async <T>(
  url: string,
  options: Taro.request.Param = {}
): Promise<T> => {
  const finalUrl = url.startsWith('http')
    ? url
    : `${API_BASE_URL}${url}`

  try {
    const response = await Taro.request<ApiResponse<T>>({
      url: finalUrl,
      method: 'GET',
      timeout: REQUEST_TIMEOUT,
      ...options
    })

    if (response.statusCode === 200 && response.data) {
      if (response.data.code === 0) {
        return response.data.data as T
      } else {
        throw new Error(response.data.message || '请求失败')
      }
    } else {
      throw new Error('请求异常')
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// 家族树相关接口
export const familyTreeApi = {
  // 获取家族成员列表
  getMembers: (familyId: string) =>
    request(`/api/family/${familyId}/members`),

  // 获取成员详情
  getMemberDetail: (familyId: string, memberId: string) =>
    request(`/api/family/${familyId}/members/${memberId}`),

  // 添加成员
  addMember: (familyId: string, data: any) =>
    request(`/api/family/${familyId}/members`, {
      method: 'POST',
      data
    }),

  // 更新成员信息
  updateMember: (familyId: string, memberId: string, data: any) =>
    request(`/api/family/${familyId}/members/${memberId}`, {
      method: 'PUT',
      data
    })
}

// 相册相关接口
export const photoAlbumApi = {
  // 获取智能合集
  getSmartAlbums: (familyId: string) =>
    request(`/api/family/${familyId}/albums/smart`),

  // 获取所有照片（时间线）
  getPhotos: (familyId: string, page: number = 1) =>
    request(`/api/family/${familyId}/photos?page=${page}`),

  // 获取相册详情
  getAlbumDetail: (familyId: string, albumId: string) =>
    request(`/api/family/${familyId}/albums/${albumId}`),

  // 上传照片
  uploadPhoto: (familyId: string, data: FormData) =>
    request(`/api/family/${familyId}/photos/upload`, {
      method: 'POST',
      data
    })
}

// 家规相关接口
export const familyRulesApi = {
  // 获取家规列表
  getRules: (familyId: string) =>
    request(`/api/family/${familyId}/rules`),

  // 获取家规详情
  getRuleDetail: (familyId: string, ruleId: string) =>
    request(`/api/family/${familyId}/rules/${ruleId}`)
}

// 家庭广场相关接口
export const familySquareApi = {
  // 获取推荐动态
  getRecommendedPosts: (page: number = 1) =>
    request(`/api/square/recommended?page=${page}`),

  // 获取关注的动态
  getFollowingPosts: (page: number = 1) =>
    request(`/api/square/following?page=${page}`),

  // 点赞
  likePost: (postId: string) =>
    request(`/api/posts/${postId}/like`, { method: 'POST' }),

  // 评论
  commentPost: (postId: string, content: string) =>
    request(`/api/posts/${postId}/comments`, {
      method: 'POST',
      data: { content }
    }),

  // 发布动态
  createPost: (data: any) =>
    request('/api/posts', {
      method: 'POST',
      data
    })
}

// 用户相关接口
export const userApi = {
  // 获取用户信息
  getUserInfo: () =>
    request('/api/user/info'),

  // 更新用户信息
  updateUserInfo: (data: any) =>
    request('/api/user/info', {
      method: 'PUT',
      data
    }),

  // 登录
  login: (code: string) =>
    request('/api/auth/login', {
      method: 'POST',
      data: { code }
    })
}

// 文件上传
export const uploadFile = (url: string, filePath: string) =>
  new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `${API_BASE_URL}${url}`,
      filePath,
      name: 'file',
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.data))
        } else {
          reject(new Error('上传失败'))
        }
      },
      fail: reject
    })
  })
