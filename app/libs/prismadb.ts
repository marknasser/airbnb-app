import { PrismaClient } from "@prisma/client";

declare global {
  //global declaration of prisma to work our code
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient(); //client is globalThis.prisma or it creates new prisma client
if (process.env.NODE_ENV != "production") {
  // id we are not in prodution we set globalthis.prisma to newly created prisma client
  globalThis.prisma = client;

  //we create this because next reloading can create alote of new prismaclients instanses giving us a worning in a termnal
}
export default client;
