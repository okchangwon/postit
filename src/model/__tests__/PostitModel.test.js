import PostitModel from "../PostitModel";

describe("PostitModel", () => {
  it("인스턴스를 정상적으로 생성한다.", () => {
    // given
    // when
    const instance = new PostitModel({});

    // then
    expect(instance instanceof PostitModel).toBe(true);
  });

  it("포스트잇을 기본 크기로 리셋할 수 있다.", () => {
    // given
    // when
    const instance = new PostitModel({
      width: 600,
      height: 500,
    });

    instance.resetDefaultSize();

    // then
    expect(instance.width).toBe(250);
    expect(instance.height).toBe(200);
  });
});
