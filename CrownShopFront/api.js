const getPlayers  = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://free-nba.p.rapidapi.com/players?page=0&per_page=25',
            headers: {
                "x-rapidapi-key": "36a371d7efmshbc6a4a1884135acp1667a6jsnd21c7b5b881f",
                "x-rapidapi-host": "free-nba.p.rapidapi.com"
            },
        })
        .then((response) => {
            payload = response.data.data
            setPlayers(payload);
            return resolve(response.data.data);
        })
        .catch((error) => {
            return reject(error);
        });
    });
};