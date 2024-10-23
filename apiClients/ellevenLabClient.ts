'use server'
const fs = require('fs');
const path = require('path');

import { uploadToGCS } from '@/actions/storage.actions';
import axios from 'axios';

const ACCESS_KEY = process.env.ELEVENLAB_KEY;


// const voiceCache = {};

const elevenLabsClient = axios.create({
    baseURL: 'https://api.elevenlabs.io/v1',
    headers: {
        "xi-api-key": ACCESS_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
})

 export const getVoices = async function () {
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
    }

export const  generateVoice = async function ( text:string, voice_id:string ) {

    return 'https://storage.googleapis.com/bucket-quickstart_ai-content-gen-439516/audio/mp3/1d16b47b-81a9-4429-a9a1-e6972f7edeb4.mp3' ;

        try {
            
                const response = await elevenLabsClient.post('/text-to-speech/'+voice_id, 
                    {
                        text: text
                    
                    } ,

                    {
                        
                        responseType: 'arraybuffer', 
                        headers: {
                            'Accept': 'audio/mpeg', 
                        },
                        
                    },
                
                );

           
            const buffer = Buffer.from(response.data);               

            const audioUrl = await uploadToGCS(buffer, response.headers['content-type']);

            console.log(audioUrl)

            return audioUrl ;

        } catch (error) {
            
            console.log(error);
        
        }
    }




