import { mount } from '@vue/test-utils'
import EventCard from './EventCard.vue'

describe('EventCard', () => {
  it("renders the event's data successfully", () => {
    const event = {
      id: 1,
      time: '12:00PM',
      date: 'September 29th, 2022',
      title: 'Coaching Little League'
    }

    const wrapper = mount(EventCard, {
      propsData: {
        event
      }
    })

    const wrapperHtml = wrapper.html()
    expect(wrapperHtml).toContain(event.time)
    expect(wrapperHtml).toContain(event.date)
    expect(wrapperHtml).toContain(event.title)
  })
})
