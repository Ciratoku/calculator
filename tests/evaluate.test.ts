import calculate from "../src/util/evaluate";

describe("evaluate function", () => {
  it("23+5=28", () => {
    expect(calculate("23+5")).toBe(23 + 5);
  });
  it("(13+4)*2=34", () => {
    expect(calculate("(13+4)*2")).toBe((13 + 4) * 2);
  });
  it("(13%4)-2*(13/10*(14+5))=-48.4", () => {
    expect(calculate("(13%4)-2*(13/10*(14+5))")).toBe(
      ((13 % 4) - 2 * ((13 / 10) * (14 + 5))).toFixed(2)
    );
  });
  it("√4=2", () => {
    expect(calculate("√4")).toBe(2);
  });
  it("√(4*4)+5*(3/2)=11.5", () => {
    expect(calculate("√(4*4)+5*(3/2)")).toBe(
      (Math.sqrt(4 * 4) + 5 * (3 / 2)).toFixed(2)
    );
  });
});
