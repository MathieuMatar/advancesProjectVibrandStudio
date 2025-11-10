import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServicesModule } from './services/services.module';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { ProjectsModule } from './projects/projects.module';
import { MilestonesModule } from './milestones/milestones.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GqlAuthGuard } from './auth/gql-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      // forward request to GraphQL context so guards can access headers
      context: ({ req }) => ({ req }),
    }),
    ServicesModule,
    ClientsModule,
    UsersModule,
    AuthModule,
    EmployeesModule,
    ProjectsModule,
    MilestonesModule,
    TasksModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard, // global autentication
    },
  ],
})
/**
 * The root application module for the NestJS app.
 *
 * This module wires together configuration, Prisma, GraphQL and all feature modules
 * (services, clients, users, auth, employees, projects, milestones, tasks).
 *
 * Notes:
 * - GraphQLModule is configured to forward the incoming HTTP request into the
 *   GraphQL context so guards (like `GqlAuthGuard`) can access headers and request
 *   user information.
 * - A global authentication guard is provided via `APP_GUARD` to protect resolvers
 *   by default.
 */
export class AppModule { }
