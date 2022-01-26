import fetch from 'node-fetch';


class AnalysisService {
    async fetchRequest(url) {
        let data = fetch(url)
            .then(res => res.json())
            .then(data => data)
        return data
    }
    async postFetchRequest(url, body) {
        let data = fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: body })
            })
            .then(res => res.json())
            .then(data => data)
        return data
    }
    async countOne(obj) {
        return Object.values(
            obj.reduce((a, c) => {
                return (
                    a[c.name] ? (a[c.name].kolvo += c.kolvo) : (a[c.name] = c), a
                );
            }, Object.create(null))
        );
    }
    async countMultiple(obj) {
        return Object.values(
            obj.reduce((a, c) => {
                return (
                    a[c.name] ? (a[c.name].kolvo -= c.kolvo) : (a[c.name] = c), a
                );
            }, Object.create(null))
        );
    }
}

export default new AnalysisService