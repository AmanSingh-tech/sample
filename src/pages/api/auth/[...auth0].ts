import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { auth0 } = req.query;
  
  if (!auth0 || !Array.isArray(auth0)) {
    return res.status(400).json({ error: 'Invalid auth route' });
  }
  
  const route = auth0[0];
  
  // Check required environment variables
  const {
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_BASE_URL,
    AUTH0_SCOPE
  } = process.env;
  
  if (!AUTH0_ISSUER_BASE_URL || !AUTH0_CLIENT_ID || !AUTH0_BASE_URL) {
    return res.status(500).json({ error: 'Auth0 configuration missing' });
  }
  
  switch (route) {
    case 'login':
      // Redirect to Auth0 hosted login page
      const loginUrl = `${AUTH0_ISSUER_BASE_URL}/authorize?` +
        `response_type=code&` +
        `client_id=${AUTH0_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(AUTH0_BASE_URL + '/api/auth/callback')}&` +
        `scope=${encodeURIComponent(AUTH0_SCOPE || 'openid profile email')}&` +
        `state=${Math.random().toString(36).substring(7)}`;
      
      return res.redirect(loginUrl);
      
    case 'logout':
      // Redirect to Auth0 logout
      const logoutUrl = `${AUTH0_ISSUER_BASE_URL}/v2/logout?` +
        `client_id=${AUTH0_CLIENT_ID}&` +
        `returnTo=${encodeURIComponent(AUTH0_BASE_URL)}`;
      
      return res.redirect(logoutUrl);
      
    case 'callback':
      // Handle Auth0 callback - exchange code for tokens
      const { code, state, error, error_description } = req.query;
      
      console.log('Auth callback received:', req.query);
      
      if (error) {
        console.error('Auth0 callback error:', error, error_description);
        return res.redirect(`/?error=${encodeURIComponent(error as string)}`);
      }
      
      if (!code) {
        console.error('No authorization code received');
        return res.redirect('/?error=no_code');
      }
      
      try {
        // Exchange authorization code for tokens
        const tokenResponse = await fetch(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: code,
            redirect_uri: `${AUTH0_BASE_URL}/api/auth/callback`,
          }),
        });
        
        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.text();
          console.error('Token exchange failed:', errorData);
          return res.redirect('/?error=token_exchange_failed');
        }
        
        const tokens = await tokenResponse.json();
        console.log('Tokens received:', { 
          access_token: tokens.access_token ? '***' : 'missing',
          id_token: tokens.id_token ? '***' : 'missing',
          token_type: tokens.token_type 
        });
        
        // Get user info using the access token
        const userResponse = await fetch(`${AUTH0_ISSUER_BASE_URL}/userinfo`, {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
          },
        });
        
        if (!userResponse.ok) {
          console.error('Failed to fetch user info');
          return res.redirect('/?error=user_info_failed');
        }
        
        const user = await userResponse.json();
        console.log('User info:', { 
          sub: user.sub, 
          email: user.email, 
          name: user.name 
        });
        
        // For now, pass user data via URL parameters (in production, use secure session storage)
        const userData = encodeURIComponent(JSON.stringify({
          sub: user.sub,
          email: user.email,
          name: user.name,
          picture: user.picture
        }));
        
        return res.redirect(`/?login=success&user=${userData}`);
        
      } catch (error) {
        console.error('Callback processing error:', error);
        return res.redirect('/?error=callback_failed');
      }
      
    case 'me':
      // Return mock user data for now
      return res.json({ 
        user: null,
        isAuthenticated: false 
      });
      
    default:
      return res.status(404).json({ error: 'Auth route not found' });
  }
}
