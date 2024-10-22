import axios from 'axios';

const ACCESS_KEY = process.env.NEXT_PUBLIC_11LAB_KEY;

const elevenLabsClient = axios.create({
    baseURL: 'https://api.elevenlabs.io/v1',
    headers: {
        "xi-api-key": ACCESS_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
})



export const elevenlabApi = {

    getVoices: async function () {
        try {
            const response = await elevenLabsClient.get('/voices');
            const voices = response.data.voices.map((voice: any) => ({
                id: voice.voice_id,
                name: voice.name,
                labels: voice.labels,
                preview_url: voice.preview_url,
            }));
            console.log(voices)
            return voices
        } catch (error) {

            console.error(error);
        }
    },

    generateVoice: async function ( text:string, voice_id:string ) {

        try {
            const response = await elevenLabsClient.post('/text-to-speech/'+voice_id, {
                text: text,
            });
            console.log(response.data)
            const audioUrl = response.data.audio_url;
            return audioUrl;
        } catch (error) {
            console.log(error);
        }
    }


}


