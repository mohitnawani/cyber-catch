export type UserFlowView = 'start' | 'upload' | 'staging' | 'complete'

export type ImportedMember = {
  id: number
  name: string
  email: string
  department: string
  role: string
}
