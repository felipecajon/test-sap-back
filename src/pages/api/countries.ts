import { Country } from '@/model/country';
import { destination } from '@/providers/destination.provider';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[]>
) {

  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  async function httpService(url: string): Promise<any> {
    try {
        const request = await axios.get(url);
        return request;
    } catch (error) {
        throw error;
    }
  }

  const { lang } = req.query;

  return new Promise((resolve, reject) => {
      destination.then(destinationObject => {
          let url = destinationObject.url + lang;
          
          console.log('URL: ' + url);

          httpService(url).then(data => {
              console.log("in quote data part");
              resolve(data.data);
          }).catch(error => {
              console.log("in Quote error Part");
              console.log(error.response.data);
              reject(error.response.data);
          });

      }).catch(err => {
          reject(err);
      });
  });

  // try {
  //     const response = await axios.get(`https://restcountries.com/v2/lang/${lang}`);
  //     const contries : Contry[] = response.data.map((item: any) => new Contry(item.name, item.capital, item.region, item.subregion, item.flags.png));
  //     return res.status(200).json(contries);
  // } catch (error) {
  //     return res.status(200).json([]);
  // }
  
}

