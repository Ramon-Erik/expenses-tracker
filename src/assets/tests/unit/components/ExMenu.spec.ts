import ExMenu from '@/components/ExMenu.vue'
import { mount } from '@vue/test-utils'

describe('Menu', () => {
  it('Should render a unordenated list', async () => {
    const mockRoute = {
      path: '/',
    }
    const mockRouter = {
      push: jest.fn(),
    }

    const wrapper = mount(ExMenu, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    })

  
    expect(wrapper.html()).toContain('ul')
  })
})
