import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from '../components/ChatAi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Editorial from '../components/Editorial';
import Loader from '../components/Loader';
import confetti from 'canvas-confetti';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  js: 'JavaScript'
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('js');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Mobile: which main panel is shown — 'problem' or 'editor'
  const [mobilePanelTab, setMobilePanelTab] = useState('problem');
  const editorRef = useRef(null);
  const { problemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const contestId = location.state?.contestId;
  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode || '';
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        toast.error('Failed to load problem. Please try again.');
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

const normalizeLang = (lang) => {
  if (lang === "js") return "javascript";
  if (lang === "c++") return "cpp";
  return lang.toLowerCase();
};

useEffect(() => {
  if (problem && problem.startCode) {
    const lang = normalizeLang(selectedLanguage);

    const codeObj = problem.startCode.find(
      sc => sc.language.toLowerCase() === lang
    );

    setCode(codeObj?.initialCode || "// No start code");
  }
}, [selectedLanguage, problem]);

  const handleEditorChange = (value) => setCode(value || '');
  const handleEditorDidMount = (editor) => { editorRef.current = editor; };
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  const handleRun = async () => {
    setIsRunning(true);
    setRunResult(null);
    toast.info('Running code...', { autoClose: 1500 });
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, { code, language: selectedLanguage });
      setRunResult(response.data);
      setActiveRightTab('testcase');
      if (response.data.success) toast.success('Code executed successfully!');
      else toast.error('Some test cases failed.');
    } catch (error) {
      setRunResult({ success: false, error: 'Network error or server issue.' });
      setActiveRightTab('testcase');
      toast.error('Failed to run code.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);
    toast.info('Submitting solution...', { autoClose: 1500 });
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, { 
        code, 
        language: selectedLanguage,
        contestId: contestId
      });
      setSubmitResult(response.data);
      setActiveRightTab('result');
      if (response.data.accepted) {
        toast.success('Solution Accepted! 🎉');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#3b82f6', '#22c55e']
        });
      }
      else toast.error('Submission failed. Try again!');
    } catch (error) {
      setSubmitResult({ accepted: false, error: 'Submission failed or network issue.' });
      setActiveRightTab('result');
      toast.error('Failed to submit code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'js': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'hard': return 'text-red-500 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  /* ─── LEFT PANEL CONTENT ─── */
  const LeftContent = () => (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Left Tabs — scrollable on small screens */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-700 bg-gray-800 shrink-0">
        {[
          { key: 'description', label: 'Description' },
          { key: 'editorial', label: 'Editorial' },
          { key: 'solutions', label: 'Solutions' },
          { key: 'submissions', label: 'Submissions' },
          { key: 'chatAI', label: 'AI Chat' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveLeftTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
              activeLeftTab === tab.key
                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-900'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Left Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          problem && (
            <div className="p-4 md:p-6">
              {activeLeftTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white mb-3">{problem.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                      {problem.tags && (
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-700 text-gray-300 border border-gray-600">
                          {problem.tags}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-300 leading-relaxed text-sm md:text-base">{problem.description}</div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                          <p className="text-sm font-semibold text-blue-400 mb-2">Example {index + 1}:</p>
                          <div className="space-y-1 text-sm font-mono">
                            <p className="text-gray-300"><span className="text-gray-500">Input:</span> {example.input}</p>
                            <p className="text-gray-300"><span className="text-gray-500">Output:</span> {example.output}</p>
                            {example.explanation && (
                              <p className="text-gray-400 font-sans mt-2"><span className="text-gray-500">Explanation:</span> {example.explanation}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'editorial' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Editorial</h2>
                  <Editorial problem={problem} />
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Solutions</h2>
                  {problem.referenceSolution?.length > 0
                    ? problem.referenceSolution.map((solution, index) => (
                        <div key={index} className="mb-6 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                          <div className="px-4 py-2 bg-gray-750 border-b border-gray-700 text-sm font-medium text-gray-300">
                            {problem?.title} — {solution?.language}
                          </div>
                          <pre className="overflow-x-auto p-4 text-sm text-gray-200 leading-relaxed">
                            <code>{solution?.completeCode}</code>
                          </pre>
                        </div>
                      ))
                    : <p className="text-gray-400 text-sm">Solutions will be available after you solve the problem.</p>
                  }
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">My Submissions</h2>
                  <SubmissionHistory problemId={problemId} />
                </div>
              )}

              {activeLeftTab === 'chatAI' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">AI Assistant</h2>
                  <ChatAi problem={problem} />
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );

  /* ─── RIGHT PANEL CONTENT ─── */
  const RightContent = () => (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700 shrink-0">
        {/* Language Selector */}
        <div className="flex bg-gray-700 rounded-lg p-0.5 gap-0.5">
          {['js', 'java', 'cpp'].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {langMap[lang]}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                Running
              </>
            ) : 'Run'}
          </button>
          <button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting
              </>
            ) : 'Submit'}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={getLanguageForMonaco(selectedLanguage)}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            automaticLayout: true,
            padding: { top: 12 },
          }}
        />
      </div>

      {/* Bottom Tabs */}
      <div className="flex border-t border-gray-700 bg-gray-800 shrink-0">
        {[
          { key: 'testcase', label: 'Test Result' },
          { key: 'result', label: 'Submission' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveRightTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeRightTab === tab.key
                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-900'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bottom Content */}
      <div className="h-40 md:h-48 overflow-y-auto bg-gray-950 shrink-0">
        {activeRightTab === 'testcase' && (
          <div className="p-3 text-sm">
            {runResult ? (
              runResult.success ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3 text-green-400 font-semibold">
                    <span>✓ All Test Cases Passed</span>
                    <span className="text-gray-400 font-normal">Runtime: {runResult.runtime} ms</span>
                    <span className="text-gray-400 font-normal">Memory: {runResult.memory} KB</span>
                  </div>
                  {runResult.testCases?.map((tc, i) => (
                    <div key={i} className="bg-gray-800 rounded p-3 space-y-1 font-mono text-xs border border-gray-700">
                      <p className="text-gray-400">Input: <span className="text-gray-200">{tc.stdin}</span></p>
                      <p className="text-gray-400">Expected: <span className="text-gray-200">{tc.expected_output}</span></p>
                      <p className="text-gray-400">Output: <span className="text-gray-200">{tc.stdout}</span></p>
                      <p className="text-green-400">✓ Passed</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-red-400 font-semibold">✗ Test Failed</p>
                  {runResult.error && <p className="text-red-300 text-xs bg-red-900/20 p-2 rounded">{runResult.error}</p>}
                  {runResult.testCases?.map((tc, i) => (
                    <div key={i} className="bg-gray-800 rounded p-3 space-y-1 font-mono text-xs border border-gray-700">
                      <p className="text-gray-400">Input: <span className="text-gray-200">{tc.stdin}</span></p>
                      <p className="text-gray-400">Expected: <span className="text-gray-200">{tc.expected_output}</span></p>
                      <p className="text-gray-400">Output: <span className="text-gray-200">{tc.stdout}</span></p>
                      <p className={tc.status_id === 3 ? 'text-green-400' : 'text-red-400'}>
                        {tc.status_id === 3 ? '✓ Passed' : '✗ Failed'}
                      </p>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <p className="text-gray-500 text-center mt-8">Click "Run" to test your code with example inputs</p>
            )}
          </div>
        )}

        {activeRightTab === 'result' && (
          <div className="p-3 text-sm">
            {submitResult ? (
              submitResult.accepted ? (
                <div className="space-y-2">
                  <p className="text-green-400 font-bold text-base">✓ Accepted</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span>Test Cases: <span className="text-gray-200">{submitResult.passedTestCases}/{submitResult.totalTestCases}</span></span>
                    <span>Runtime: <span className="text-gray-200">{submitResult.runtime} ms</span></span>
                    <span>Memory: <span className="text-gray-200">{submitResult.memory} KB</span></span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-red-400 font-bold text-base">✗ {submitResult.error || 'Wrong Answer'}</p>
                  <p className="text-xs text-gray-400">Test Cases: <span className="text-gray-200">{submitResult.passedTestCases}/{submitResult.totalTestCases}</span></p>
                  {submitResult.message && <p className="text-xs text-gray-400 bg-gray-800 p-2 rounded">{submitResult.message}</p>}
                </div>
              )
            ) : (
              <p className="text-gray-500 text-center mt-8">Submit your solution to see the results</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <ToastContainer position="top-center" theme="dark" />

      {/* Contest Banner */}
      {contestId && (
        <div className="bg-purple-600/20 border-b border-purple-500/30 px-4 py-2 flex items-center justify-center gap-3 shrink-0">
          <Trophy size={16} className="text-purple-400 animate-bounce" />
          <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
            Contest Mode Active — Submissions will be scored
          </span>
          <button 
            onClick={() => navigate(`/contest/${contestId}`)}
            className="text-[10px] bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full font-black transition-all ml-4"
          >
            Back to Dashboard
          </button>
        </div>
      )}

      {/* ── Mobile Top Tab Bar (visible only on small screens) ── */}
      <div className="flex md:hidden border-b border-gray-700 bg-gray-800 shrink-0">
        <button
          onClick={() => setMobilePanelTab('problem')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            mobilePanelTab === 'problem'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400'
          }`}
        >
          Problem
        </button>
        <button
          onClick={() => setMobilePanelTab('editor')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            mobilePanelTab === 'editor'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400'
          }`}
        >
          Code Editor
        </button>
      </div>

      {/* ── Main Area ── */}
      <div className="flex-1 min-h-0 flex">

        {/* Desktop: side-by-side split | Mobile: full-width tabs */}

        {/* Left Panel */}
        <div
          className={`
            ${mobilePanelTab === 'problem' ? 'flex' : 'hidden'}
            md:flex flex-col
            w-full md:w-1/2 md:border-r border-gray-700
          `}
        >
          <LeftContent />
        </div>

        {/* Right Panel */}
        <div
          className={`
            ${mobilePanelTab === 'editor' ? 'flex' : 'hidden'}
            md:flex flex-col
            w-full md:w-1/2
          `}
        >
          <RightContent />
        </div>

      </div>
    </div>
  );
};

export default ProblemPage;