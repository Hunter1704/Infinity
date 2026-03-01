import { useParams } from 'react-router-dom';

const SocialLoginError = () => {
  const { provider } = useParams();
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>{provider} Login Failed</h1>
      <p>Please try again.</p>
      <a href="/">Back to homepage</a>
    </div>
  );
};

export default SocialLoginError;