'use client';
import { useRouter, usePathname } from 'next/navigation';

export const useDetailToggle = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pathSegments = pathname.split('/');
  const currentDetail = pathSegments.length > 2 ? pathSegments[2] : null;

  const toggleDetail = (detailId: string) => {
    const basePath = `http://localhost:3000/${pathSegments[1]}`;

    if (currentDetail === detailId) {
      router.push(basePath);
    } else {
      router.push(`${basePath}/${detailId}`);
    }
  };

  return { currentDetail, toggleDetail };
};
