const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
    <div>
      <ul>
        {{#each categories}}
          <li>{{ this }}</li>
        {{/each}}
      </ul>
    </div>
  `;

    it("should return no <li>s for no categories", () => {
        // arrange
        const arr1 = [];
        //act
        const result = mergeCategories(template, arr1, 'li')
        //assert
        expect(result).to.include('<div>')
        expect(result).to.include('</div>')
        expect(result).to.include('<ul>')
        expect(result).to.include('</ul>')
        expect(result).to.not.include('<li>')
        expect(result).to.not.include('</li>')
        expect(result).to.not.include('<!-- Content here -->')
    });

    it("should return a single <li> for one category", () => {
        const arr1 = ['fun'];
        //act
        const result = mergeCategories(template, arr1, 'li')
        //assert
        expect(result).to.include('<div>')
        expect(result).to.include('</div>')
        expect(result).to.include('<ul>')
        expect(result).to.include('</ul>')
        expect(result).to.include('<li>fun</li>');
        expect(result).to.not.include('<!-- Content here -->')
    });

    it("should return an <li> for each category", () => {
       // arrange
       const arr1 = ['fun', 'work', 'dog'];
       //act
       const result = mergeCategories(template, arr1, 'li')
       //assert
        expect(result).to.include('<div>')
        expect(result).to.include('</div>')
        expect(result).to.include('<ul>')
        expect(result).to.include('</ul>')
        expect(result).to.include('<li>fun</li>');
        expect(result).to.include('<li>work</li>');
        expect(result).to.include('<li>dog</li>');
        expect(result).to.not.include('<!-- Content here -->')
    });
  });

  context("using <option> tags", () => {
    const template = `
    <div>
      <select>
        {{#each categories}}
          <option>{{ this }}</option>
        {{/each}}
      </select>
    </div>
  `

    it("should return no <option>s for no categories", () => {
      // arrange
      const arr1 = [];
      //act
      const result = mergeCategories(template, arr1, 'option')
      //assert
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')
      expect(result).to.not.include('<option>')
      expect(result).to.not.include('</option>')
      expect(result).to.not.include('<!-- Content here -->')
    });

    it("should return a single <option> for one category", () => {
      const arr1 = ['fun'];
      //act
      const result = mergeCategories(template, arr1, 'option')
      //assert
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')
      expect(result).to.include('<option>fun</option>')
      expect(result).to.not.include('<!-- Content here -->')
    });

    it("should return an <option> for each category", () => {
      // arrange
      const arr1 = ['fun', 'work', 'dog'];
      //act
      const result = mergeCategories(template, arr1, 'option')
      //assert
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')
      expect(result).to.include('<option>fun</option>')
      expect(result).to.include('<option>work</option>')
      expect(result).to.include('<option>dog</option>')
      expect(result).to.not.include('<!-- Content here -->')
    });
  });
});
