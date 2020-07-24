const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

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

  writeFile() {}

  async read(id) {
    const data = await this.getFileData();
    const filteredData = data.filter(item => (id ? item.id === id : true));

    return filteredData;
  }
}

module.exports = new Database();
