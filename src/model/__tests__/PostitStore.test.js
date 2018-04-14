import chai from 'chai';
import PostitStore from '../PostitStore';

chai.should();

describe('PostitStore', () => {
  it('인스턴스를 정상적으로 생성한다.', () => {
    // given
    // when
    const instance = new PostitStore({});

    // then
    (instance instanceof PostitStore).should.be.true;
  });

  it('포스트잇을 생성하여 목록에 추가한다.', () => {
    // given
    const instance = new PostitStore({});

    // when
    instance.create({});
    instance.create({});
    instance.create({});
    instance.create({});
    instance.create({});

    // then
    instance._list.length.should.be.eql(5);
  });

  it('특정 포스트잇이 맨 앞으로 오도록 정렬할 수 있다.', () => {
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

    instance.toFront(postit.id, (sortedIds) => {
      frontPostidId = sortedIds.pop();
    });

    // then
    frontPostidId.should.be.eql(postit.id);
  });
});