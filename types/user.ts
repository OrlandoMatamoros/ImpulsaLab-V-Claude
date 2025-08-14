export enum UserRole {
  VISITOR = 'visitor',
  REGISTERED = 'registered', 
  CLIENT = 'client',
  CONSULTANT = 'consultant',
  ADMIN = 'admin'
}

export interface User {
  uid: string
  email: string
  name?: string
  phone?: string
  role: UserRole
  subscriptionStatus?: 'active' | 'inactive' | 'trial'
  consultantCode?: string
  createdAt: Date
  emailVerified: boolean
  phoneVerified?: boolean
}
