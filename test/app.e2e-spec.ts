import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(+process.env.PORT || 4444);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('Sign up', () => {
      it.todo('should sign up');
    });

    describe('Sign in', () => {
      it.todo('should sign in');
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it.todo('should get me');
    });

    describe('Edit user', () => {
      it.todo('should edit user');
    });
  });

  describe('Bookmark', () => {
    describe('Create bookmark', () => {
      it.todo('should create bookmark');
    });

    describe('Get bookmarks', () => {
      it.todo('should get bookmarks');
    });

    describe('Get bookmark by ID', () => {
      it.todo('should get bookmark by ID');
    });

    describe('Edit bookmark', () => {
      it.todo('should edit bookmark');
    });

    describe('Delete bookmark', () => {
      it.todo('should delete bookmark');
    });
  });
});
