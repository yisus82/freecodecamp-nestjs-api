import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  createBookmark(userID: number, dto: CreateBookmarkDTO) {
    return this.prisma.bookmark.create({
      data: { ...dto, userId: userID },
      select: {
        id: true,
        title: true,
        description: true,
        link: true,
      },
    });
  }

  getBookmarks(userID: number) {
    return this.prisma.bookmark.findMany({
      where: { userId: userID },
    });
  }

  async getBookmarkById(userID: number, bookmarkID: number) {
    // Find the bookmark
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkID,
      },
    });

    // Check if user owns the bookmark
    if (bookmark?.userId !== userID)
      throw new ForbiddenException('Access to resources denied');

    return bookmark;
  }

  async editBookmark(userID: number, bookmarkID: number, dto: EditBookmarkDTO) {
    // Find the bookmark
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkID,
      },
    });

    // Check if user owns the bookmark
    if (bookmark?.userId !== userID)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkID,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmark(userID: number, bookmarkID: number) {
    // Find the bookmark
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkID,
      },
    });

    // Check if user owns the bookmark
    if (bookmark?.userId !== userID)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkID,
      },
    });
  }
}
