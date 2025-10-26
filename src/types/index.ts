// 家族成员类型
export interface FamilyMember {
  id: string
  name: string
  nickname: string
  birthYear: string
  deathYear?: string
  birthPlace?: string
  occupation?: string
  gender: 'male' | 'female'
  avatar?: string
  biography?: string
  parents?: {
    father?: string
    mother?: string
  }
  spouse?: string
  children?: string[]
}

// 照片类型
export interface Photo {
  id: string
  url: string
  title?: string
  description?: string
  date: string
  membersTagged?: string[]
  likes?: number
  comments?: number
}

// 相册类型
export interface Album {
  id: string
  title: string
  cover: string
  photos: Photo[]
  photoCount: number
  description: string
  createdAt: string
  isSmartAlbum?: boolean
}

// 家规类型
export interface FamilyRule {
  id: string
  title: string
  content: string
  category: string
  story?: string
  createdAt: string
}

// 社交动态类型
export interface Post {
  id: string
  familyId: string
  familyName: string
  familyAvatar: string
  authorId: string
  authorName: string
  content: string
  images?: string[]
  likes: number
  comments: number
  timestamp: string
  isLiked?: boolean
}

// 用户信息
export interface UserInfo {
  id: string
  name: string
  avatar: string
  familyRole: string
  familyId: string
  familyName: string
  joinDate: string
}

// API响应类型
export interface ApiResponse<T> {
  code: number
  message: string
  data?: T
}
