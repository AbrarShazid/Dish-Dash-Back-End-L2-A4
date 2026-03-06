// src/app.ts
import { toNodeHandler } from "better-auth/node";
import express from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          Role       @default(CUSTOMER)\n  status        UserStatus @default(ACTIVATE)\n\n  providerProfile ProviderProfile?\n  orders          Order[]\n  reviews         Review[]\n  sessions        Session[]\n  accounts        Account[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserStatus {\n  ACTIVATE\n  SUSPEND\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  createdAt DateTime @default(now())\n  meals     Meal[]\n}\n\nmodel Meal {\n  id          String  @id @default(uuid())\n  name        String\n  description String?\n  price       Decimal @db.Decimal(10, 2)\n  imageUrl    String?\n  isAvailable Boolean @default(true)\n  isDeleted   Boolean @default(false)\n\n  providerId String\n  categoryId String\n\n  provider ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade)\n  category Category        @relation(fields: [categoryId], references: [id])\n\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  createdAt DateTime @default(now())\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  customerId      String\n  providerId      String\n  status          OrderStatus @default(PLACED)\n  totalAmount     Decimal     @db.Decimal(10, 2)\n  deliveryAddress String\n\n  customer User            @relation(fields: [customerId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n\n  items OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel OrderItem {\n  id       String  @id @default(uuid())\n  orderId  String\n  mealId   String\n  mealName String\n  quantity Int\n  price    Decimal @db.Decimal(10, 2)\n  review   Review?\n\n  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  meal  Meal  @relation(fields: [mealId], references: [id])\n\n  @@index([orderId])\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nmodel ProviderProfile {\n  id             String   @id @default(uuid())\n  userId         String   @unique\n  restaurantName String\n  description    String?\n  imageUrl       String?\n  isOpen         Boolean  @default(true)\n  createdAt      DateTime @default(now())\n\n  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  meals  Meal[]\n  orders Order[]\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int\n  comment String?\n\n  userId      String\n  mealId      String\n  orderItemId String @unique\n\n  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  meal      Meal      @relation(fields: [mealId], references: [id], onDelete: Cascade)\n  orderItem OrderItem @relation(fields: [orderItemId], references: [id])\n\n  createdAt DateTime @default(now())\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalAmount","kind":"scalar","type":"Decimal"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"mealName","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"review","kind":"object","type":"Review","relationName":"OrderItemToReview"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isOpen","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"orderItemId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"orderItem","kind":"object","type":"OrderItem","relationName":"OrderItemToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var UserStatus = {
  ACTIVATE: "ACTIVATE",
  SUSPEND: "SUSPEND"
};
var Role = {
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
  ADMIN: "ADMIN"
};
var OrderStatus = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.NODEMAILER_GMAIL,
    pass: process.env.NODEMAILER_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: true
      },
      status: {
        type: "string",
        defaultValue: "ACTIVATE",
        required: true
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = url;
        const info = await transporter.sendMail({
          from: `"Dish Dash" <${process.env.NODEMAILER_GMAIL}>`,
          to: user.email,
          subject: "Verification mail from Dish Dash",
          text: `Verify your email: ${url}`,
          html: `
        
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      .header {
        background-color: #6a61e9;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
      }
      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }
      .button-wrapper {
        text-align: center;
        margin: 30px 0;
      }
      .verify-button {
        background-color: #a09ce0;
        color: #ffffff;
        text-decoration: none;
        padding: 14px 28px;
        border-radius: 6px;
        font-size: 16px;
        display: inline-block;
      }
      .verify-button:hover {
        background-color: #6f6aa3;
      }
      .footer {
        background-color: #f4f6f8;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #666666;
      }
      .link {
        word-break: break-all;
        color: #4f46e5;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        Dish Dash
      </div>

      <div class="content">
        <p>Hello ${user.name} \u{1F44B},</p>

        <p>
          Thank you for signing up for <strong>Dish Dash</strong>.
          Please confirm your email address by clicking the button below.
        </p>

        <div class="button-wrapper">
          <a href="${verificationUrl}" class="verify-button">
            Verify Email
          </a>
        </div>

        <p>
          If the button doesn\u2019t work, copy and paste this link into your browser:
        </p>

        <p class="link">${verificationUrl}</p>

        <p>
          This link will expire for security reasons. If you didn\u2019t create an
          account, you can safely ignore this email.
        </p>

        <p>Thanks,<br />The Dish Dash Team</p>
      </div>

      <div class="footer">
        \xA9 2026 Dish Dash. All rights reserved.
      </div>
    </div>
  </body>
</html>

        
        `
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
});

// src/app.ts
import cors from "cors";

// src/modules/user/user.router.ts
import { Router } from "express";

// src/modules/user/user.service.ts
var getAllUser = async () => {
  const result = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getProfile = async (userId) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    }
  });
  return result;
};
var updateUserProfile = async (userId, payload) => {
  const updateData = {
    name: payload.name
  };
  if (payload.image !== void 0 && payload.image !== "") {
    updateData.image = payload.image;
  }
  const result = await prisma.user.update({
    where: { id: userId },
    data: updateData
  });
  return result;
};
var updateUserStatus = async (id, status) => {
  const result = await prisma.user.update({
    where: { id },
    data: { status }
  });
  if (result.role === Role.PROVIDER && status === UserStatus.SUSPEND) {
    await prisma.providerProfile.updateMany({
      where: { userId: id },
      data: { isOpen: false }
    });
  }
  if (result.role === Role.PROVIDER && status === UserStatus.ACTIVATE) {
    await prisma.providerProfile.updateMany({
      where: { userId: id },
      data: { isOpen: true }
      // optional decision
    });
  }
  await prisma.session.deleteMany({
    where: { userId: id }
  });
  return result;
};
var userService = {
  getAllUser,
  getProfile,
  updateUserProfile,
  updateUserStatus
};

// src/modules/user/user.controller.ts
var getAllUser2 = async (req, res) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(404).json({
      error: "User can't be fetched!",
      details: error || "Something went wrong"
    });
  }
};
var getProfile2 = async (req, res) => {
  try {
    const result = await userService.getProfile(req.user?.id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
};
var updateUserProfile2 = async (req, res) => {
  try {
    const result = await userService.updateUserProfile(
      req.user?.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || "Failed, something went wrong!"
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!req.user) {
    return res.status(400).json({
      success: false,
      message: "Only Admin!"
    });
  }
  try {
    if (id === req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Admin Status cann't be change!"
      });
    }
    const result = await userService.updateUserStatus(id, status);
    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed, something went wrong!"
    });
  }
};
var userController = {
  getAllUser: getAllUser2,
  getProfile: getProfile2,
  updateUserProfile: updateUserProfile2,
  updateUserStatus: updateUserStatus2
};

// src/middlewares/authMiddleware.ts
var authMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not logged in!"
        });
      }
      if (session.user.status === "SUSPEND") {
        return res.status(403).json({
          success: false,
          message: "Account suspended by admin, Please contact support for more info!",
          contactMail: process.env.ADMIN_EMAIL
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required, Please verify your email!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
        status: session.user.status
      };
      const userRole = req.user.role;
      if (roles.length === 0 || roles.includes(userRole)) {
        return next();
      }
      return res.status(403).json({
        success: false,
        message: "Forbidden! You cannot access this resource"
      });
    } catch (error) {
      next(error);
    }
  };
};
var authMiddleware_default = authMiddleware;

// src/modules/user/user.router.ts
var router = Router();
router.get("/", authMiddleware_default("ADMIN" /* ADMIN */), userController.getAllUser);
router.get(
  "/get-user-profile",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  userController.getProfile
);
router.patch(
  "/update-profile",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  userController.updateUserProfile
);
router.patch(
  "/:id/status",
  authMiddleware_default("ADMIN" /* ADMIN */),
  userController.updateUserStatus
);
var userRouter = router;

// src/modules/menu/menu.router.ts
import { Router as Router2 } from "express";

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 9;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "price";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/menu/menu.service.ts
var addMenuItem = async (userId, menuItem) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    return {
      success: false,
      message: "Provider profile not found"
    };
  }
  const category = await prisma.category.findUnique({
    where: { id: menuItem.categoryId }
  });
  if (!category) {
    return {
      success: false,
      message: "Invalid category ID"
    };
  }
  const result = await prisma.meal.create({
    data: {
      name: menuItem.name,
      description: menuItem.description ?? null,
      price: menuItem.price,
      categoryId: menuItem.categoryId,
      imageUrl: menuItem.imageUrl ?? null,
      providerId: provider.id
    }
  });
  return result;
};
var updateMenuItem = async (userId, mealId, payload) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  if (meal.providerId !== provider.id) {
    throw new Error("You are not allowed to update this meal");
  }
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId }
    });
    if (!category) {
      throw new Error("Invalid category ID");
    }
  }
  const updatedMeal = await prisma.meal.update({
    where: { id: mealId },
    data: payload
  });
  return updatedMeal;
};
var deleteMenuItem = async (userId, mealId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  if (meal.providerId !== provider.id) {
    throw new Error("You are not allowed to update this meal");
  }
  if (meal.isDeleted) {
    throw new Error("Meal already deleted");
  }
  const updatedMeal = await prisma.meal.update({
    where: { id: mealId },
    data: {
      isDeleted: true,
      isAvailable: false
    }
  });
  return updatedMeal;
};
var getAllMenuItems = async (query) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(query);
  const { search, categoryId, minPrice = 0, maxPrice = 1e5 } = query;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (categoryId) {
    andConditions.push({
      categoryId
    });
  }
  if (minPrice && maxPrice) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
        lte: Number(maxPrice)
      }
    });
  }
  andConditions.push({
    isAvailable: true,
    //menu item must be available
    provider: {
      isOpen: true
    }
  });
  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
  const meals = await prisma.meal.findMany({
    where: whereConditions,
    include: {
      category: {
        select: {
          name: true
        }
      },
      provider: {
        select: {
          restaurantName: true
        }
      }
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.meal.count({
    where: whereConditions
  });
  return {
    meta: {
      page,
      limit,
      total
    },
    data: meals.map((meal) => ({
      ...meal,
      restaurantName: meal.provider.restaurantName,
      categoryName: meal.category.name,
      category: void 0,
      provider: void 0
    }))
  };
};
var getMenuByProvider = async (userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      userId
    }
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  const providerId = provider.id;
  const providerWithMenu = await prisma.providerProfile.findUnique({
    where: { id: providerId },
    include: {
      user: {
        select: {
          name: true
        }
      },
      meals: {
        where: {
          providerId,
          isDeleted: false
        },
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
  if (!providerWithMenu) {
    throw new Error("Provider not found");
  }
  return {
    menu: providerWithMenu.meals.map((meal) => ({
      id: meal.id,
      name: meal.name,
      description: meal.description,
      price: Number(meal.price),
      categoryId: meal.category.id,
      categoryName: meal.category.name,
      imageUrl: meal.imageUrl,
      isAvailable: meal.isAvailable,
      isDeleted: meal.isDeleted,
      createdAt: meal.createdAt
    }))
  };
};
var getMenuItemById = async (id) => {
  const meal = await prisma.meal.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          name: true
        }
      },
      provider: {
        select: {
          restaurantName: true
        }
      },
      reviews: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true
            }
          }
        }
      },
      _count: {
        select: {
          orderItems: true
          //count how many time ordered
        }
      }
    }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  return {
    id: meal.id,
    name: meal.name,
    description: meal.description,
    price: meal.price,
    imageUrl: meal.imageUrl,
    isAvailable: meal.isAvailable,
    categoryName: meal.category.name,
    providerId: meal.providerId,
    providerName: meal.provider.restaurantName,
    reviews: meal.reviews.map((review) => ({
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      userName: review.user.name,
      userImage: review.user.image
    })),
    totalOrders: meal._count.orderItems
  };
};
var menuService = {
  addMenuItem,
  updateMenuItem,
  getAllMenuItems,
  getMenuItemById,
  getMenuByProvider,
  deleteMenuItem
};

// src/modules/menu/menu.controller.ts
var addMenuItem2 = async (req, res) => {
  try {
    const result = await menuService.addMenuItem(
      req.user?.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Menu item added successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var updateMenuItem2 = async (req, res) => {
  try {
    if (!req.params.itemId) {
      return res.status(400).json({
        success: false,
        message: "Meal ID is required"
      });
    }
    const result = await menuService.updateMenuItem(
      req.user.id,
      req.params.itemId,
      req.body
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Menu item updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update menu item"
    });
  }
};
var deleteMenuItem2 = async (req, res) => {
  try {
    if (!req.params.itemId) {
      return res.status(400).json({
        success: false,
        message: "Meal ID is required"
      });
    }
    const result = await menuService.deleteMenuItem(
      req.user.id,
      req.params.itemId
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Menu item updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update menu item"
    });
  }
};
var getAllMenuItems2 = async (req, res) => {
  try {
    const result = await menuService.getAllMenuItems(req.query);
    res.status(200).json({
      success: true,
      meta: result.meta,
      data: result.data,
      message: "Menu items retrieved successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve menu items"
    });
  }
};
var getMenuByProvider2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await menuService.getMenuByProvider(userId);
    res.status(200).json({
      success: true,
      data: result,
      message: "Menu items retrieved successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve menu items"
    });
  }
};
var getMenuItemById2 = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Meal ID is required"
      });
    }
    const result = await menuService.getMenuItemById(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
      message: "Menu item retrieved successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve menu item"
    });
  }
};
var menuController = {
  addMenuItem: addMenuItem2,
  updateMenuItem: updateMenuItem2,
  getAllMenuItems: getAllMenuItems2,
  getMenuItemById: getMenuItemById2,
  getMenuByProvider: getMenuByProvider2,
  deleteMenuItem: deleteMenuItem2
};

// src/modules/menu/menu.router.ts
var router2 = Router2();
router2.get("/", menuController.getAllMenuItems);
router2.get(
  "/provider",
  authMiddleware_default("PROVIDER" /* PROVIDER */),
  menuController.getMenuByProvider
);
router2.get("/:id", menuController.getMenuItemById);
router2.post(
  "/add-item",
  authMiddleware_default("PROVIDER" /* PROVIDER */),
  menuController.addMenuItem
);
router2.patch(
  "/update/:itemId",
  authMiddleware_default("PROVIDER" /* PROVIDER */),
  menuController.updateMenuItem
);
router2.patch(
  "/delete/:itemId",
  authMiddleware_default("PROVIDER" /* PROVIDER */),
  menuController.deleteMenuItem
);
var menuRouter = router2;

// src/modules/category/category.router.ts
import { Router as Router3 } from "express";

// src/modules/category/category.service.ts
var addCategory = async (name) => {
  const res = await prisma.category.create({
    data: { name }
  });
  return res;
};
var getAllCategory = async () => {
  const res = await prisma.category.findMany();
  return res;
};
var deleteCategory = async (id) => {
  const mealsCount = await prisma.meal.count({
    where: { categoryId: id }
  });
  if (mealsCount > 0) {
    throw new Error("Category is in use and cannot be deleted.");
  }
  const res = await prisma.category.delete({
    where: { id }
  });
  return res;
};
var categoryService = {
  addCategory,
  getAllCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var addCategory2 = async (req, res) => {
  try {
    const { name } = req.body;
    const convert = name.trim().toLowerCase();
    if (!convert) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }
    const result = await categoryService.addCategory(convert);
    res.status(200).json({
      success: true,
      data: result,
      message: "Category added successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add category"
    });
  }
};
var getAllCategory2 = async (req, res) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      data: result,
      message: "Category fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category"
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await categoryService.deleteCategory(categoryId);
    return res.status(200).json({
      success: true,
      data: result,
      message: "Category deleted successfully"
    });
  } catch (error) {
    return res.status(409).json({
      success: false,
      message: error.message || "Failed to delete category"
    });
  }
};
var categoryController = {
  addCategory: addCategory2,
  getAllCategory: getAllCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.router.ts
var router3 = Router3();
router3.get("/get-all-category", categoryController.getAllCategory);
router3.post(
  "/add-category",
  authMiddleware_default("ADMIN" /* ADMIN */),
  categoryController.addCategory
);
router3.delete(
  "/:categoryId",
  authMiddleware_default("ADMIN" /* ADMIN */),
  categoryController.deleteCategory
);
var categoryRouter = router3;

// src/modules/order/order.router.ts
import { Router as Router4 } from "express";

// src/modules/order/order.service.ts
var createOrder = async (customerId, payload) => {
  const { providerId, deliveryAddress, items } = payload;
  if (!deliveryAddress) {
    throw new Error("Delivery address required");
  }
  if (!items.length) throw new Error("Empty order");
  items.forEach((item) => {
    if (item.quantity <= 0) {
      throw new Error("Invalid quantity");
    }
  });
  const mealIds = items.map((i) => i.mealId);
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
      providerId,
      isAvailable: true,
      provider: { isOpen: true }
    }
  });
  if (meals.length !== items.length) {
    throw new Error("Invalid meals for this provider");
  }
  const mealMap = new Map(meals.map((m) => [m.id, m]));
  const totalAmount = items.reduce((sum, item) => {
    const meal = mealMap.get(item.mealId);
    return sum + Number(meal.price) * item.quantity;
  }, 0);
  const order = await prisma.order.create({
    data: {
      customerId,
      providerId,
      deliveryAddress,
      totalAmount,
      items: {
        create: items.map((item) => {
          const meal = mealMap.get(item.mealId);
          return {
            mealName: meal.name,
            mealId: meal.id,
            quantity: item.quantity,
            price: meal.price
          };
        })
      }
    },
    include: { items: true }
  });
  return order;
};
var updateOrderStatus = async (userId, userRole, orderId, newStatus) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      provider: true
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  const currentStatus = order.status;
  let allowed = false;
  if (currentStatus === OrderStatus.DELIVERED || currentStatus === OrderStatus.CANCELLED) {
    throw new Error("Order already completed");
  }
  if (userRole === Role.CUSTOMER) {
    if (currentStatus === OrderStatus.PLACED && newStatus === OrderStatus.CANCELLED && order.customerId === userId) {
      allowed = true;
    } else {
      throw new Error("Customer cannot perform this action");
    }
  }
  if (userRole === Role.PROVIDER) {
    if (order.provider.userId !== userId) {
      throw new Error("Not your order");
    }
    if (currentStatus === OrderStatus.PLACED && (newStatus === OrderStatus.PREPARING || newStatus === OrderStatus.CANCELLED)) {
      allowed = true;
    } else if (currentStatus === OrderStatus.PREPARING && newStatus === OrderStatus.READY) {
      allowed = true;
    } else if (currentStatus === OrderStatus.READY && newStatus === OrderStatus.DELIVERED) {
      allowed = true;
    } else {
      throw new Error("Invalid status change");
    }
  }
  if (!allowed) throw new Error("Status update not allowed");
  return prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus }
  });
};
var getMyOrders = async (customerId) => {
  const result = await prisma.order.findMany({
    where: { customerId },
    select: {
      id: true,
      status: true,
      totalAmount: true,
      deliveryAddress: true,
      createdAt: true,
      updatedAt: true,
      provider: {
        select: { restaurantName: true }
      },
      items: {
        select: {
          mealName: true,
          mealId: true,
          quantity: true,
          price: true
        }
      }
    }
  });
  return result.map((singleOrder) => ({
    orderId: singleOrder.id,
    status: singleOrder.status,
    totalAmount: singleOrder.totalAmount,
    deliveryAddress: singleOrder.deliveryAddress,
    createdAt: singleOrder.createdAt,
    updatedAt: singleOrder.updatedAt,
    restaurantName: singleOrder.provider.restaurantName,
    items: singleOrder.items
  }));
};
var getProviderOrders = async (userId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const providerId = providerProfile.id;
  const result = await prisma.order.findMany({
    where: { providerId },
    include: {
      customer: {
        select: {
          name: true
        }
      }
    }
  });
  return result.map((singleOrder) => ({
    orderId: singleOrder.id,
    status: singleOrder.status,
    totalAmount: singleOrder.totalAmount,
    deliveryAddress: singleOrder.deliveryAddress,
    createdAt: singleOrder.createdAt,
    updatedAt: singleOrder.updatedAt,
    customerName: singleOrder.customer.name
  }));
};
var getAllOrder = async () => {
  const result = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          name: true
        }
      },
      provider: {
        select: {
          restaurantName: true
        }
      }
    }
  });
  return result.map((result2) => ({
    orderId: result2.id,
    orderStatus: result2.status,
    orderAmount: result2.totalAmount,
    orderDeliveryAddress: result2.deliveryAddress,
    createdAt: result2.createdAt,
    updatedAt: result2.updatedAt,
    customerName: result2.customer.name,
    restaurantName: result2.provider.restaurantName,
    customerId: result2.customerId,
    providerId: result2.providerId
  }));
};
var getOrderById = async (userId, userRole, orderId) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        select: {
          mealId: true,
          mealName: true,
          quantity: true,
          price: true
        }
      },
      provider: {
        select: {
          userId: true,
          restaurantName: true
        }
      },
      customer: {
        select: { name: true }
      }
    }
  });
  if (!result) {
    throw new Error("No data found on this order id");
  }
  if (userRole === Role.CUSTOMER) {
    if (userId !== result.customerId) {
      throw new Error("Unauthorized");
    }
  } else if (userRole === Role.PROVIDER) {
    if (userId !== result.provider.userId) {
      throw new Error("Unauthorized");
    }
  }
  return {
    orderId: result.id,
    orderStatus: result.status,
    orderAmount: result.totalAmount,
    orderDeliveryAddress: result.deliveryAddress,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    restaurantName: result.provider.restaurantName,
    customerName: result.customer.name,
    items: result.items
  };
};
var orderService = {
  createOrder,
  updateOrderStatus,
  getMyOrders,
  getProviderOrders,
  getAllOrder,
  getOrderById
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const result = await orderService.createOrder(customerId, req.body);
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const result = await orderService.updateOrderStatus(
      req.user.id,
      req.user.role,
      orderId,
      status
    );
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var getMyOrders2 = async (req, res) => {
  try {
    const result = await orderService.getMyOrders(req.user.id);
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var getProviderOrders2 = async (req, res) => {
  try {
    const result = await orderService.getProviderOrders(req.user.id);
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var getAllOrder2 = async (req, res) => {
  try {
    const result = await orderService.getAllOrder();
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const result = await orderService.getOrderById(
      userId,
      userRole,
      orderId
    );
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  updateOrderStatus: updateOrderStatus2,
  getMyOrders: getMyOrders2,
  getProviderOrders: getProviderOrders2,
  getAllOrder: getAllOrder2,
  getOrderById: getOrderById2
};

// src/modules/order/order.router.ts
var router4 = Router4();
router4.get(
  "/my-orders",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */),
  orderController.getMyOrders
);
router4.get(
  "/provider-orders",
  authMiddleware_default("PROVIDER" /* PROVIDER */),
  orderController.getProviderOrders
);
router4.get(
  "/all-order",
  authMiddleware_default("ADMIN" /* ADMIN */),
  orderController.getAllOrder
);
router4.get(
  "/details/:orderId",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  orderController.getOrderById
);
router4.post(
  "/create",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */),
  orderController.createOrder
);
router4.patch(
  "/:orderId/status",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */),
  orderController.updateOrderStatus
);
var orderRouter = router4;

// src/modules/provider/provider.router.ts
import { Router as Router5 } from "express";

// src/modules/provider/provider.service.ts
var getAllProviders = async () => {
  const result = await prisma.providerProfile.findMany({
    where: { isOpen: true },
    include: {
      user: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          orders: true,
          meals: true
        }
      }
    }
  });
  return result.map((singleProvider) => ({
    providerId: singleProvider.id,
    restaurantName: singleProvider.restaurantName,
    description: singleProvider.description,
    image: singleProvider.imageUrl,
    isOpen: singleProvider.isOpen,
    createdAt: singleProvider.createdAt,
    restauranOwner: singleProvider.user.name,
    totalOrderServed: singleProvider._count.orders,
    totalItem: singleProvider._count.meals
  }));
};
var getMenuByProvider3 = async (providerId) => {
  const providerWithMenu = await prisma.providerProfile.findUnique({
    where: { id: providerId },
    include: {
      user: {
        select: {
          name: true
        }
      },
      meals: {
        where: {
          isAvailable: true
        },
        include: {
          category: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  if (!providerWithMenu || !providerWithMenu.isOpen) {
    throw new Error("Provider not found");
  }
  return {
    providerId: providerWithMenu.id,
    restaurantName: providerWithMenu.restaurantName,
    description: providerWithMenu.description,
    imageUrl: providerWithMenu.imageUrl,
    isOpen: providerWithMenu.isOpen,
    createdAt: providerWithMenu.createdAt,
    restaurantOwner: providerWithMenu.user.name,
    menu: providerWithMenu.meals.map((meal) => ({
      id: meal.id,
      name: meal.name,
      restaurantName: providerWithMenu.restaurantName,
      description: meal.description,
      price: meal.price,
      imageUrl: meal.imageUrl,
      categoryName: meal.category.name
    }))
  };
};
var becomeProvider = async (userId, payload) => {
  return await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { role: "PROVIDER" }
    });
    const providerProfile = await tx.providerProfile.create({
      data: {
        userId,
        restaurantName: payload.restaurantName,
        description: payload.description ?? null,
        imageUrl: payload.image ?? null
      }
    });
    return {
      succes: true,
      providerProfile
    };
  });
};
var updateProviderProfile = async (userId, payload) => {
  const updateData = {};
  if (payload.restaurantName !== void 0) {
    updateData.restaurantName = payload.restaurantName;
  }
  if (payload.description !== void 0) {
    updateData.description = payload.description;
  }
  if (payload.imageUrl !== void 0) {
    updateData.imageUrl = payload.imageUrl;
  }
  if (payload.isOpen !== void 0) {
    updateData.isOpen = payload.isOpen;
  }
  const providerProfile = await prisma.providerProfile.update({
    where: { userId },
    data: updateData
  });
  return providerProfile;
};
var providerMyProfile = async (userId) => {
  const provider = await prisma.providerProfile.findFirst({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  return provider;
};
var providerService = {
  getAllProviders,
  getMenuByProvider: getMenuByProvider3,
  becomeProvider,
  updateProviderProfile,
  providerMyProfile
};

// src/modules/provider/provider.controller.ts
var getAllProviders2 = async (req, res) => {
  try {
    const result = await providerService.getAllProviders();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var getMenuByProvider4 = async (req, res) => {
  try {
    const { providerId } = req.params;
    const result = await providerService.getMenuByProvider(
      providerId
    );
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var becomeProvider2 = async (req, res) => {
  try {
    const result = await providerService.becomeProvider(
      req.user?.id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || "Failed, something went wrong!"
    });
  }
};
var updateProviderProfile2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = req.body;
    const result = await providerService.updateProviderProfile(userId, payload);
    res.json({
      success: true,
      message: "Provider profile updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update provider profile"
    });
  }
};
var providerMyProfile2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await providerService.providerMyProfile(userId);
    res.json({
      success: true,
      message: "Provider profile fetch successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get provider profile"
    });
  }
};
var providerController = {
  getAllProviders: getAllProviders2,
  getMenuByProvider: getMenuByProvider4,
  becomeProvider: becomeProvider2,
  updateProviderProfile: updateProviderProfile2,
  providerMyProfile: providerMyProfile2
};

// src/modules/provider/provider.router.ts
var router5 = Router5();
router5.get("/", providerController.getAllProviders);
router5.get(
  "/my-profile",
  authMiddleware_default("PROVIDER" /* PROVIDER */),
  providerController.providerMyProfile
);
router5.get("/:providerId", providerController.getMenuByProvider);
router5.patch(
  "/become-provider",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */),
  providerController.becomeProvider
);
router5.patch(
  "/provider-profile",
  authMiddleware_default("PROVIDER" /* PROVIDER */),
  providerController.updateProviderProfile
);
var providerRoute = router5;

// src/modules/review/review.router.ts
import { Router as Router6 } from "express";

// src/modules/review/review.service.ts
var createReview = async (userId, mealId, rating, comment) => {
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: {
        customerId: userId,
        status: "DELIVERED"
      },
      review: null
      //  not reviewed yet
    }
  });
  if (!orderItem) {
    throw new Error(
      "You have no delivered order to review or already reviewed"
    );
  }
  const review = await prisma.review.create({
    data: {
      rating,
      comment: comment ?? null,
      mealId,
      userId,
      orderItemId: orderItem.id
    }
  });
  return review;
};
var getReviewsByMeal = async (mealId) => {
  const reviews = await prisma.review.findMany({
    where: { mealId },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });
  return reviews;
};
var reviewService = {
  createReview,
  getReviewsByMeal
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mealId } = req.params;
    const { rating, comment } = req.body;
    const result = await reviewService.createReview(
      userId,
      mealId,
      rating,
      comment
    );
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed"
    });
  }
};
var getReviewsByMeal2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    const reviews = await reviewService.getReviewsByMeal(mealId);
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch reviews"
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getReviewsByMeal: getReviewsByMeal2
};

// src/modules/review/review.router.ts
var router6 = Router6();
router6.get("/meal/:mealId", reviewController.getReviewsByMeal);
router6.post(
  "/:mealId",
  authMiddleware_default("CUSTOMER" /* CUSTOMER */),
  reviewController.createReview
);
var reviewRouter = router6;

// src/modules/analytics/analytics.router.ts
import { Router as Router7 } from "express";

// src/modules/analytics/analytics.service.ts
var getAdminAnalytics = async () => {
  const totalUsers = await prisma.user.count();
  const totalProviders = await prisma.providerProfile.count();
  const totalMeals = await prisma.meal.count();
  const totalOrders = await prisma.order.count();
  const totalRevenue = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { status: "DELIVERED" }
  });
  return {
    totalUser: totalUsers,
    totalRestaurant: totalProviders,
    totalItem: totalMeals,
    totalOrders,
    totalRevenue: totalRevenue._sum.totalAmount
  };
};
var getProviderAnalytics = async (userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      userId
    }
  });
  const providerId = provider?.id;
  if (!providerId) {
    throw new Error("No provider found!");
  }
  const totalOrders = await prisma.order.count({
    where: { providerId }
  });
  const totalRevenue = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: {
      providerId,
      status: "DELIVERED"
    }
  });
  const totalMenuItems = await prisma.meal.count({
    where: {
      providerId,
      isDeleted: false
    }
  });
  const avgRating = await prisma.review.aggregate({
    _avg: { rating: true },
    where: {
      meal: {
        providerId
      }
    }
  });
  const uniqueCustomers = await prisma.order.groupBy({
    by: ["customerId"],
    where: { providerId },
    _count: true
  });
  return {
    totalOrders,
    totalRevenue: Number(totalRevenue._sum.totalAmount) || 0,
    totalMenuItems,
    averageRating: Number(avgRating._avg.rating) || 0,
    totalCustomersServed: uniqueCustomers.length
  };
};
var analyticsService = {
  getAdminAnalytics,
  getProviderAnalytics
};

// src/modules/analytics/analytics.controller.ts
var getAdminAnalytics2 = async (req, res) => {
  try {
    const result = await analyticsService.getAdminAnalytics();
    res.status(200).json({
      success: true,
      data: result,
      message: "Data fetched successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get analytics"
    });
  }
};
var getProviderAnalytics2 = async (req, res) => {
  try {
    const result = await analyticsService.getProviderAnalytics(req.user.id);
    res.status(200).json({
      success: true,
      data: result,
      message: "Data fetched successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to get analytics"
    });
  }
};
var analyticsController = {
  getAdminAnalytics: getAdminAnalytics2,
  getProviderAnalytics: getProviderAnalytics2
};

// src/modules/analytics/analytics.router.ts
var router7 = Router7();
router7.get("/admin", authMiddleware_default("ADMIN" /* ADMIN */), analyticsController.getAdminAnalytics);
router7.get("/provider", authMiddleware_default("PROVIDER" /* PROVIDER */), analyticsController.getProviderAnalytics);
var analyticsRouter = router7;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/user", userRouter);
app.use("/provider", providerRoute);
app.use("/category", categoryRouter);
app.use("/menu", menuRouter);
app.use("/order", orderRouter);
app.use("/review", reviewRouter);
app.use("/analytics", analyticsRouter);
app.get("/", (req, res) => {
  res.send("Hello  World");
});
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");
    app_default.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
  } catch (error) {
    console.log("An error occured ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
