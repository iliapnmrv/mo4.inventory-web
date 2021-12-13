class TotalService {
    createFilters(query) {
        if (Object.keys(query).length === 0) {
            return ''
        }
        let whereClause = 'WHERE ('
        let last = Object.keys(query)[Object.keys(query).length - 1];
        for (const key in query) {
            let objectKey = []
            if (!Array.isArray(query[key])) {
                objectKey.push(query[key])
            } else {
                objectKey = query[key]
            }
            for (let i = 0; i < objectKey.length; i++) {
                const elem = objectKey[i];
                let con
                if (objectKey[objectKey.length - 1] == objectKey[i]) {
                    if (key == last) {
                        con = ')'
                    } else {
                        con = ') AND ('
                    }
                } else {
                    con = ' OR '
                }
                whereClause = `${whereClause}${key} = ${objectKey[i]}${con}`
            }
        }
        console.log(whereClause);
        return whereClause
    }
}

export default new TotalService