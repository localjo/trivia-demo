import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Intro from '../Intro';

configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => {
    return [{ question: 'Test', is_correct: true }];
  },
}));

jest.mock('react-router', () => ({
  useParams: () => {
    return { questionIndex: '1' };
  },
  useHistory: () => {},
}));

describe('<Intro />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const wrapper = shallow(<Intro />);
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const wrapper = shallow(<Intro />);
    expect(wrapper).toMatchSnapshot();
  });
});
