import { Country } from '@/model/country';
import { destination } from '@/providers/destination.provider';
import { CountryService } from '@/services/country.services';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';

export default async function handler(
  // req: NextApiRequest,
  req: any,
  res: NextApiResponse<Country[]>
) {

  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { lang } = req.query;
  // const authorization = req.headers.authorization;  
  // const isAuthorized = req.authInfo.checkLocalScope('Supplier');
  const countryService = new CountryService();


  try {
    const data = await countryService.consumeCountryDestination(lang).then((data: any) => {
      console.log('DATA');
      console.log(data);
      return data.data
    }).catch(error => {
      if (error === false) {
        console.log('ERRO NO CATCH da controller');
        return res.status(403).json([]);  
      }
    })

    return res.status(200).json(data);
  } catch (error) {
    console.log('erro do catch 1');
    
    return res.status(200).json([]);
  }

  
  // if(isAuthorized){
  //   return await countryService.getCountry(authorization, lang).then((data: any) => {
  //     return data.data
  //   }).catch(error => {
  //     if (error === false) {
  //       console.log('ERRO NO CATCH LINHA 30');
  //       return res.status(403).json([]);  
  //     }
  //   })
  // }else{
  //     // throw new UnauthorizedException();
  //     console.log('NÃO AUTORIZADO');
  //     return res.status(403).json([]);
  // }

  // try {
  //     const response = await axios.get(`https://restcountries.com/v2/lang/${lang}`);
  //     const contries : Contry[] = response.data.map((item: any) => new Contry(item.name, item.capital, item.region, item.subregion, item.flags.png));
  //     return res.status(200).json(contries);
  // } catch (error) {
  //     return res.status(200).json([]);
  // }
  
}

