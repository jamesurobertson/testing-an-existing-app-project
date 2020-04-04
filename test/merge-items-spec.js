const { expect } = require('chai')
const { mergeItems } = require('../merge-items')
describe('The mergeItems function', () => {
  const template = `
  <table>
  <tbody>
    {{#each items}}
      <tr>
        <td>{{ add @index 1 }}</td>
        <td>{{ title }}</td>
        <td>{{ category }}</td>
        <td>
          {{#if isComplete}}
          {{else}}
            <form method="POST" action="/items/{{ add @index 1 }}">
              <button class="pure-button">Complete</button>
            </form>
          {{/if}}
        </td>
      </tr>
    {{/each}}
  </tbody>
</table>
  `
  it('should return no <tr>s and no <td>s for no items', () => {
    const items = []
    const result = mergeItems(template, items)
    expect(result).to.include('<table>')
    expect(result).to.include('</table>')
    expect(result).to.include('<tbody>')
    expect(result).to.include('</tbody>')
    expect(result).to.not.include('<tr>')
    expect(result).to.not.include('</tr>')
    expect(result).to.not.include('<td>')
    expect(result).to.not.include('</td>')
    expect(result).to.not.include('<!-- Content here -->')
  })

  it('should return a single <tr>, four <td>s, and a <form> for one uncompleted item', () => {
    const items = [{ category: 'gotowork', title: 'work' }]
    const result = mergeItems(template, items)

    expect(result).to.include('<table>')
    expect(result).to.include('</table>')
    expect(result).to.include('<tbody>')
    expect(result).to.include('</tbody>')
    expect(result).to.include('<tr>')
    expect(result).to.include('</tr>')
    expect(result).to.include('<td>1</td>')
    expect(result).to.include('<td>gotowork</td>')
    expect(result).to.include('<td>work</td>')
    expect(result).to.include('<form method="POST" action="/items/1">')
    expect(result).to.not.include('<!-- Content here -->')
  })

  it('should return a single <tr>, four <td>s, and no <form> for one completed item', () => {
    const items = [{ category: 'gotowork', title: 'work', isComplete: true }]
    const result = mergeItems(template, items)

    expect(result).to.include('<table>')
    expect(result).to.include('</table>')
    expect(result).to.include('<tbody>')
    expect(result).to.include('</tbody>')
    expect(result).to.include('<tr>')
    expect(result).to.include('</tr>')
    expect(result).to.include('<td>1</td>')
    expect(result).to.include('<td>gotowork</td>')
    expect(result).to.include('<td>work</td>')
    expect(result).to.not.include('<form method="POST" action="/items/1">')
    expect(result).to.not.include('<!-- Content here -->')
  })

  it('should return three <tr>s for three items', () => {
    const items = [{ category: 'gotowork', title: 'work', isComplete: true },
      { category: 'gotowork', title: 'work' },
      { category: 'gotowork', title: 'work', isComplete: true }]
    const result = mergeItems(template, items)

    expect(result).to.include('<td>1</td>')
    expect(result).to.not.include('<form method="POST" action="/items/1">')
    expect(result).to.include('<td>2</td>')
    expect(result).to.include('<form method="POST" action="/items/2">')
    expect(result).to.include('<td>3</td>')
    expect(result).to.not.include('<form method="POST" action="/items/3">')
  })
})
