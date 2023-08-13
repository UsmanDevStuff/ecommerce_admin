import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    const orders = await prismadb.order.findUnique({
      where: {
        id: params.orderId
      }
    });
  
    return NextResponse.json(orders);
  } catch (error) {
    console.log('[ORDERS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.orderId) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const orders = await prismadb.order.delete({
      where: {
        id: params.orderId
      }
    });
  
    return NextResponse.json(orders);
  } catch (error) {
    console.log('[ORDERS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { orderStatus } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!orderStatus) {
      return new NextResponse("Order Status is required", { status: 400 });
    }

    // if (!value) {
    //   return new NextResponse("Value is required", { status: 400 });
    // }


    if (!params.orderId) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const orders = await prismadb.order.update({
      where: {
        id: params.orderId
      },
      data: {
        orderStatus,
      }
    });
  
    return NextResponse.json(orders);
  } catch (error) {
    console.log('[ORDERS_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
