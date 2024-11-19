'use client';
// import { getHistoryDetails } from '@/actions/user.actions';
import CreativeEditor, { useConfig, useConfigure } from '@/components/features/video-editor/components/CreativeEditor';
import VideoEditor from '@/components/features/video-editor/components/VideoEditor';
import { PAGE_FORMAT_ASSETS } from '@/components/features/video-editor/constants';
import { formatAssetsToPresets, PAGE_FORMATS_INSERT_ENTRY_DOCK, pageFormatI18n } from '@/components/features/video-editor/libs/PageFormatAssetLibrary';
import { caseAssetPath } from '@/components/features/video-editor/utils';
import { UserInterfaceElements } from '@cesdk/cesdk-js';
import dynamic from 'next/dynamic';
import { useState } from 'react';


export default function Home({ params }: { params: Promise<{ id: string }> }) {
  // const id = (await params).id
  // const history = await getHistoryDetails(id);

  // const scenes = [
  //   {
  //     scene_id: 1,
  //     scene_title: 'Introduction to Justin Bieber',
  //     text: 'From a small town in Canada to global stardom, Justin Bieber’s journey is nothing short of incredible.',
  //     images: ['image1_url', 'image2_url'],
  //     stock_footages: [],
  //     image_description: 'A young boy performing music on a street in a small town, surrounded by nature, symbolizing humble beginnings before fame.',
  //   },
  //   {
  //     scene_id: 2,
  //     scene_title: 'Rise to Fame',
  //     text: 'Discovered at just 13, Justin’s rise to fame was a whirlwind, with hits like ‘Baby’ making waves around the world.',
  //     images: ['image3_url', 'image4_url'],
  //     stock_footages: [],
  //     image_description: 'A teenage boy with a microphone on stage under bright lights, surrounded by a cheering crowd, capturing the moment of global recognition and fame.',
  //   },
  //   {
  //     scene_id: 3,
  //     scene_title: 'Evolution as an Artist',
  //     text: 'Over the years, Justin’s music has evolved, showing his growth not only as an artist but as a person.',
  //     images: ['image5_url', 'image6_url'],
  //     stock_footages: [],
  //     image_description: 'A montage of album covers from different eras, showing a progression in style and music, with a focus on personal growth and change.',
  //   },
  // ];

  const images = ['https://images.freeimages.com/images/large-previews/1c1/links-1242361.jpg']
  const config = useConfig(
    () => ({
      baseURL: '/editorr/assets',
      core: {
        baseURL: '/editorr/core/'
      },
      role: 'Creator',
      theme: 'light',
      license: process.env.NEXT_PUBLIC_LICENSE,
      i18n: {
        en: {
          'libraries.ly.img.audio.ly.img.audio.label': 'Soundstripe',
          ...pageFormatI18n(PAGE_FORMAT_ASSETS.assets),
          'libraries.ly.img.video.scene.label': 'Example Templates'
        }
      },
      ui: {
        pageFormats: formatAssetsToPresets(PAGE_FORMAT_ASSETS),
        elements: {
          view: 'default',
          panels: {
            settings: true
          },
          navigation: {
            position: UserInterfaceElements.NavigationPosition.Top,
            action: {
              export: true
            }
          }
        }
      },
      callbacks: {
        onUpload: 'local',
        onDownload: 'download',
        onExport: 'download'
      }
    }),
    []
  );
  const configure = useConfigure(async (instance) => {
    instance.createVideoScene(PAGE_FORMAT_ASSETS.assets[0]?.meta);

    await instance.addDefaultAssetSources();
    await instance.addDemoAssetSources();

     instance.engine.asset.addAssetToSource('ly.img.image.upload', {
    id: '1', 
    meta: {
      thumbUri: 'https://images.freeimages.com/images/large-previews/1c1/links-1242361.jpg', 
      uri: 'https://images.freeimages.com/images/large-previews/1c1/links-1242361.jpg' ,
    },
  });
   


    const engine = instance.engine;

  }, []);






  return (
    <div
      className="App showcaseContainer"
      style={{
        minHeight: '100vh',
        display: 'flex'
      }}
    >
      {/* <DynamicVideoEditor/> */}
      <div className="cesdkWrapperStyle">
        <CreativeEditor
          className="cesdkStyle"
          config={config}
          configure={configure}
        />
      </div>
    </div>
  );
}
