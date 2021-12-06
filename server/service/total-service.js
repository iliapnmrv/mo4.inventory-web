class TotalService {
    createFilters(query) {
        if (Object.keys(query).length === 0) {
            return ''
        }
        let whereClause = 'WHERE ('
        let last = Object.keys(query)[Object.keys(query).length - 1];
        for (const key in query) {
            for (let i = 0; i < query[key].length; i++) {
                const elem = query[key][i];
                let con
                if (query[key][query[key].length - 1] == query[key][i]) {
                    if (key == last) {
                        con = ')'
                    } else {
                        con = ') AND ('
                    }
                } else {
                    con = ' OR '
                }
                whereClause = `${whereClause}${key} = ${query[key][i]}${con}`
            }
        }
        console.log(whereClause);
        return whereClause
    }
}

export default new TotalService