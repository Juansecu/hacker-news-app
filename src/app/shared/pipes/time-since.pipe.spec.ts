import { TimeSincePipe } from './time-since.pipe';

describe('TimeSincePipe', () => {
  let pipe: TimeSincePipe;

  beforeEach(() => {
    pipe = new TimeSincePipe();
  });

  it('should be instantiated', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be One year ago', () => {
    expect(pipe.transform('2018-01-01T00:00:00.000Z')).toEqual('3 years ago');
  });
});
