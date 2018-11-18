export interface IAnilistUserRoot {
  data: IAnilistData;
}

export interface IAnilistData {
  User: IAnilistUser;
}

export interface IAnilistUser {
  about: string;
  avatar: IAnilistAvatar;
  bannerImage: string;
  id: number;
  name: string;
  siteUrl: string;
}

export interface IAnilistAvatar {
  large: string;
  medium: string;
}
