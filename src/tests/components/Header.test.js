import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Header from '../../components/Header'
import { shallow } from 'enzyme'

test('should render Header correctly', () => {
    // const renderer = new ReactShallowRenderer()
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot()

    const wrapper  = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()


    // const h1 = wrapper.find('h1')
    // expect(h1.length).toBe(1)
    // expect(h1.text()).toBe('Expensify')
    
})
