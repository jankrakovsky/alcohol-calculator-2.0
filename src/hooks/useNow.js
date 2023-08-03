import { useMemo } from 'react';

const useNow = () => useMemo(() => new Date(), []);

export default useNow;
