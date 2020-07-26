const { deepStrictEqual, ok } = require('assert');
const Database = require('./database');

const MOCK_DEV_REGISTER = {
  id: 1,
  name: 'v-rapha',
  role: 'back-end',
  level: 'junior',
};

const MOCK_DEV_UPDATE = {
  id: 2,
  name: 'piantoni',
  role: 'front-end',
  level: 'junior',
};

describe('Developer manipulation suite', function () {
  this.beforeAll(async () => {
    await Database.create(MOCK_DEV_REGISTER);
    await Database.create(MOCK_DEV_UPDATE);
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

  it('should delete a developer by id using files', async () => {
    const expected = true;
    const result = await Database.delete(MOCK_DEV_REGISTER.id);

    deepStrictEqual(result, expected);
  });

  it('should update a developer by id using files', async () => {
    const expected = {
      ...MOCK_DEV_UPDATE,
      name: 'raphael',
      role: 'mobile',
    };

    const newData = {
      name: 'raphael',
      role: 'mobile',
    };

    await Database.update(MOCK_DEV_UPDATE.id, newData);

    const [result] = await Database.read(MOCK_DEV_UPDATE.id);

    deepStrictEqual(result, expected);
  });
});
