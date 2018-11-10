class Helper{
    static baseURL(){
        return "https://api.foursquare.com/v2";
    }
    static auth(){
        const keys = {
            client_id:"QNEU1SEPMSOJC2XTTCYS02P3GK23YFZ2L4E3VFDSB5OEVVRV",
            client_secret:"20VTYM4NF0O4KCI443OBMLNYKOHGQOGSGQKSXU1MLCQ42UKM",
            v:"20181007"
        }
        return Object.keys(keys)
        .map(key => `${key}=${keys[key]}`)
        .join('&');
    }
    static urlBuilder(urlPrams){
        if(!urlPrams){
            return '';
        }
        return Object.keys(urlPrams)
        .map(key => `${key}=${urlPrams[key]}`)
        .join("&");
    }

    static headers(){
        return {
            Accept:"applicatin/json"
        };
    }
    static simpleFetch(endPoint, method, urlPrams){
        let requestdata = {
            method,
            headers: Helper.headers()
        }

        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
                urlPrams
            )}`,
            requestdata
        ).then (res => res.json())
         .catch(function(res) {
            console.log("error");
            alert('Error in fetching data');
            throw Error(res.statusText)
        });
    }

}

export default class SquareAPI{
    static search(urlPrams){
        return Helper.simpleFetch('/venues/search','GET',urlPrams);
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,'GET');
    }
    static getVenuePhotos(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`,'GET');
    }
}
