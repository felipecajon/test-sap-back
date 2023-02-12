import { destination } from "@/providers/destination.provider";
import { ServiceCredentials } from "@/providers/security-credentials.provider";
import axios from "axios";

export class CountryService {
    async getClientToken(clientCredentials: any) {
        return new Promise((resolve, reject) => {
            const url = `${clientCredentials.url}/oauth/token`;
            axios.post(url, `grant_type=client_credentials&client_id=${clientCredentials.clientId}&client_secret=${clientCredentials.clientSecret}`).then((res: any) => {
                resolve(res.data.access_token);
            }).catch((error: any) => {
                console.log(error);
                reject(error);
            });
        });
    }

    // async getCountry (authHeader: any, lang: string) {
    //     return new Promise((resolve, reject) => {
    //         this.getClientToken(ServiceCredentials[0]).then(token => {
    //             let header = { "Authorization": 'Bearer ' + token };
    //             this.consumeCountryDestination(header, lang).then((data: any) => {
    //                 console.log("Request Came here");
    //                 resolve(data);
    //             }).catch(error => {
    //                 console.log("Error Getting Quote");
    //                 reject(error);
    //             });
    //         }).catch(error => {
    //             console.log("Error Handling token", error);
    //             reject(error);
    //         });
    //     });
    // }

    async consumeCountryDestination (lang: string) {
        return new Promise((resolve, reject) => {
            destination.then(destinationObject => {
                let url = destinationObject.url + lang;
                console.log('URL: ' + url);
      
                this.httpService(url).then(data => {
                    console.log("deu boa!");
                    resolve(data);
                }).catch(error => {
                    console.log("deu ruim");
                    console.log(error.response.data);
                    reject(error.response.data);
                });
      
            }).catch(err => {
                reject(err);
            });
        });
    }

    async httpService(url: string, header = 'ssds'): Promise<any> {
        try {
            const request = await axios.get(url);
            return request;
        } catch (error) {
            throw error;
        }
    }
}