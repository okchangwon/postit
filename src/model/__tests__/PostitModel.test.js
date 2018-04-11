import PostitModel from '../PostitModel';
import chai from 'chai';

chai.should();

describe('PostitModel', () => {
  it('인스턴스를 정상적으로 생성한다.', () => {
    // given
    // when
    const instance = new PostitModel();

    // then
    (instance instanceof PostitModel).should.be.true;
  });
});