import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import ProgressBar, {
  IProgressBarProps,
  IProgressBarState,
} from '../components/ProgressBar'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ProgressBar Testing', () => {
  const mockProps: IProgressBarProps = {
    max: 80,
    onEnd: jest.fn(),
    time: 2,
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount<
      React.Component,
      IProgressBarProps,
      IProgressBarState
    >(<ProgressBar {...mockProps} />)
    expect(wrapper.state().progress).toBeLessThanOrEqual(wrapper.props().max)
  })

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<ProgressBar {...mockProps} />)
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
