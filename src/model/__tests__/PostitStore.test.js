import PostitStore from '../PostitStore';
import chai from 'chai';

chai.should();

describe('PostitStore', () => {
  it('인스턴스를 정상적으로 생성한다.', () => {
    // given
    // when
    const instance = new PostitStore();

    // then
    (instance instanceof PostitStore).should.be.true;
  });
});