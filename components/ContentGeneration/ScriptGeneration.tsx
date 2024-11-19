'use client';
import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { LanguageStyles, ScriptTypes } from '@/constants';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BiLoader, BiLoaderAlt } from 'react-icons/bi';
import { useContent } from '@/context/ContentContext';
import ContentTextEditor from './ContentTextEditor';
import { MdRepeat } from 'react-icons/md';
import { demoHtmlScript, demoJsonScript } from '@/demoData';
import { convertScriptToHTML } from '@/lib/utils';
import { Input } from '../ui/input';


const formSchema = z.object({
  scriptType: z.string({ message: 'Please select a script type' }),
  languageStyle: z.string({ message: 'Please select a language' }),
  instructions: z.string().min(3),
  scriptLength: z.number().min(10).max(300)
})


export default function ScriptGeneration() {

  const [isLodaing, setIsLoading] = useState(false)
  const { setContent, content, setScript } = useContent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scriptType: 'drama',
      languageStyle: 'casual',
      instructions: '',
      scriptLength: 30
    },

  })
  const { setValue, watch, formState: { defaultValues } } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setScript(demoJsonScript)
    setContent(convertScriptToHTML(demoJsonScript))
    setIsLoading(false)
  }


  return (
    <div className='flex mt-8 gap-8 '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8 border p-4 rounded-md   w-full '>
          <div className='flex flex-col gap-4 '>
            <h3 className='text-lg font-semibold '>What kind of script do you want to create today</h3>
            <ToggleGroup
              type="single"
              defaultValue={defaultValues?.scriptType}
              size={'sm'}
              className='flex gap-2 flex-wrap justify-start !text-xs'
              variant={'outline'}
              onValueChange={(e) => { setValue("scriptType", e) }}
            >

              {
                ScriptTypes.map((i) => (
                  <ToggleGroupItem
                    key={i.value}
                    value={i.value}
                    className='text-xs'
                    aria-label={`Toggle ${i.label}`}

                  >{i.label}</ToggleGroupItem>
                ))
              }

            </ToggleGroup>


          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-semibold '>Language style</h3>
            <ToggleGroup
              type="single"
              defaultValue={defaultValues?.languageStyle}
              size={'sm'}
              className='flex gap-2 flex-wrap justify-start '
              variant={'outline'}
              onValueChange={(e) => { setValue("languageStyle", e) }}
            >
              {
                LanguageStyles.map((i) => (
                  <ToggleGroupItem
                    key={i.value}
                    value={i.value}
                    className='text-xs'
                    aria-label={`Toggle ${i.label}`}

                  >{i.label}</ToggleGroupItem>
                ))
              }
            </ToggleGroup>


          </div>

          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h3 className='text-lg  font-semibold  '>Please provide specific instructions for the script.</h3>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Enter your script topic or instructions...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className='flex flex-col gap-4'>
            <h3 className='text-lg  font-semibold  '>What is the desired length for your video?</h3>
            <div className='flex gap-4 items-center '>
              <Slider defaultValue={defaultValues?.scriptLength ? [defaultValues.scriptLength] : [22]}
                min={10}
                onValueChange={(e) => { setValue('scriptLength', e[0]) }}
                max={300}
                step={1}
                className='w-1/2' />
              <p className='text-xs text-muted-foreground '>

                {`${watch('scriptLength')} seconds ~${Math.ceil(watch('scriptLength') * 2.3)} words `}

              </p>
            </div>
          </div>
          <Button type='submit' className='shadow-2xl'>
            {
              isLodaing &&

              <BiLoader size={24} className="animate-spin" />

            }
            Generate
          </Button>
        </form>
      </Form>
      <div className='w-full flex flex-col border p-4  ' >
        <ContentTextEditor />

        <ImproviseScript/>


      </div>

    </div>
  )

}


function ImproviseScript() {


  const { content,setScript,setContent } = useContent();
  const [prompt,setPrompt] = useState('');
  const [isLodaing,setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setScript(demoJsonScript)
    setContent(convertScriptToHTML(demoJsonScript))
    setIsLoading(false)
  }

  return (
    <>
      {
        content &&
        <div>
          <Input disabled={isLodaing} value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} className='mt-2' placeholder='Suggest improvements to the flow' />
          <Button className='mt-2 ' size={'lg'} disabled={isLodaing}  onClick={()=>{onSubmit()}}>
            { !isLodaing && <MdRepeat size={20} />}
            Regenrate
            { isLodaing && <BiLoaderAlt className='animate-spin ' size={20} />}
          </Button>
        </div>
      }
    </>

  )
}