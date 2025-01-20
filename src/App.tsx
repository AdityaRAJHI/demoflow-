import React, { useCallback, useState } from 'react';
    import { useDropzone } from 'react-dropzone';
    import { Github, Code2, Share2, Zap, ChevronRight, Terminal, Blocks, Upload, Download, List, Book, Mountain, Image, Hand } from 'lucide-react';
    
    function App() {
      const [uploading, setUploading] = useState(false);
      const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
      const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);
      const [sidebarOpen, setSidebarOpen] = useState(false);
    
      const onDrop = useCallback(async (acceptedFiles: File[]) => {
        try {
          setUploading(true);
          
          for (const file of acceptedFiles) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            
            // Simulate upload and get a public URL
            const publicUrl = `https://example.com/uploads/${fileName}`;
    
            setFiles(prev => [...prev, { name: file.name, url: publicUrl }]);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Error uploading file');
        } finally {
          setUploading(false);
        }
      }, []);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
      const openModal = (title: string, content: string) => {
        setModalContent({ title, content });
      };
    
      const closeModal = () => {
        setModalContent(null);
      };
    
      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          {/* Header */}
          <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Blocks className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold">DemoFlow</span>
              </div>
              <div className="flex items-center space-x-6">
                <button onClick={() => openModal('Docs', 'This is the documentation content.')} className="text-gray-600 hover:text-gray-900">Docs</button>
                <button onClick={() => openModal('Examples', 'These are some example demos.')} className="text-gray-600 hover:text-gray-900">Examples</button>
                <button onClick={() => openModal('Blog', 'Check out our latest blog posts.')} className="text-gray-600 hover:text-gray-900">Blog</button>
                <a href="https://github.com" className="text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
                <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900">
                  <List className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </header>
    
          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Menu</h2>
              <button onClick={() => openModal('Quickstart', 'This is the quickstart guide.')} className="flex items-center space-x-2 py-2 hover:bg-gray-100 rounded-md w-full">
                <Zap className="w-4 h-4 text-gray-600" />
                <span>Quickstart</span>
              </button>
              <button onClick={() => openModal('Docs', 'This is the documentation content.')} className="flex items-center space-x-2 py-2 hover:bg-gray-100 rounded-md w-full">
                <Book className="w-4 h-4 text-gray-600" />
                <span>Docs</span>
              </button>
              <button onClick={() => openModal('Playground', 'This is the playground area.')} className="flex items-center space-x-2 py-2 hover:bg-gray-100 rounded-md w-full">
                <Mountain className="w-4 h-4 text-gray-600" />
                <span>Playground</span>
              </button>
              <button onClick={() => openModal('Custom Components', 'These are some custom components.')} className="flex items-center space-x-2 py-2 hover:bg-gray-100 rounded-md w-full">
                <Image className="w-4 h-4 text-gray-600" />
                <span>Custom Components</span>
              </button>
              <button onClick={() => openModal('Community', 'Join our community.')} className="flex items-center space-x-2 py-2 hover:bg-gray-100 rounded-md w-full">
                <Hand className="w-4 h-4 text-gray-600" />
                <span>Community</span>
              </button>
            </div>
          </div>
    
          {/* Hero Section */}
          <main className="container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Build & Share ML Demos
                <span className="text-indigo-600"> in Minutes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create beautiful machine learning demos and share them with the world.
                No frontend experience required.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 flex items-center">
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 flex items-center">
                  View Examples
                </button>
              </div>
            </div>
    
            {/* Code Preview */}
            <div className="mt-16 bg-gray-900 rounded-xl p-6 max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-gray-300 font-mono text-sm">
                <code>{`import demoflow as df

def image_classifier(img):
    # Your ML model here
    return "Cat", 0.98

demo = df.Interface(
    fn=image_classifier,
    inputs=df.Image(),
    outputs=df.Label()
)

demo.launch()`}</code>
              </pre>
            </div>
    
            {/* Features */}
            <div className="mt-24 grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
                <p className="text-gray-600">
                  Get your ML demo up and running in minutes with just a few lines of code.
                </p>
              </div>
    
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Components</h3>
                <p className="text-gray-600">
                  Build rich interfaces with our library of UI components designed for ML.
                </p>
              </div>
    
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                <p className="text-gray-600">
                  Share your demos instantly with a unique URL or embed them anywhere.
                </p>
              </div>
            </div>
    
            {/* Demo Section with File Upload */}
            <div className="mt-24 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Try it yourself</h2>
                <p className="text-gray-600">
                  Upload an image and our demo model will classify it instantly.
                </p>
              </div>
              
                <div 
                  {...getRootProps()} 
                  className={`max-w-xl mx-auto bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed transition-colors
                    ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                >
                  <input {...getInputProps()} />
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Terminal className="w-12 h-12 text-indigo-600 animate-pulse mb-4" />
                      <p className="text-indigo-600">Uploading...</p>
                    </div>
                  ) : isDragActive ? (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-indigo-600 mb-4" />
                      <p className="text-indigo-600">Drop the files here</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Terminal className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">
                        Drop files here or click to upload
                      </p>
                    </div>
                  )}
                </div>
    
              {/* File List */}
              {files.length > 0 && (
                <div className="max-w-xl mx-auto mt-8">
                  <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{file.name}</span>
                        <a
                          href={file.url}
                          download
                          className="flex items-center text-indigo-600 hover:text-indigo-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
    
          {/* Footer */}
          <footer className="container mx-auto px-4 py-12 mt-24 border-t">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Blocks className="w-6 h-6 text-indigo-600" />
                <span className="font-medium">DemoFlow</span>
              </div>
              <div className="text-sm text-gray-500">
                © 2024 DemoFlow. All rights reserved.
              </div>
            </div>
          </footer>
          {modalContent && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative p-7 mx-auto max-w-lg mt-20 bg-white rounded-xl">
                <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
                <p>{modalContent.content}</p>
                <button onClick={closeModal} className="mt-4 bg-gray-200 px-4 py-2 rounded-md">Close</button>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    export default App;
