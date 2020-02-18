import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionCard from '../QuestionCard';

configure({ adapter: new Adapter() });

const props = { question: 'Test', answerQuestion: () => {} };

describe('<QuestionCard />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const wrapper = shallow(<QuestionCard {...props} />);
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const wrapper = shallow(<QuestionCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
