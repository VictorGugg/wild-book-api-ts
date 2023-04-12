import dataSource from "./utils";

// import { Wilder } from "./entity/Wilder";
// import { Skill } from "./entity/Skill";

import { Wilder } from "./entity/Wilder";

import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Wilder {
    name: String
    city: String
  }

  type Query {
    wilder: [Wilder]
  }
`;

const wilders = async (): Promise<Wilder[]> => {
  return await dataSource.getRepository(Wilder).find();
};

const resolvers = {
  Query: {
    getWilders: async () => await wilders(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const { url } = await server.listen();
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server started on ${url}`);
};

void start();
// The `listen` method launches a web server.
