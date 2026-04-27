import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const userSchema = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  role: text('role').array().notNull().default([]),
  img: text('img'),
};

export const UserModel = pgTable('users', userSchema);
