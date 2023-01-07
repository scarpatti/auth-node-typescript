import { Cart, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class CartRepository {
  public static async findAll(request: any): Promise<Cart[]  | null> {
    return await request.paginate(
      prismaClient.cart,
      {
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async find(
    cartId: number
  ): Promise<Cart | null> {
    return await prismaClient.cart
      .findUnique({
        where: { id: cartId },
      });
  }

  public static async store(data: Prisma.CartCreateInput): Promise<Cart> {
    return await prismaClient.cart
      .create({ data });
  }

  public static async update(id: number, data: Prisma.CartUpdateInput): Promise<Cart> {
    return await prismaClient.cart
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
