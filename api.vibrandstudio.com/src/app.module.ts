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
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GqlAuthGuard } from './auth/gql-auth.guard';
import { AccessGuard } from './auth/access.guard'; // ADD THIS
import { MailModule } from './mail/mail.module';

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
    UploadModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard, // global authentication - runs first
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard, // global access level check - runs second
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
 * - Two global guards are applied in order:
 *   1. GqlAuthGuard: Validates JWT tokens and attaches user to request
 *   2. AccessGuard: Checks if user has sufficient access level for protected routes
 * - Routes can use @Public() to bypass both guards, or @Access(level) to require
 *   a minimum access level.
 */
export class AppModule { }