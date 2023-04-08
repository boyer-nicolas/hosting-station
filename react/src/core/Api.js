import axios from 'axios';

class Api
{
    constructor()
    {
        this.api = axios.create({
            baseURL: 'https://api.hostingstation.localhost/api/v1',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        });
    }

    get(url)
    {
        return this.api.get(url);
    }

    post(url, data)
    {
        return this.api.post(url, data);
    }

    put(url, data)
    {
        return this.api.put(url, data);
    }

    delete(url)
    {
        return this.api.delete(url);
    }
}

export default Api;