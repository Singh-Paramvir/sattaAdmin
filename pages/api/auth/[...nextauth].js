import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      name: "Custom Provider",
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const data = { email, password };

          const response = await axios.post(
            "http://44.200.180.0:7777/api/v1/auth/adminuserlogin",
            data
          );

          if (response.status !== 200) {
            throw new Error("Invalid Credentials for email: " + email);
          }

          const token = response.data.data;
          console.log(token, "abcdef");

          // Check if running on the client side before using localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
          }

          if (!token) {
            throw new Error("Invalid token");
          }

          const user = {
            name: token,
            email,
          };

          return user;
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
});
