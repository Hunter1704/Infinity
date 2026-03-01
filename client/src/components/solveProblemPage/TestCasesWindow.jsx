import { useEffect, useState } from "react";
import { XMarkIcon } from "../Icons/SolveProblemPageIcons";
import { RefreshCcw } from "lucide-react";
const bottomTabs = ['Testcase', 'Test Result'];

const getResultStatus = (status) => {
  switch (status) {
    case 'accepted':
      return 'Accepted';
    case 'wrong-answer':
      return 'Wrong Answer';
    case 'compilation-error':
      return 'Compilation Error';
    case 'runtime-error':
      return 'Runtime Error';
    case 'tle':
      return 'Time Limit Exceeded';
    case 'pending':
      return 'Pending';
    default:
      return '';
  }
}


const TestCasesWindow = ({ testCases, onClose, testResultsLoading, testResults }) => {
  const [activeTab, setActiveTab] = useState(testResultsLoading ? 'Test Result' : 'Testcase');
  const [activeCase, setActiveCase] = useState(1);
  const [activeResultCase, setActiveResultCase] = useState(1);

  useEffect(() => {
    if (testResultsLoading)
      setActiveTab('Test Result');
  }, [testResultsLoading]);

  return (
    <div className="h-full flex-grow flex flex-col overflow-auto">
      <div className="flex sticky top-0 z-10 bg-gray-100 dark:bg-slate-900 border-b border-gray-300 dark:border-slate-700 flex-shrink-0">
        {bottomTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-xs font-medium focus:outline-none ${activeTab === tab
                ? 'text-orange-500 border-b-2 border-orange-500 bg-white dark:bg-slate-800'
                : 'text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100 hover:bg-gray-200 dark:hover:bg-slate-800/60'
              }`}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={onClose}
          className={` my-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200 ml-auto mr-2`}
          aria-label="Close testcases window"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-grow p-4 bg-white dark:bg-slate-800 overflow-y-auto">
        {activeTab === 'Testcase' && (
          <div className="space-y-4 text-gray-800 dark:text-slate-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {testCases.map((_, index) => (
                <button
                  key={`case${index + 1}`}
                  onClick={() => setActiveCase(index + 1)}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-200 border ${activeCase === index + 1
                      ? "bg-orange-500/10 border-orange-500 text-orange-500 shadow-sm"
                      : "bg-gray-100 dark:bg-slate-700 border-transparent text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                    }`}
                >
                  {`Case ${index + 1}`}
                </button>
              ))}
            </div>
            {testCases.map((testCase, index) => (
              <div key={`case-content-${index}`} className={`space-y-4 animate-in fade-in duration-300 ${index + 1 === activeCase ? "" : "hidden"}`}>
                {testCase.input && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">Input</label>
                    <div className="w-full px-3 py-2 text-sm font-mono rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 select-all">
                      {testCase.input}
                    </div>
                  </div>
                )}
                {testCase.target && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">Target</label>
                    <div className="w-full px-3 py-2 text-sm font-mono rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 select-all">
                      {testCase.target}
                    </div>
                  </div>
                )}
                {testCase.output && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">Expected Output</label>
                    <div className="w-full px-3 py-2 text-sm font-mono rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 select-all">
                      {testCase.output}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Test Result' && (
          testResultsLoading ? (
            <div className="h-full w-full flex flex-col items-center justify-center p-8 transition-all ease-out">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-orange-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 animate-spin"></div>
              </div>
              <p className="text-base font-medium text-gray-700 dark:text-slate-200">Running your solution...</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Checking against test cases</p>
            </div>
          ) : testResults ? (
            <div className="space-y-4 text-gray-800 dark:text-slate-100">
              <div className="flex flex-wrap gap-2 mb-4">
                {testCases.map((_, index) => {
                  const isAccepted = testResults[index].status === "accepted";
                  const isActive = activeResultCase === index + 1;
                  return (
                    <button
                      key={`result-case${index + 1}`}
                      onClick={() => setActiveResultCase(index + 1)}
                      className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-200 border ${isActive
                          ? isAccepted
                            ? "bg-green-600 border-green-600 text-white shadow-sm"
                            : "bg-red-600 border-red-600 text-white shadow-sm"
                          : isAccepted
                            ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20"
                            : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20"
                        }`}
                    >
                      {`Case ${index + 1}`}
                    </button>
                  );
                })}
              </div>
              {testCases.map((testCase, index) => {
                const result = testResults[index];
                const isVisible = index + 1 === activeResultCase;
                const isCorrect = result.status === "accepted" || result.status === "wrong-answer";

                return (
                  <div key={`result-content-${index}`} className={`space-y-4 animate-in slide-in-from-bottom-2 duration-300 ${isVisible ? "" : "hidden"}`}>
                    <div className={`p-4 rounded-xl border ${result.status === 'accepted'
                        ? "bg-green-50/50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20"
                        : "bg-red-50/50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"
                      }`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-lg font-bold ${result.status === 'accepted' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          }`}>
                          {getResultStatus(result.status)}
                        </span>
                        {result.runtime && (
                          <span className="text-xs text-gray-500 dark:text-slate-400 font-mono bg-gray-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                            {result.runtime}ms
                          </span>
                        )}
                      </div>

                      {isCorrect ? (
                        <div className="space-y-4">
                          {testCase.input && (
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">Input</label>
                              <div className="w-full px-3 py-1.5 text-sm font-mono rounded-lg bg-white/50 dark:bg-slate-900/30 border border-gray-200 dark:border-slate-700/50 select-all text-gray-800 dark:text-slate-200">
                                {testCase.input}
                              </div>
                            </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">Expected</label>
                              <div className="w-full px-3 py-1.5 text-sm font-mono rounded-lg bg-white/50 dark:bg-slate-900/30 border border-gray-200 dark:border-slate-700/50 select-all text-gray-800 dark:text-slate-200">
                                {testCase.output}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">Yours</label>
                              <div className={`w-full px-3 py-1.5 text-sm font-mono rounded-lg bg-white/50 dark:bg-slate-900/30 border select-all ${result.status === 'accepted'
                                  ? "border-green-500/30 text-green-700 dark:text-green-300"
                                  : "border-red-500/30 text-red-700 dark:text-red-300"
                                }`}>
                                {result.output}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">Error Message</label>
                          <pre className="w-full p-3 text-xs sm:text-sm font-mono rounded-lg bg-slate-900 text-red-400 overflow-x-auto whitespace-pre-wrap border border-red-500/20">
                            {result.errorMessage}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center text-gray-500 dark:text-slate-400">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <RefreshCcw className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-base font-medium">No results to show</p>
              <p className="text-xs mt-1">Run your code to check against test cases</p>
            </div>
          )
        )}
      </div>

    </div>
  )
}

export default TestCasesWindow;