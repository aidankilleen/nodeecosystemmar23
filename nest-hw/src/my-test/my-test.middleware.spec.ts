import { MyTestMiddleware } from './my-test.middleware';

describe('MyTestMiddleware', () => {
  it('should be defined', () => {
    expect(new MyTestMiddleware()).toBeDefined();
  });
});
