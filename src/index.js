const { Command } = require('commander');
const Database = require('./database');
const Developer = require('./developer');
const Pack = require('./../package.json');

const program = new Command();

async function main() {
  program
    .version(Pack.version)
    .option('-n, --name-dev <name>', 'Developer name')
    .option('-r, --role-dev <role>', 'Developer role')
    .option('-l, --level-dev <level>', 'Developer level')
    .option('-i, --id [id]', 'Developer ID')

    .option('-rg, --register', 'Register a developer')
    .option('-ls, --list', 'List all developers')
    .option('-rm, --remove', 'Remove a developer')
    .option('-up, --update <id>', 'Update a developer')
    .parse(process.argv);

  const developer = new Developer(program);
  try {
    if (program.register) {
      delete developer.id;

      const result = await Database.create(developer);
      if (!result) {
        console.error('The Developer could not be registered!');
        return;
      }

      console.log('Developer successfully registered!');
    }

    if (program.list) {
      const result = await Database.read(developer.id);
      console.log(result);
      return;
    }

    if (program.remove) {
      const result = await Database.delete(developer.id);
      if (!result) {
        console.error('The Developer could not be removed!');
        return;
      }

      console.log('Developer successfully removed!');
    }

    if (program.update) {
      const updateId = parseInt(program.update);

      const data = JSON.stringify(developer);
      const devForUpdate = JSON.parse(data);

      const result = await Database.update(updateId, devForUpdate);
      if (!result) {
        console.error('The developer could not be updated!');
        return;
      }

      console.log('Developer successfully updated!');
    }
  } catch (error) {
    console.error('main - ERROR', error);
  }
}

main();
