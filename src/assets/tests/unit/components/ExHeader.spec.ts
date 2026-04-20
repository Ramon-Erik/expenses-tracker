import ExHeader from "@/components/ExHeader.vue";
import { describe, expect, it } from "@jest/globals";
import { mount } from '@vue/test-utils'

describe('Header', () => {
  it('Should render a "Minha Carteira"', () => {
    const wrapper = mount(ExHeader)
    expect(wrapper.text()).toBe('Minha Carteira')
  })
})
