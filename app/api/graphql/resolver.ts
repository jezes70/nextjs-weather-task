import { ISignUp,ISignIn,IUser } from "@/app/interface";
import prisma from "../../../prisma/client";
import bcrypt from "bcryptjs";
export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    getcities: async (_: unknown, { email }: { email: string }) => {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return await prisma.city.findMany({
        where: {
          userId: user?.id,
        },
      });
    },
  },
  Mutation: {
    signup: async (
      _: unknown,
      { name, email, password, confirmPassword }: ISignUp
    ) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (password !== confirmPassword)
          throw new Error("Password and Confirm Password is not the same");
        if (existingUser) throw new Error("User already exists ");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            email,
            hashedPassword,
            name: name,
          },
        });
        const user = { ...newUser };
        return user;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },

    signin: async (_: unknown, { email, password }: ISignIn) => {
      try {
        const existingUser = (await prisma.user.findUnique({
          where: {
            email,
          },
        })) as IUser;

        if (!existingUser) throw new Error("Invalid credentials");
        const validPassword = await bcrypt.compare(
          password,
          existingUser?.hashedPassword
        );
        if (!validPassword) throw new Error("Invalid credemtial");

        return existingUser;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    addcity: async (
      _: unknown,
      { name, email }: { name: string; email: string }
    ) => {
      const existingUser = (await prisma.user.findUnique({
        where: {
          email,
        },
      })) as unknown as any;
      const existingCity = await prisma.city.findFirst({
        where: {
          name,
          userId: existingUser.id,
        },
      });
      if (existingCity) throw new Error("city already exists");
      const newCity = await prisma.city.create({
        data: {
          name,
          userId: existingUser.id,
        },
      });
    },
  },
};
