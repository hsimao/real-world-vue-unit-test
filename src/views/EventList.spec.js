import EventList from './EventList.vue'
import { mount } from '@vue/test-utils'
import { createStore } from '@/store'
import router from '@/router'
import { events as mockEvents } from '../../db.json'

function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || {}

  return mount(EventList, {
    global: {
      plugins: [createStore(config.plugins.store), router]
    },
    ...config.mountOptions
  })
}

// function factory(args) {
//   return mount(EventList, args)
// }

let wrapper

beforeEach(() => {
  wrapper = mountEventList()
})

describe('EventList', () => {
  it('should render the events', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('is rendered with the correct text', () => {
    const title = wrapper.find('[data-test="event-list-title"]')

    expect(title.exists()).toBeTruthy()
    expect(title.text()).toContain('Events for Good')
  })

  it('are rendered in a list with necessary information', async () => {
    wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({ events: mockEvents })
        }
      }
    })
    const events = await wrapper.findAll('[data-test="event-list-item"]')

    expect(events).toHaveLength(mockEvents.length)

    events.forEach((event, i) => {
      const eventText = event.text()
      expect(eventText).toContain(mockEvents[i].date)
      expect(eventText).toContain(mockEvents[i].title)
    })
  })
})
