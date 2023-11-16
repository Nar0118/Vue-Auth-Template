import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import helloWorld from '../helloWorld.vue'

describe('helloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(helloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
