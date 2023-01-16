export type Message = {
  id: string;
  user: {
    name: string;
    email: string;
  } | null;
  content: string;
}
