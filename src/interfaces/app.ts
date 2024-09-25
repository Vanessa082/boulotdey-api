interface APIResponse<T = null> {
  message: string;
  data: T;
  status: number;
}

export type { APIResponse };
