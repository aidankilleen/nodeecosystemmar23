import { MyJwtGuard } from './my-jwt.guard';

describe('MyJwtGuard', () => {
  it('should be defined', () => {
    expect(new MyJwtGuard()).toBeDefined();
  });
});
