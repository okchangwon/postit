import chai from 'chai';
import PostitModel from '../PostitModel';

chai.should();

describe('PostitModel', () => {
  it('인스턴스를 정상적으로 생성한다.', () => {
    // given
    // when
    const instance = new PostitModel({});

    // then
    (instance instanceof PostitModel).should.be.true;
  });

  it('포스트잇을 기본 크기로 리셋할 수 있다.', () => {
    // given
    // when
    const instance = new PostitModel({
      width: 600,
      height: 500
    });

    instance.resetDefaultSize();

    // then
    instance.width.should.be.eql(250);
    instance.height.should.be.eql(200);
  });
});