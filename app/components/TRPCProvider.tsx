'use client';

import { api } from '~/utils/api';

function TRPCProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default api.withTRPC(TRPCProvider);
