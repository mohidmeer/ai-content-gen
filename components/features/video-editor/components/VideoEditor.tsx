'use client';

import { UserInterfaceElements } from '@cesdk/cesdk-js';

import {
  PAGE_FORMAT_ASSETS,
  AUDIO_ASSETS,
  VIDEO_SCENES_ASSETS
} from '../constants';


import {
  PAGE_FORMATS_INSERT_ENTRY_DOCK,
  PAGE_FORMATS_INSERT_ENTRY_ASSET,
  formatAssetsToPresets,
  pageFormatI18n
} from '../libs/PageFormatAssetLibrary';


import { createApplyFormatAsset } from '../libs/createApplyFormatAsset';
import CreativeEditor, { useConfig, useConfigure } from './CreativeEditor';
import loadAssetSourceFromContentJSON from '../libs/loadAssetSourceFromContentJSON';
import { caseAssetPath } from '../utils';
import { useState } from 'react';

const VideoEditor = ({ scene }: { scene: any }) => {

  const [scenes, setScenes] = useState([
    {
      scene_id: 1,
      scene_title: 'Introduction to Justin Bieber',
      text: 'From a small town in Canada to global stardom, Justin Bieber’s journey is nothing short of incredible.',
      images: ['image1_url', 'image2_url'],
      stock_footages: [],
      image_description: 'A young boy performing music on a street in a small town, surrounded by nature, symbolizing humble beginnings before fame.',
    },
    {
      scene_id: 2,
      scene_title: 'Rise to Fame',
      text: 'Discovered at just 13, Justin’s rise to fame was a whirlwind, with hits like ‘Baby’ making waves around the world.',
      images: ['image3_url', 'image4_url'],
      stock_footages: [],
      image_description: 'A teenage boy with a microphone on stage under bright lights, surrounded by a cheering crowd, capturing the moment of global recognition and fame.',
    },
    {
      scene_id: 3,
      scene_title: 'Evolution as an Artist',
      text: 'Over the years, Justin’s music has evolved, showing his growth not only as an artist but as a person.',
      images: ['image5_url', 'image6_url'],
      stock_footages: [],
      image_description: 'A montage of album covers from different eras, showing a progression in style and music, with a focus on personal growth and change.',
    },
  ]);

  const config = useConfig(
    () => ({
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



    instance.ui.addAssetLibraryEntry(PAGE_FORMATS_INSERT_ENTRY_ASSET);


    const engine = instance.engine;

    await instance.addDefaultAssetSources();
    await instance.addDemoAssetSources({
      sceneMode: 'Video',
      // We want to replace the demo audio assets with our own
      excludeAssetSourceIds: ['ly.img.audio', 'ly.img.video.template']
    });

    instance.ui.setDockOrder([
      PAGE_FORMATS_INSERT_ENTRY_DOCK,
      'ly.img.separator',
      {
        id: 'ly.img.assetLibrary.dock',
        key: 'examples',
        label: 'libraries.ly.img.video.scene.label',
        icon: () => caseAssetPath('/static-video-scenes-icon.svg'),
        entries: ['ly.img.video.scene']
      },
      'ly.img.separator',
      ...instance.ui
        .getDockOrder()
        .filter(({ key }) => !['ly.img.video.template'].includes(key))
    ]);

    instance.ui.addAssetLibraryEntry(
      {
        id: 'ly.img.video.scene',
        sourceIds: ['ly.img.video.scene']
      }
    ); 


  // Disable placeholder and preview features
    instance.feature.enable('ly.img.placeholder', false);
    instance.feature.enable('ly.img.preview', false);


    loadAssetSourceFromContentJSON(
      engine,
      VIDEO_SCENES_ASSETS,
      caseAssetPath('/templates'),
      async (asset) => {
        if (!asset.meta || !asset.meta.uri)
          throw new Error('Asset does not have a uri');
        await engine.scene.loadFromURL(asset.meta.uri);
        persistSelectedTemplateToURL(asset.id);
      }
    );

    loadAssetSourceFromContentJSON(
      engine,
      AUDIO_ASSETS,
      caseAssetPath('/audio')
    );

    loadAssetSourceFromContentJSON(
      engine,
      PAGE_FORMAT_ASSETS,
      caseAssetPath('/page-formats'),
      createApplyFormatAsset(engine)
    );



    instance
      .loadFromURL(
        caseAssetPath(`/templates/${loadSelectedTemplateFromURL()}.scene`)
      )
      .catch(() => {
        // Fallback to motion template if the selected template fails to load, e.g due to 404
        instance.loadFromURL(caseAssetPath(`/templates/motion.scene`));
      });





  }, []);

  return (
    <div className="cesdkWrapperStyle">
      <CreativeEditor
        className="cesdkStyle"
        config={config}
        configure={configure}
      />
    </div>
  );
};

function persistSelectedTemplateToURL(templateName: any) {
  const url = new URL(window.location.href);
  url.searchParams.set('template', templateName);
  window.history.pushState({}, '', url);
}
function loadSelectedTemplateFromURL() {
  const url = new URL(window.location.href);
  return url.searchParams.get('template') || 'motion';
}

export default VideoEditor;
