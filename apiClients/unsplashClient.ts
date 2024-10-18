import axios from 'axios';

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const unsplashClient = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
    
    },
});


export const unsplashAPi = {


    getImage: async function (query: string, imageStyle: string) {
        try {
            const response = await unsplashClient.get('/photos/random', {
                params: {
                    query: `${query} ${imageStyle}`,
                    count: 1,
                },
            });

            return response.data[0];
        } catch (error) {
            console.error('Error fetching random image from Unsplash:', error);
            throw error;
        }
    },


}



