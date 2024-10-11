interface APIResponse<T = null> {
  message: string;
  data: T | null;
  status: number;
}

export type { APIResponse };
