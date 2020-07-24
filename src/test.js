const { deepStrictEqual } = require('assert');
const Database = require('./database');

const MOCK_DEV_REGISTER = {
  id: 1,
  name: 'v-rapha',
  hole: 'back-end',
  level: 'junior',
}

describe('Developer manipulation suite', function () {
  it('should search for a developer by id using files', async () => {
    const expected = MOCK_DEV_REGISTER;
    const [result] = await Database.read(expected.id);

    deepStrictEqual(result, expected);
  });

  // it('should register a developer using files', () => {
  //   deepStrictEqual(2, 2);
  // });
});
