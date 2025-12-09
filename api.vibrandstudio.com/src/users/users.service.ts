import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import * as bcrypt from 'bcryptjs';

/**
 * Handles user persistence, hashing, and lookups.
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a user, hashing password when provided.
   */
  async create(dto: CreateUserDTO) {
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return this.prisma.user.create({ data, include: { employee: true, company: true } });
  }

  /**
   * Retrieves all users with related entities.
   */
  findAll() {
    return this.prisma.user.findMany({ include: { employee: true, company: true } });
  }

  /**
   * Finds a user by id or throws when missing.
   */
  async findOne(id: number) {
    const found = await this.prisma.user.findUnique({ where: { id }, include: { employee: true, company: true } });
    if (!found) throw new NotFoundException(`User ${id} not found`);
    return found;
  }

  /**
   * Looks up a user by email.
   */
  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email }, include: { employee: true, company: true } });
  }

  /**
   * Updates a user, hashing password if provided.
   */
  async update(id: number, dto: UpdateUserDTO) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return this.prisma.user.update({ where: { id }, data, include: { employee: true, company: true } });
  }

  /**
   * Changes password for a user.
   */
  async changePassword(id: number, newPassword: string) {
    await this.findOne(id);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
      include: { employee: true, company: true },
    });
  }

  /**
   * Removes a user and returns a confirmation payload.
   */
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { deleted: true, id };
  }
}

