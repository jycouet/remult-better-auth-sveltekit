import { Entity, Fields, Relations, Validators } from "remult";

@Entity<User>("user", {})
export class User {
  @Fields.string({
    required: true,
    minLength: 8,
    maxLength: 40,
    validate: Validators.unique(),
    allowNull: false,
    allowApiUpdate: false,
  })
  id!: string;

  @Fields.string({ required: true })
  name = "";

  @Fields.string({
    required: true,
    validate: [Validators.unique(), Validators.email()],
    allowNull: false,
  })
  email = "";

  @Fields.boolean({
    required: true,
    defaultValue: () => false,
    allowNull: false,
  })
  emailVerified = false;

  @Fields.string({ required: false })
  image = "";

  @Fields.createdAt({
    required: true,
    defaultValue: () => new Date(),
    allowNull: false,
    allowApiUpdate: true,
  })
  createdAt!: Date;

  @Fields.updatedAt({
    required: true,
    defaultValue: () => new Date(),
    allowNull: false,
    allowApiUpdate: true,
  })
  updatedAt!: Date;
}

@Entity<Session>("session", {})
export class Session {
  @Fields.string({
    required: true,
    minLength: 8,
    maxLength: 40,
    validate: Validators.unique(),
    allowNull: false,
    allowApiUpdate: false,
  })
  id!: string;

  @Fields.date({ required: true })
  expiresAt = new Date();

  @Fields.string({ required: true, validate: Validators.unique() })
  token = "";

  @Fields.createdAt({ required: true, allowNull: false, allowApiUpdate: true })
  createdAt!: Date;

  @Fields.updatedAt({ required: true, allowNull: false, allowApiUpdate: true })
  updatedAt!: Date;

  @Fields.string({ required: false })
  ipAddress = "";

  @Fields.string({ required: false })
  userAgent = "";

  @Fields.string({ required: true })
  userId = "";
  @Relations.toOne<Session, User>(() => User, "id")
  user!: User;
}

@Entity<Account>("account", {})
export class Account {
  @Fields.string({
    required: true,
    minLength: 8,
    maxLength: 40,
    validate: Validators.unique(),
    allowNull: false,
    allowApiUpdate: false,
  })
  id!: string;

  @Fields.string({ required: true })
  accountId = "";

  @Fields.string({ required: true })
  providerId = "";

  @Fields.string({ required: true })
  userId = "";
  @Relations.toOne<Account, User>(() => User, "id")
  user!: User;

  @Fields.string({ required: false })
  accessToken = "";

  @Fields.string({ required: false })
  refreshToken = "";

  @Fields.string({ required: false })
  idToken = "";

  @Fields.date({ required: false })
  accessTokenExpiresAt = new Date();

  @Fields.date({ required: false })
  refreshTokenExpiresAt = new Date();

  @Fields.string({ required: false })
  scope = "";

  @Fields.string({ required: false })
  password = "";

  @Fields.createdAt({ required: true, allowNull: false, allowApiUpdate: true })
  createdAt!: Date;

  @Fields.updatedAt({ required: true, allowNull: false, allowApiUpdate: true })
  updatedAt!: Date;
}

@Entity<Verification>("verification", {})
export class Verification {
  @Fields.string({
    required: true,
    minLength: 8,
    maxLength: 40,
    validate: Validators.unique(),
    allowNull: false,
    allowApiUpdate: false,
  })
  id!: string;

  @Fields.string({ required: true })
  identifier = "";

  @Fields.string({ required: true })
  value = "";

  @Fields.date({ required: true })
  expiresAt = new Date();

  @Fields.createdAt({
    required: false,
    defaultValue: () => new Date(),
    allowNull: false,
    allowApiUpdate: true,
  })
  createdAt!: Date;

  @Fields.updatedAt({
    required: false,
    defaultValue: () => new Date(),
    allowNull: false,
    allowApiUpdate: true,
  })
  updatedAt!: Date;
}

export const authEntities = { User, Account, Session, Verification };
