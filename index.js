import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getAllProject: async () => {
      const projectData = await prisma.projects.findMany({});
      return projectData;
    },

    getAllCertificate: async () => {
      const certificateData = await prisma.certificates.findMany({});
      return certificateData;
    },
    getAllEducation: async () => {
      const educationData = await prisma.educations.findMany({});
      return educationData;
    },
    getAllExperiences: async () => {
      const experienceData = await prisma.experiences.findMany({});
      return experienceData;
    }
  }
};

export const typeDefs = gql`
  type ProjectResponseProperties {
    id: String
    image: String
    description: String
    linkDemo: String
    linkRepo: String
    title: String
  }

  type CertificateProperties {
    id: String
    title: String
    company: String
    time: String
  }

  type EducationProperties {
    id: String
    title: String
    time: String
    description: String
  }

  type Query {
    getAllProject: [ProjectResponseProperties!]
    getAllCertificate: [CertificateProperties!]
    getAllEducation: [EducationProperties!]
    getAllExperiences: [EducationProperties!]
  }
`;
const app = express();
app.use(
  cors({
    origin: "*"
  })
);

const server = new ApolloServer({ typeDefs, resolvers });

const startingServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startingServer();
