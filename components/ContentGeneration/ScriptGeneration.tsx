
import React, {  useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { LanguageStyles, ScriptTypes } from '@/constants';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BiLoader } from 'react-icons/bi';
import { useContent } from '@/context/contentContext';
import ContentTextEditor from './ContentTextEditor';
import { MdRepeat } from 'react-icons/md';


const formSchema = z.object({
    scriptType: z.string({ message: 'Please select a script type' }),
    languageStyle: z.string({ message: 'Please select a language' }),
    instructions: z.string().min(3),
    scriptLength: z.number().min(10).max(300)
  })
  

export default function ScriptGeneration() {

    const { step, setStep, content, setContent, progress } = useContent();


    const [isLodaing, setIsLoading] = useState(false)
  
  
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
      setContent(``)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setContent(` <h2>Why Drinking Water is Essential</h2>
  
                  <p>Did you know that drinking water is one of the easiest ways to improve your health?</p>
  
                  <p>Water helps keep your skin glowing, your energy levels high, and even boosts your mood throughout the day.</p>
  
                  <h3>Stay Hydrated, Stay Healthy</h3>
  
                  <p>Whether you're working out, at work, or just relaxing, staying hydrated helps your body function at its best.</p>
  
                  <p>So next time, grab a bottle of water and take a sip. It’s a simple habit that can make a big difference.</p>
  
                  <p>Cheers to a healthier, happier you!</p> `)
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
                className='flex gap-2 flex-wrap justify-start'
                variant={'outline'}
                onValueChange={(e) => { setValue("scriptType", e) }}
              >
  
                {
                  ScriptTypes.map((i) => (
                    <ToggleGroupItem
                      key={i.value}
                      value={i.value}
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
        <div className='w-full flex flex-col min-h-[600px] border p-4 '>
          <ContentTextEditor
            content={content}
          />
          <Button className='mt-2 ml-auto' size={'icon'} >
            <MdRepeat />
          </Button>
  
  
  
        </div>
  
      </div>
    )
  
  
  }