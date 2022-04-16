import PostitStore from "../PostitStore";

describe("PostitStore", () => {
  it("인스턴스를 정상적으로 생성한다.", () => {
    // given
    // when
    const instance = new PostitStore({});

    // then
    expect(instance instanceof PostitStore).toBe(true);
  });

  it("포스트잇을 생성하여 목록에 추가한다.", () => {
    // given
    const instance = new PostitStore({});

    // when
    instance.create({});
    instance.create({});
    instance.create({});
    instance.create({});
    instance.create({});

    // then
    expect(instance._list.length).toBe(5);
  });

  it("특정 포스트잇이 맨 앞으로 오도록 정렬할 수 있다.", () => {
    // given
    const instance = new PostitStore({});
    let postit;

    instance.create({});
    instance.create({}, createdPostit => {
      postit = createdPostit;
    });
    instance.create({});

    // when
    let frontPostidId;

    instance.toFront(postit.id, sortedIds => {
      frontPostidId = sortedIds.pop();
    });

    // then
    expect(frontPostidId).toBe(postit.id);
  });
});
