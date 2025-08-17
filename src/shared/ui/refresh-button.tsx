'use client';
import { useRouter } from 'next/navigation';

type Props = {
  tag: string;
};

function RefreshButton({ tag }: Props) {
  const router = useRouter();

  const handleRefreshData = async () => {
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: tag }),
      });

      router.refresh();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <button className="button-error" onClick={handleRefreshData}>
      refresh data
    </button>
  );
}

export default RefreshButton;
