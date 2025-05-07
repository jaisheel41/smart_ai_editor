// import React, { useState, useRef } from 'react';
// import Editor from "@monaco-editor/react";
// import prettier from "prettier/standalone";
// import parserBabel from "prettier/parser-babel";
// import "./index.css";

// const callOllamaStream = async (prompt, onChunk) => {
//   const response = await fetch("http://localhost:11434/api/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: "deepseek-coder:1.3b",
//       prompt,
//       stream: true
//     })
//   });

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder("utf-8");
//   let buffer = "";

//   while (true) {
//     const { value, done } = await reader.read();
//     if (done) break;
//     buffer += decoder.decode(value);
//     const parts = buffer.split('\n');
//     buffer = parts.pop();
//     for (const part of parts) {
//       if (part.trim()) {
//         try {
//           const json = JSON.parse(part);
//           onChunk(json.response);
//         } catch (err) {
//           console.warn("JSON parse failed:", part);
//         }
//       }
//     }
//   }
// };

// function App() {
//   const [input, setInput] = useState('');
//   const [aiOutput, setAiOutput] = useState('');
//   const [editorLanguage, setEditorLanguage] = useState("javascript");
//   const [history, setHistory] = useState([]);
//   const editorRef = useRef(null);

//   const detectLanguage = (code) => {
//     if (code.includes("import React") || code.includes("useState")) return "javascript";
//     if (code.includes("def ")) return "python";
//     if (code.includes("#include") || code.includes("std::")) return "cpp";
//     if (code.includes("public class") || code.includes("System.out")) return "java";
//     return "javascript";
//   };

//   const formatCode = (code, language) => {
//     if (language === "javascript") {
//       try {
//         return prettier.format(code, {
//           parser: "babel",
//           plugins: [parserBabel]
//         });
//       } catch (e) {
//         console.warn("Prettier failed:", e);
//       }
//     }
//     return code;
//   };

//   const handleEditorMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
  
//     let streamed = "";
//     setAiOutput(""); // Reset previous output
//     if (editorRef.current) editorRef.current.setValue(""); // Clear editor
  
//     await callOllamaStream(input, (chunk) => {
//       streamed += chunk;
  
//       // Remove existing blinking cursor
//       const clean = streamed.replace(/▍$/, "");
  
//       // Add the blinking cursor to simulate typing
//       const codeWithCursor = clean + "▍";
  
//       const lang = detectLanguage(clean);
//       setEditorLanguage(lang);
//       setAiOutput(clean); // update side panel
  
//       // Set cursored content
//       if (editorRef.current) {
//         editorRef.current.setValue(codeWithCursor);
  
//         // Scroll to bottom automatically
//         editorRef.current.setScrollTop(editorRef.current.getScrollHeight());
//       }
//     });
  
//     // Finalize after stream ends (remove cursor)
//     const lang = detectLanguage(streamed);
//     if (editorRef.current) {
//       editorRef.current.setValue(streamed); // final clean version
//     }
//     setAiOutput(streamed);
//     setEditorLanguage(lang);
//     setHistory(prev => [...prev, { question: input, answer: streamed }]);
//     setInput("");
//   };
  
//   const handleImprove = () => {
//     const code = editorRef.current.getValue();
//     setInput(`Improve the following code:\n\n${code}`);
//   };

//   const handleExplain = () => {
//     const code = editorRef.current.getValue();
//     setInput(`Explain this code line by line:\n\n${code}`);
//   };

//   return (
//     <div className="flex h-screen w-screen">
//       {/* Sidebar */}
//       <div className="w-1/5 p-4 bg-gray-100 border-r flex flex-col">
//         <h2 className="text-lg font-bold mb-2">🧠 Chat</h2>
//         <textarea
//           className="w-full h-48 p-2 border rounded resize-none"
//           placeholder="Ask anything..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button onClick={handleSend} className="mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Send</button>
//         <button onClick={handleImprove} className="mt-2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Improve Code</button>
//         <button onClick={handleExplain} className="mt-2 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">Explain Code</button>
//       </div>

//       {/* Editor */}
//       <div className="flex-1">
//         <Editor
//           height="100vh"
//           language={editorLanguage}
//           defaultValue="// Write your code here..."
//           theme="vs-dark"
//           onMount={handleEditorMount}
//         />
//       </div>

//       {/* Output */}
//       <div className="w-1/5 p-4 bg-gray-50 border-l flex flex-col">
//         <h2 className="text-lg font-bold mb-2">💡 AI Output</h2>
//         <div className="bg-white border h-64 p-2 rounded overflow-y-auto whitespace-pre-wrap text-sm font-mono text-gray-700">
//           {aiOutput || '// AI responses will appear here'}
//         </div>
//         <div className="mt-4 text-sm">
//           <h3 className="font-semibold mb-1">🕘 History</h3>
//           <ul className="space-y-1 max-h-40 overflow-y-auto">
//             {history.map((item, i) => (
//               <li key={i} className="text-gray-600 border-b pb-1">
//                 <strong>Q:</strong> {item.question}<br />
//                 <strong>A:</strong> {item.answer.slice(0, 60)}...
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

////////////////////////////////////////// REFRESHED VERSION //////////////////////////////////////////

// import React, { useState, useRef } from 'react';
// import Editor from "@monaco-editor/react";
// import prettier from "prettier/standalone";
// import parserBabel from "prettier/parser-babel";
// import "./index.css";

// const callOllamaStream = async (prompt, onChunk) => {
//   const response = await fetch("http://localhost:11434/api/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: "deepseek-coder:1.3b",
//       prompt,
//       stream: true
//     })
//   });

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder("utf-8");
//   let buffer = "";

//   while (true) {
//     const { value, done } = await reader.read();
//     if (done) break;
//     buffer += decoder.decode(value);
//     const parts = buffer.split('\n');
//     buffer = parts.pop();
//     for (const part of parts) {
//       if (part.trim()) {
//         try {
//           const json = JSON.parse(part);
//           onChunk(json.response);
//         } catch (err) {
//           console.warn("JSON parse failed:", part);
//         }
//       }
//     }
//   }
// };

// function App() {
//   const [input, setInput] = useState('');
//   const [aiExplanation, setAiExplanation] = useState('');
//   const [editorLanguage, setEditorLanguage] = useState("javascript");
//   const [history, setHistory] = useState([]);
//   const editorRef = useRef(null);

//   const detectLanguage = (code) => {
//     if (code.includes("import React") || code.includes("useState")) return "javascript";
//     if (code.includes("def ")) return "python";
//     if (code.includes("#include") || code.includes("std::")) return "cpp";
//     if (code.includes("public class") || code.includes("System.out")) return "java";
//     return "javascript";
//   };

//   const formatCode = (code, language) => {
//     if (language === "javascript") {
//       try {
//         return prettier.format(code, {
//           parser: "babel",
//           plugins: [parserBabel]
//         });
//       } catch (e) {
//         console.warn("Prettier failed:", e);
//       }
//     }
//     return code;
//   };

//   const extractCodeBlock = (text) => {
//     const match = text.match(/```[a-z]*\n([\s\S]*?)```/);
//     return match ? match[1] : text;
//   };

//   const extractExplanationText = (text) => {
//     return text.replace(/```[a-z]*\n([\s\S]*?)```/, '').trim();
//   };

//   const handleEditorMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     let streamed = "";
//     setAiExplanation("");
//     if (editorRef.current) editorRef.current.setValue("");

//     await callOllamaStream(input + `\nOnly give code in ${editorLanguage} with no explanation`, (chunk) => {
//       streamed += chunk;
//       const clean = streamed.replace(/▍$/, "");
//       const codeOnly = extractCodeBlock(clean);
//       if (editorRef.current) {
//         editorRef.current.setValue(codeOnly);
//         editorRef.current.setScrollTop(editorRef.current.getScrollHeight());
//       }
//     });

//     setHistory(prev => [...prev, { question: input, answer: streamed }]);
//     setInput("");
//   };

//   const handleImprove = () => {
//     const code = editorRef.current.getValue();
//     setInput(`Improve the following ${editorLanguage} code:\n\n${code}`);
//   };

//   const handleExplain = async () => {
//     const code = editorRef.current.getValue();
//     let streamed = "";
//     setAiExplanation("");

//     await callOllamaStream(`Explain this ${editorLanguage} code in detail:\n\n${code}`, (chunk) => {
//       streamed += chunk;
//       setAiExplanation(extractExplanationText(streamed));
//     });

//     setHistory(prev => [...prev, { question: `Explain: ${code.slice(0, 30)}...`, answer: streamed }]);
//   };

//   return (
//     <div className="flex h-screen w-screen">
//       {/* Sidebar */}
//       <div className="w-1/5 p-4 bg-gray-100 border-r flex flex-col">
//         <h2 className="text-lg font-bold mb-1">🧠 Chat</h2>
//         <label className="text-xs mb-1 font-semibold">Editor Language</label>
//         <select
//           className="mb-2 p-1 border rounded"
//           value={editorLanguage}
//           onChange={(e) => setEditorLanguage(e.target.value)}
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>

//         <textarea
//           className="w-full h-48 p-2 border rounded resize-none"
//           placeholder="Ask anything..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button onClick={handleSend} className="mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Send</button>
//         <button onClick={handleImprove} className="mt-2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Improve Code</button>
//         <button onClick={handleExplain} className="mt-2 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">Explain Code</button>
//       </div>

//       {/* Editor */}
//       <div className="flex-1">
//         <Editor
//           height="100vh"
//           language={editorLanguage}
//           defaultValue="// Write your code here..."
//           theme="vs-dark"
//           onMount={handleEditorMount}
//         />
//       </div>

//       {/* Output */}
//       <div className="w-1/5 p-4 bg-gray-50 border-l flex flex-col">
//         <h2 className="text-lg font-bold mb-2">💡 Explanation</h2>
//         <div className="bg-yellow-50 border p-2 rounded overflow-y-auto text-sm whitespace-pre-wrap flex-1">
//           {aiExplanation || '// Click "Explain Code" to view explanation'}
//         </div>

//         <div className="mt-4 text-sm max-h-48 overflow-y-auto">
//           <h3 className="font-semibold mb-1">🕘 History</h3>
//           <ul className="space-y-1">
//             {history.map((item, i) => (
//               <li key={i} className="text-gray-600 border-b pb-1">
//                 <strong>Q:</strong> {item.question}<br />
//                 <strong>A:</strong> {item.answer.slice(0, 60)}...
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


/////////////////// // FINAL VERSION ///////////////////////

import React, { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import * as monaco from 'monaco-editor';
import "./index.css";

const callOllamaStream = async (prompt, onChunk) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "deepseek-coder:1.3b",
      prompt,
      stream: true
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value);
    const parts = buffer.split('\n');
    buffer = parts.pop();
    for (const part of parts) {
      if (part.trim()) {
        try {
          const json = JSON.parse(part);
          onChunk(json.response);
        } catch (err) {
          console.warn("JSON parse failed:", part);
        }
      }
    }
  }
};

function App() {
  const [input, setInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [history, setHistory] = useState([]);
  const editorRef = useRef(null);
  const [decorations, setDecorations] = useState([]);

  const detectLanguage = (code) => {
    if (code.includes("import React") || code.includes("useState")) return "javascript";
    if (code.includes("def ")) return "python";
    if (code.includes("#include") || code.includes("std::")) return "cpp";
    if (code.includes("public class") || code.includes("System.out")) return "java";
    return "javascript";
  };

  const formatCode = (code, language) => {
    if (language === "javascript") {
      try {
        return prettier.format(code, {
          parser: "babel",
          plugins: [parserBabel]
        });
      } catch (e) {
        console.warn("Prettier failed:", e);
      }
    }
    return code;
  };

  const handleEditorMount = (editor, monacoInstance) => {
    editorRef.current = editor;
  };

  const highlightLine = (lineNumber) => {
    if (editorRef.current) {
      const newDecorations = editorRef.current.deltaDecorations(
        decorations,
        [
          {
            range: new monaco.Range(lineNumber, 1, lineNumber, 1),
            options: {
              isWholeLine: true,
              className: 'highlight-line'
            }
          }
        ]
      );
      setDecorations(newDecorations);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    let streamed = "";
    setAiOutput("");
    if (editorRef.current) editorRef.current.setValue("");

    await callOllamaStream(input, (chunk) => {
      streamed += chunk;
      const clean = streamed.replace(/```[a-z]*|```/g, '').replace(/▍$/, "");
      const lang = detectLanguage(clean);
      setEditorLanguage(lang);
      setAiOutput(clean);
      if (editorRef.current) {
        editorRef.current.setValue(clean + "▍");
        editorRef.current.setScrollTop(editorRef.current.getScrollHeight());
      }
    });

    const lang = detectLanguage(streamed);
    if (editorRef.current) editorRef.current.setValue(streamed);
    setAiOutput(streamed);
    setEditorLanguage(lang);
    setHistory(prev => [...prev, { question: input, answer: streamed }]);
    setInput("");
  };

  const handleImprove = () => {
    const code = editorRef.current.getValue();
    setInput(`Improve the following code:\n\n${code}`);
  };

  const handleExplain = () => {
    const code = editorRef.current.getValue();
    setInput(`Explain this code line by line:\n\n${code}`);
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/5 p-4 bg-gray-100 border-r flex flex-col">
        <h2 className="text-lg font-bold mb-2">🧠 Chat</h2>
        <select
          className="mb-2 p-2 border rounded"
          value={editorLanguage}
          onChange={(e) => setEditorLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <textarea
          className="w-full h-48 p-2 border rounded resize-none"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} className="mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Send</button>
        <button onClick={handleImprove} className="mt-2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Improve Code</button>
        <button onClick={handleExplain} className="mt-2 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">Explain Code</button>
      </div>

      <div className="flex-1">
        <Editor
          height="100vh"
          language={editorLanguage}
          defaultValue="// Write your code here..."
          theme="vs-dark"
          onMount={handleEditorMount}
        />
      </div>

      <div className="w-1/5 p-4 bg-gray-50 border-l flex flex-col">
        <h2 className="text-lg font-bold mb-2">💡 Explanation</h2>
        <div className="bg-white border h-64 p-2 rounded overflow-y-auto whitespace-pre-wrap text-sm font-mono text-gray-700">
          {aiOutput || '// AI explanation will appear here'}
        </div>
        <div className="mt-4 text-sm">
          <h3 className="font-semibold mb-1">🕘 History</h3>
          <ul className="space-y-1 max-h-40 overflow-y-auto">
            {history.map((item, i) => (
              <li key={i} className="text-gray-600 border-b pb-1">
                <strong>Q:</strong> {item.question}<br />
                <strong>A:</strong> {item.answer.slice(0, 60)}...
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
