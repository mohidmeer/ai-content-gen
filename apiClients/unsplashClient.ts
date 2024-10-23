'use server'
import axios from 'axios';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const unsplashClient = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
    
    },
});




export const getImage =  async function (query: string, imageStyle: string,aspectRatio:string) {
    try {
        const response = await unsplashClient.get('/photos/random', {
            params: {
                query: `${query} ${imageStyle} ${aspectRatio}`,
                count: 1,
            },
        });

        return response.data[0];
    } catch (error) {
        console.error('Error fetching random image from Unsplash:', error);
        throw error;
    }
}




