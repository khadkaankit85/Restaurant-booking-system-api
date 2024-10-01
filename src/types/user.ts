export interface user {
  id: number;
  username: string;
  password: string;
  phone?: string;
  email: string;
  role: "admin" | "user";
}
//other interfaces resides here:)
