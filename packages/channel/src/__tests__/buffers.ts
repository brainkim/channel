import { DroppingBuffer, FixedBuffer, SlidingBuffer } from "../index";
import { InvalidBufferCapacityError } from "../errors";

describe("ChannelBuffer", () => {
  test("FixedBuffer", () => {
    const buffer = new FixedBuffer<number>(2);
    expect([buffer.empty, buffer.full]).toEqual([true, false]);
    buffer.add(1);
    expect([buffer.empty, buffer.full]).toEqual([false, false]);
    buffer.add(2);
    expect([buffer.empty, buffer.full]).toEqual([false, true]);
    expect(() => buffer.add(3)).toThrow();
    expect(buffer.remove()).toEqual(1);
    expect([buffer.empty, buffer.full]).toEqual([false, false]);
    expect(buffer.remove()).toEqual(2);
    expect([buffer.empty, buffer.full]).toEqual([true, false]);
    expect(() => buffer.remove()).toThrow();
    expect(() => new FixedBuffer<number>(-1)).toThrowError(
      InvalidBufferCapacityError
    );
  });

  test("SlidingBuffer", () => {
    const buffer = new SlidingBuffer<number>(2);
    expect([buffer.empty, buffer.full]).toEqual([true, false]);
    buffer.add(1);
    buffer.add(2);
    buffer.add(3);
    buffer.add(4);
    buffer.add(5);
    expect([buffer.empty, buffer.full]).toEqual([false, false]);
    expect(buffer.remove()).toEqual(4);
    expect(buffer.remove()).toEqual(5);
    expect([buffer.empty, buffer.full]).toEqual([true, false]);
    expect(() => buffer.remove()).toThrow();
    expect(() => new SlidingBuffer<number>(-1)).toThrowError(
      InvalidBufferCapacityError
    );
  });

  test("DroppingBuffer", () => {
    const buffer = new DroppingBuffer<number>(2);
    expect([buffer.empty, buffer.full]).toEqual([true, false]);
    buffer.add(1);
    buffer.add(2);
    buffer.add(3);
    buffer.add(4);
    buffer.add(5);
    expect([buffer.empty, buffer.full]).toEqual([false, false]);
    expect(buffer.remove()).toEqual(1);
    expect(buffer.remove()).toEqual(2);
    expect([buffer.empty, buffer.full]).toEqual([true, false]);
    expect(() => buffer.remove()).toThrow();
    expect(() => new DroppingBuffer<number>(-1)).toThrowError(
      InvalidBufferCapacityError
    );
  });
});
