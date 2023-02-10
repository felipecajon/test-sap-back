// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  age: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  // if (req.method === 'POST') {
  //   const {name} = req.body;

  //   return res.status(200).json({
  //     name, 
  //     age: '21'
  //   })
  // }

  const { lang } = req.query;

  try {
      // const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
      const response = await axios.get(`https://restcountries.com/v2/lang/${lang}`);
      return res.status(200).json(response.data);
  } catch (error) {
      return res.status(500);
  }
}
