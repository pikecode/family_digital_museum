import { create } from 'zustand'
import type { UserInfo } from '@/types'

interface AppState {
  // 用户信息
  userInfo: UserInfo | null
  isLoggedIn: boolean

  // 家族ID
  familyId: string | null

  // 操作方法
  setUserInfo: (userInfo: UserInfo) => void
  setLoggedIn: (isLoggedIn: boolean) => void
  setFamilyId: (familyId: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  userInfo: null,
  isLoggedIn: false,
  familyId: null,

  setUserInfo: (userInfo) =>
    set({
      userInfo,
      isLoggedIn: true
    }),

  setLoggedIn: (isLoggedIn) =>
    set({ isLoggedIn }),

  setFamilyId: (familyId) =>
    set({ familyId }),

  logout: () =>
    set({
      userInfo: null,
      isLoggedIn: false,
      familyId: null
    })
}))
