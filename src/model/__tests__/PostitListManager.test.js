import PostitListManager from '../PostitListManager';
import chai from 'chai';

chai.should();

describe('PostitListManager', () => {
  it('인스턴스를 정상적으로 생성한다.', () => {
    // given
    // when
    const instance = new PostitListManager();

    // then
    (instance instanceof PostitListManager).should.be.true;
  });
});