import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleToken, getTokenFromCache } from '@/common/lib/resources/SecureTokenHandler';

const LoginHandler: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const processToken = useCallback(async () => {
    setIsLoading(true);
    const token = new URLSearchParams(location.search).get('sid');
    try {
      const result = await handleToken(token);
      setMessage(result.message);
      setIsError(!result.success);
      if (result.success) {
        const cached = await getTokenFromCache();
        if (cached) navigate('/');
        else {
          setMessage(
            'Login successful, but there was an issue storing the session. Please check your browser settings and try again.',
          );
          setIsError(true);
        }
      }
    } catch {
      setMessage('An unexpected error occurred. Please try again or check your browser settings.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [location.search, navigate]);

  useEffect(() => {
    void processToken();
  }, [processToken]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <p>{message}</p>
      {isError && (
        <p>
          If you&apos;re using Safari, please check your Privacy settings and ensure that &quot;Prevent
          Cross-Site Tracking&quot; is disabled for this site.
        </p>
      )}
    </div>
  );
});

LoginHandler.displayName = 'LoginHandler';
export default LoginHandler;
