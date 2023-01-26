import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('/')
  createBookmark(@User('id') userID: number, @Body() dto: CreateBookmarkDTO) {
    return this.bookmarkService.createBookmark(userID, dto);
  }

  @Get('/')
  getBookmarks(@User('id') userID: number) {
    return this.bookmarkService.getBookmarks(userID);
  }

  @Get('/:id')
  getBookmarkById(
    @User('id') userID: number,
    @Param('id', ParseIntPipe) bookmarkID: number,
  ) {
    return this.bookmarkService.getBookmarkById(userID, bookmarkID);
  }

  @Patch('/:id')
  editBookmark(
    @User('id') userID: number,
    @Param('id', ParseIntPipe) bookmarkID: number,
    @Body() dto: EditBookmarkDTO,
  ) {
    return this.bookmarkService.editBookmark(userID, bookmarkID, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBookmark(
    @User('id') userID: number,
    @Param('id', ParseIntPipe) bookmarkID: number,
  ) {
    return this.bookmarkService.deleteBookmark(userID, bookmarkID);
  }
}
