import { prisma } from "../../lib/prisma";
interface BecomeProviderPayload {
  restaurantName: string;
  image?: string;
  description?: string;
}

export interface UpdateProviderProfilePayload {
  restaurantName?: string;
  description?: string | null;
  imageUrl?: string | null;
  isOpen?: boolean;
}

const getAllProviders = async () => {
  const result = await prisma.providerProfile.findMany({
    where: { isOpen: true },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          orders: true,
          meals: true,
        },
      },
    },
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
    totalItem: singleProvider._count.meals,
  }));
};

const getMenuByProvider = async (providerId: string) => {
  const providerWithMenu = await prisma.providerProfile.findUnique({
    where: { id: providerId },
    include: {
      user: {
        select: {
          name: true,
        },
      },

      meals: {
        where: {
          isAvailable: true,
        },

        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
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
      categoryName: meal.category.name,
    })),
  };
};

// become provide from customer
const becomeProvider = async (
  userId: string,
  payload: BecomeProviderPayload,
) => {
  return await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { role: "PROVIDER" },
    });

    const providerProfile = await tx.providerProfile.create({
      data: {
        userId,
        restaurantName: payload.restaurantName,
        description: payload.description ?? null,
        imageUrl: payload.image ?? null,
      },
    });

    return {
      succes: true,
      providerProfile,
    };
  });
};

const updateProviderProfile = async (
  userId: string,
  payload: UpdateProviderProfilePayload,
) => {
  const updateData: any = {};

  if (payload.restaurantName !== undefined) {
    updateData.restaurantName = payload.restaurantName;
  }
  if (payload.description !== undefined) {
    updateData.description = payload.description;
  }
  if (payload.imageUrl !== undefined) {
    updateData.imageUrl = payload.imageUrl;
  }
  if (payload.isOpen !== undefined) {
    updateData.isOpen = payload.isOpen;
  }

  const providerProfile = await prisma.providerProfile.update({
    where: { userId },
    data: updateData,
  });

  return providerProfile;
};

const providerMyProfile = async (userId: string) => {
  const provider = await prisma.providerProfile.findFirst({
    where: { userId: userId },
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  return provider;
};

export const providerService = {
  getAllProviders,
  getMenuByProvider,
  becomeProvider,
  updateProviderProfile,
  providerMyProfile,
};
