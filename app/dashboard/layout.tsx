export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="border p-10 ">
            <p className="text-center">Root Layout</p>

            {children}
        </div>
    );
  }
  