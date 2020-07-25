const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.FILE_PATH = 'src/developers.json';
  }

  async getFileData() {
    try {
      const file = await readFileAsync(this.FILE_PATH, 'utf8');

      return JSON.parse(file.toString());
    } catch (error) {
      console.error('getFileData - ERROR', error);
    }
  }

  async writeInFile(data) {
    try {
      await writeFileAsync(this.FILE_PATH, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('writeInFile - ERROR', error);
    }
  }

  async read(id) {
    try {
      const data = await this.getFileData();
      const filteredData = data.filter(item => (id ? item.id === id : true));

      return filteredData;
    } catch (error) {
      console.error('read - ERROR', error);
    }
  }

  async create(dev) {
    try {
      const developersList = await this.getFileData();
      const id = dev.id <= 2 ? dev.id : Date.now();

      const setDeveloperId = { id, ...dev };
      const setDevelopersList = [...developersList, setDeveloperId];

      const result = await this.writeInFile(setDevelopersList);
      return result;
    } catch (error) {
      console.error('create - ERROR', error);
    }
  }
}

module.exports = new Database();
