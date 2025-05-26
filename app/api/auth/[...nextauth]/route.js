
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Hardcoded for demo (use MongoDB in production)
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          return { id: '1', name: 'Admin', email: 'admin@example.com',role: 'admin', active: true, isVerified: true, };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };