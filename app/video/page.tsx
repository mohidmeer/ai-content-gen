import dynamic from 'next/dynamic';
const DynamicVideoEditor = dynamic(
  () => import('@/components/features/video-editor/components/VideoEditor'),
  {
    ssr: false
  }
);

export default function Home() {
  return (
    <div
      className="App showcaseContainer"
      style={{
        minHeight: '100vh',
        display: 'flex'
      }}
    >
      <DynamicVideoEditor />
    </div>
  );
}
