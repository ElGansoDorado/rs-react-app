import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/query-client';

type Prop = {
  children: React.ReactNode;
};

export function Provider({ children }: Prop) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
