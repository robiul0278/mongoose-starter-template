import { z } from 'zod';

export const userValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        password: z.string().min(6),
        email: z.string().email(),
        photoURL: z.string().url().optional(),
        role: z.enum(["user", "admin"]).default("user"),
        createdAt: z.date().optional()
    })
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User email is required!',
    })
  })
})

// Define the validation schema for the role
export const roleValidationSchema = z.object({
    body: z.object({
        role: z.enum(["user", "admin"]).default("user")
    })
});