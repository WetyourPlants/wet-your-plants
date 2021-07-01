import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//import file you want to test
import MainListItems from '../client/components/MainListItems.jsx'

Enzyme.configure({ adapter: new Adapter() });

describe('SideBar Dialogues', () => {
  describe('Delete Dialogue', () => {

    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeAll(() => {
      wrapper = shallow(<MainListItems />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('OpenDelete state is changed to true when clicking "Delete A Plant"', () => {
      // console.log(wrapper.debug());
      const click = wrapper.find('#opendeletebutton').props().onClick();
      click.simulate('click')
      expect(setState).toHaveBeenCalled();
    });
  });
});
