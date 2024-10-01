export interface user {
  id: number;
  username: string;
  password: string;
  phone?: string;
  email: string;
  role: "admin" | "user";
}

export interface CreateUserRequest {
  body: {
    username: string;
    password: string;
    email: string;
    phone?: string;
  };
}
