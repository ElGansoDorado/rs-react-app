import { fetchCountryData } from '@/shared/api/co2';
import type { CountriesData } from '@/shared/model/country';
import { useEffect, useRef, useState } from 'react';

export const useLoading = () => {
  const [countryCO2Data, setCountryCO2Data] = useState<CountriesData | null>(
    null
  );

  const [loading, setLoading] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    fetchCountryData(setLoading).then((data) => {
      setCountryCO2Data(data);
    });
  }, []);

  return { countryCO2Data, loading };
};
