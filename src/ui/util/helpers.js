class Helpers {
  static sortOn(prop) {
    return (a, b) => {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  static queryData(data, query, searchFields = ['title'], labelField = 'title') {
    if (!Array.isArray(data)) {
      return [];
    }

    const results = [],
      queryRegex = new RegExp(`${query}`, 'gi'),
      showAll = typeof query !== 'string' || query.length === 0;

    data.forEach(item => {
      const entry = {value: item[labelField], data: item};
      let searchValues = [];

      searchFields.forEach(field => {
        if (typeof item[field] === 'string') {
          searchValues.push(item[field]);
        } else if (Array.isArray(item[field])) {
          searchValues = searchValues.concat(item[field]);
        }
      });

      if (showAll || searchValues.join(' ').search(queryRegex) !== -1) {
        const labelRegex = new RegExp(`${item[labelField]}`, 'gi');
        if (results.join(' ').search(labelRegex) === -1) {
          results.push(entry);
        }
      }
    });

    return results;
  }
}

export default Helpers;
