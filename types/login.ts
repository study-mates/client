export interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  id_token?: string;
  scope?: string;
}

export interface profile {
  username: string;
  profileImage: string;
  lastAccessedStudyId: number;
}

export interface LoginUser {
  token: string;
  user: profile;
  isNew: boolean;
}
