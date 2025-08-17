'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const onChangeSwitcher = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <select
      name="language swtcher"
      onChange={onChangeSwitcher}
      value={currentLocale}
    >
      <option value="en">en</option>
      <option value="ru">ru</option>
    </select>
  );
}

export default LanguageSwitcher;
