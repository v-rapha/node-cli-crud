const { deepStrictEqual, ok } = require('assert');
const Database = require('./database');

const MOCK_DEV_REGISTER = {
  id: 1,
  name: 'v-rapha',
  hole: 'back-end',
  level: 'junior',
};

describe('Developer manipulation suite', function () {
  this.beforeAll(async () => {
    await Database.create(MOCK_DEV_REGISTER);
  });

  it('should search for a developer by id using files', async () => {
    const expected = MOCK_DEV_REGISTER;
    const [result] = await Database.read(expected.id);

    deepStrictEqual(result, expected);
  });

  it('should register a developer using files', async () => {
    const expected = MOCK_DEV_REGISTER;
    const result = await Database.create(MOCK_DEV_REGISTER);
    const [current] = await Database.read(MOCK_DEV_REGISTER.id);

    deepStrictEqual(current, expected);
    ok(result === true);
  });
});
