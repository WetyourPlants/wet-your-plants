import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//import file you want to test
import MainListItems from '../client/components/MainListItems.jsx'

configure({ adapter: new Adapter() });

describe('SideBar Dialogues', () => {
  describe('Delete Dialogue', () => {

    let wrapper;
    let state;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((state) => [state, setState]);

    beforeAll(() => {
      wrapper = shallow(<MainListItems />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Clicking the delete button calls a function that results in a useState', () => {
      // console.log(wrapper.debug());
      const deletebutton = wrapper.find('#opendeletebutton');
      deletebutton.simulate('click')
      console.log(state)
      expect(useStateSpy).toHaveBeenCalled();
    });
  });
});
