import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Trophy } from 'lucide-react';
import { MOCK_COURSES, APP_ROUTES, courses } from '../utils/constants';
import { ContestCard } from '../components';
import LectureVideoPlayer from '../components/coursePage/LectureVideo';
import RelatedProblemLink from '../components/coursePage/RelatedProblem';
import { useMemo } from 'react';
import { VideoCameraIcon, DocumentTextIcon, ChatBubbleLeftEllipsisIcon, PaperClipIcon, ChevronDownIcon, ChevronUpIcon, PuzzlePieceIcon, BookOpenIcon, ArrowLeftIcon, InformationCircleIcon, CheckCircleIcon, CheckBadgeIcon, ArrowRightIcon } from '../components/Icons/CoursesPageIcons';

export const ALL_CONTESTS = [
  {
    id: 'c2',
    name: 'Biweekly Contest #102',
    startTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000)).toISOString(),
    participants: 0,
    description: 'Our biweekly contest for all skill levels. A great way to practice under pressure.',
    rules: ['Contest duration is 120 minutes.', 'No penalties for incorrect submissions.'],
    prizes: ['Top 20: 500 Infinity Coins'],
    problemIds: ['p1', 'p4', 'p2']
  },
  {
    id: 'c1',
    name: 'Weekly Contest #345',
    startTime: new Date(new Date().getTime() - 1 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString(),
    participants: 1284,
    description: 'A weekly contest featuring one easy, two medium, and one hard problem.',
    rules: ['Contest duration is 90 minutes.'],
    prizes: ['Top 10: 1000 Infinity Coins'],
    problemIds: ['p9', 'p6', 'p5', 'p7']
  }
];

const getContestStatus = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return 'upcoming';
  if (now >= start && now <= end) return 'live';
  return 'ended';
};

const mockDiscussions = [
  {
    id: 'd1',
    user: { name: 'Alice Wonder', avatarSeed: 'alice' },
    date: '2 days ago',
    text: 'Great explanation of Big O notation! I was always a bit confused about the difference between O(n log n) and O(n^2) in practice, but the examples here made it click.',
    replies: [
      { id: 'r1', user: { name: 'Bob The Builder', avatarSeed: 'bob' }, date: '1 day ago', text: 'Totally agree! The visualization for QuickSort partitioning really helped me too.' },
      { id: 'r2', user: { name: 'Instructor Eve', avatarSeed: 'inst_eve' }, date: '1 day ago', text: 'Glad you found it helpful, Alice! Keep an eye on the attachments for some extra practice problems on complexity analysis.' },
    ]
  },
  {
    id: 'd2',
    user: { name: 'Charlie Code', avatarSeed: 'charlie' },
    date: '5 hours ago',
    text: 'Is there a simpler way to handle state in the React example without using reducers for smaller components? Just curious about best practices for tiny apps.',
  }
];

const ContestsPage = () => {
  const { courseId: paramCourseId, lectureId } = useParams();
  const navigate = useNavigate();

  // DEBUG: Fallback to a default playlist if no ID is provided in params (common on /contests route)
  const courseId = paramCourseId || "PLQEaRBV9gAFsdNoZYUcVG6ygpwd0lUrIH";

  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isCurriculumSidebarVisible, setIsCurriculumSidebarVisible] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [completedLectures, setCompletedLectures] = useState({});

  const TABS_CONFIG = [
    {
      id: 'description',
      name: 'Description',
      icon: DocumentTextIcon,
      renderContent: (lecture) => (
        <div className="prose prose-sm dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
          <p dangerouslySetInnerHTML={{ __html: lecture.snippet?.description.replace(/\n/g, '<br/>') }}></p>
        </div>
      ),
    },
    {
      id: 'discussion',
      name: 'Discussion',
      icon: ChatBubbleLeftEllipsisIcon,
      renderContent: (lecture) => (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Lecture Discussion</h3>
          <div className="space-y-6">
            {mockDiscussions.map((thread, index) => (
              <div key={thread.id} className={`p-4 bg-slate-100 dark:bg-slate-800 rounded-lg shadow ${index < mockDiscussions.length - 1 ? "border-b border-slate-200 dark:border-slate-700 pb-6" : ""}`}>
                <div className="flex items-start space-x-3">
                  <img
                    src={`https://i.pravatar.cc/40?u=${thread.user.avatarSeed}`}
                    alt={thread.user.name}
                    className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-slate-200 dark:border-slate-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-orange-500 dark:text-orange-400">{thread.user.name}</span>
                      <span className="text-xs text-slate-500">{thread.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{thread.text}</p>
                  </div>
                </div>
                {thread.replies && thread.replies.length > 0 && (
                  <div className="ml-10 mt-4 pl-4 border-l border-slate-300 dark:border-slate-700 space-y-4">
                    {thread.replies.map(reply => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <img
                          src={`https://i.pravatar.cc/32?u=${reply.user.avatarSeed}`}
                          alt={reply.user.name}
                          className="w-8 h-8 rounded-full flex-shrink-0 border border-slate-300 dark:border-slate-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-orange-500 dark:text-orange-300">{reply.user.name}</span>
                            <span className="text-xs text-slate-500">{reply.date}</span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button className="mt-4 text-xs text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400 hover:underline">Reply to thread</button>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <textarea
              className="w-full p-3 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-slate-400 dark:placeholder-slate-400"
              rows={3}
              placeholder={`Ask a question or share your thoughts on "${lecture.title}"...`}
            ></textarea>
            <button className="btn btn-primary mt-3">
              Post Comment
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'attachments',
      name: 'Attachments',
      icon: PaperClipIcon,
      renderContent: (lecture) => (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Attachments</h3>
          {lecture.attachments && lecture.attachments.length > 0 ? (
            <ul className="space-y-3">
              {lecture.attachments.map((att, index) => (
                <li key={index} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md flex items-center justify-between hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group">
                  <div className="flex items-center">
                    <PaperClipIcon className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 group-hover:text-orange-400 dark:group-hover:text-orange-300" />
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">{att.name}</span>
                      <span className="block text-xs text-slate-500">{att.size}</span>
                    </div>
                  </div>
                  <a href={att.url} download className="text-sm text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400 font-medium p-2 rounded-md hover:bg-slate-300/50 dark:hover:bg-slate-750">Download</a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <InformationCircleIcon className="w-12 h-12 mx-auto mb-3 text-slate-400 dark:text-slate-500" />
              <p className="font-medium">No Attachments Available</p>
              <p className="text-sm">There are no supplementary files for this lecture.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'problems',
      name: 'Related Problems',
      icon: PuzzlePieceIcon,
      renderContent: (lecture) => (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Practice Problems</h3>
          {lecture.relatedProblemIds && lecture.relatedProblemIds.length > 0 ? (
            <div className="space-y-3">
              {lecture.relatedProblemIds.map((problemId) => (
                <RelatedProblemLink key={problemId} problemId={problemId} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <PuzzlePieceIcon className="w-12 h-12 mx-auto mb-3 text-slate-400 dark:text-slate-500" />
              <p className="font-medium">No Specific Problems Linked</p>
              <p className="text-sm">Check the main problem list for general practice exercises.</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getCourse = async () => {
      try {
        if (!courseId) return;

        let allItems = [];
        let nextPageToken = "";

        // ✅ Proper YouTube pagination
        do {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${courseId}&maxResults=50&key=${import.meta.env.VITE_YT_V3_API_KEY}`
          );

          const data = await response.json();

          if (data.items) {
            allItems.push(...data.items);
          }

          nextPageToken = data.nextPageToken || "";
        } while (nextPageToken);

        // ✅ Find course safely
        const foundCourse = courses?.find(
          (c) => String(c.id) === String(courseId)
        ) || { id: courseId, title: "Contests Playlist", curriculum: [] };

        // ✅ Create updated course (NO mutation)
        const updatedCourse = {
          ...foundCourse,
          curriculum: [
            {
              id: "rm1",
              title: foundCourse.title,
              lectures: allItems,
            },
          ],
        };

        setCourse(updatedCourse);

        // ✅ IMPORTANT: Use updatedCourse here
        let lectureFound = false;
        let initialExpandedModules = {};

        for (const module of updatedCourse.curriculum) {
          const lecture = module.lectures.find(
            (l) => l.contentDetails?.videoId === lectureId
          );

          if (lecture) {
            setCurrentLecture(lecture);
            initialExpandedModules[module.id] = true;
            lectureFound = true;
            break;
          }
        }

        // If no specifically selected lecture, default to the first one available
        if (!lectureFound && updatedCourse.curriculum?.[0]?.lectures?.[0]) {
          setCurrentLecture(updatedCourse.curriculum[0].lectures[0]);
          initialExpandedModules[updatedCourse.curriculum[0].id] = true;
        }

        setExpandedModules(initialExpandedModules);

      } catch (error) {
        console.log("YouTube Fetch Error:", error);
      }
    };

    getCourse();
  }, [courseId, lectureId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleLectureSelect = (newLectureId) => {
    const targetUrl = paramCourseId
      ? APP_ROUTES.courseContent.replace(':courseId', courseId).replace(':lectureId', newLectureId)
      : `/contests?lectureId=${newLectureId}`; // Fallback if no courseId in URL

    // For simplicity in this "debugged" version, we'll just update state if no route match
    if (!paramCourseId) {
      const lecture = course.curriculum[0].lectures.find(l => l.contentDetails?.videoId === newLectureId);
      if (lecture) setCurrentLecture(lecture);
    } else {
      navigate(targetUrl);
    }

    if (window.innerWidth < 768) {
      setIsCurriculumSidebarVisible(false);
    }
  };

  const toggleLectureComplete = () => {
    if (currentLecture) {
      setCompletedLectures(prev => ({
        ...prev,
        [currentLecture.contentDetails?.videoId]: !prev[currentLecture.contentDetails?.videoId]
      }));
    }
  };

  const contestsWithStatus = useMemo(() => {
    return ALL_CONTESTS.map((contest) => ({
      ...contest,
      status: getContestStatus(contest.startTime, contest.endTime),
    })).sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }, []);

  const liveAndUpcomingContests = contestsWithStatus.filter(
    (c) => c.status === 'live' || c.status === 'upcoming'
  );

  const pastContests = contestsWithStatus
    .filter((c) => c.status === 'ended')
    .reverse();

  const onViewContest = () => {
    alert("You can view contest details after 2 days.")
  }

  if (!course || !currentLecture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
        Loading content...
      </div>
    );
  }

  const lectureIndexInfo = (() => {
    let currentLectureIndex = -1;
    const flatLectures = [];
    course.curriculum.forEach(module => module.lectures.forEach(lec => flatLectures.push(lec)));
    const totalLecturesInCourse = flatLectures.length;

    let prevLectureId = null;
    let nextLectureId = null;

    for (let i = 0; i < totalLecturesInCourse; i++) {
      if (flatLectures[i].contentDetails?.videoId === currentLecture.contentDetails?.videoId) {
        currentLectureIndex = i;
        if (i > 0) prevLectureId = flatLectures[i - 1].contentDetails?.videoId;
        if (i < totalLecturesInCourse - 1) nextLectureId = flatLectures[i + 1].contentDetails?.videoId;
        break;
      }
    }
    return { currentLectureIndex, totalLecturesInCourse, prevLectureId, nextLectureId };
  })();

  const activeTabConfig = TABS_CONFIG.find(t => t.id === activeTab);

  const completedCount = Object.values(completedLectures).filter(Boolean).length;
  const courseProgress = lectureIndexInfo.totalLecturesInCourse > 0
    ? (completedCount / lectureIndexInfo.totalLecturesInCourse) * 100
    : 0;


  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Contest Listing Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 pt-12 pb-20'>
        <div className="text-center mb-12">
          <Trophy className="mx-auto h-12 w-12 text-indigo-500 dark:text-indigo-400 mb-4" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Coding Contests
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Test your skills, compete with others, and win exciting prizes.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-3 border-b-2 border-indigo-500">
              Live & Upcoming
            </h2>
            {liveAndUpcomingContests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveAndUpcomingContests.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    contest={contest}
                    onViewContest={onViewContest}
                  />
                ))}
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">
                No live or upcoming contests right now. Check back soon!
              </p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">
              Past Contests
            </h2>
            {pastContests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastContests.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    contest={contest}
                    onViewContest={onViewContest}
                  />
                ))}
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">
                No past contests available.
              </p>
            )}
          </section>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 my-10"></div>

      {/* Tutorial/Video Section (Original logic preserved) */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Contest Tutorials & Solutions</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Watch detailed explanations of previous contest problems.</p>
      </div>

      <div className="flex flex-col md:flex-row h-[800px] bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden relative border-t border-slate-200 dark:border-slate-800">
        <main className="flex-1 md:w-2/3 flex flex-col overflow-y-auto dark-scrollbar bg-white dark:bg-slate-950 max-h-full">
          <header className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 sticky top-0 bg-white dark:bg-slate-950 z-20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate">{currentLecture.snippet?.title}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Playlist: <span className="font-semibold">{course.title}</span>
                </p>
              </div>
              <button
                onClick={() => setIsCurriculumSidebarVisible(!isCurriculumSidebarVisible)}
                className="md:hidden p-2 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 rounded-md"
                aria-label="Toggle curriculum"
                aria-expanded={isCurriculumSidebarVisible}
              >
                <BookOpenIcon className="w-6 h-6" />
              </button>
            </div>
          </header>

          <div className="p-3 md:p-6 flex-grow">
            <LectureVideoPlayer videoUrl={`https://www.youtube.com/embed/${currentLecture.contentDetails?.videoId}`} title={currentLecture.snippet?.title} />

            <div className="mt-4 md:mt-6 flex flex-wrap justify-between items-center gap-2">
              <button
                onClick={lectureIndexInfo.prevLectureId ? () => handleLectureSelect(lectureIndexInfo.prevLectureId) : undefined}
                disabled={!lectureIndexInfo.prevLectureId}
                className={`btn btn-secondary ${!lectureIndexInfo.prevLectureId ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Previous
              </button>

              <button
                onClick={toggleLectureComplete}
                className={`btn min-w-[180px] border ${completedLectures[currentLecture.contentDetails?.videoId]
                  ? 'bg-green-600 hover:bg-green-700 text-white border-green-500 focus:ring-green-400'
                  : 'bg-slate-600 hover:bg-slate-500 text-slate-200 border-slate-500 focus:ring-slate-400'}`}
              >
                {completedLectures[currentLecture.contentDetails?.videoId] ?
                  <CheckBadgeIcon className="w-5 h-5 mr-1.5" /> :
                  <CheckCircleIcon className="w-5 h-5 mr-1.5 opacity-70" />
                }
                {completedLectures[currentLecture.contentDetails?.videoId] ? 'Completed' : 'Mark as Complete'}
              </button>

              <button
                onClick={lectureIndexInfo.nextLectureId ? () => handleLectureSelect(lectureIndexInfo.nextLectureId) : undefined}
                disabled={!lectureIndexInfo.nextLectureId}
                className={`btn btn-primary ${!lectureIndexInfo.nextLectureId ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next <ArrowRightIcon className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            <div className="mt-6 md:mt-8">
              <div className="border-b border-slate-200 dark:border-slate-700 mb-4">
                <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto" aria-label="Tabs">
                  {TABS_CONFIG.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`whitespace-nowrap py-3 px-2 sm:px-3 border-b-2 font-medium text-sm flex items-center transition-all rounded-t-md
                        ${activeTab === tab.id
                          ? 'border-orange-500 text-orange-500 bg-orange-500/10 dark:bg-slate-800'
                          : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                        }`}
                      aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                      <tab.icon className={`w-5 h-5 mr-1.5 sm:mr-2 ${activeTab === tab.id ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400'}`} />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div key={activeTab} className="py-4 animate-fadeIn">
                {activeTabConfig ? activeTabConfig.renderContent(currentLecture) : null}
              </div>
            </div>
          </div>
        </main>

        <aside className={`
            fixed inset-y-0 right-0 z-30 w-full max-w-xs sm:max-w-sm 
            transform transition-transform duration-300 ease-in-out
            bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden
            md:static md:w-1/3 md:max-w-none md:translate-x-0 md:flex-shrink-0 md:z-auto shadow-lg
        `}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-orange-500">
                <BookOpenIcon className="w-5 h-5 mr-2" />
                <h2 className="text-md font-semibold truncate">{course.title}</h2>
              </div>
              <button
                onClick={() => setIsCurriculumSidebarVisible(false)}
                className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 rounded-md"
                aria-label="Close curriculum"
              >
                <ChevronUpIcon className="w-5 h-5 transform rotate-90" />
              </button>
            </div>

            {lectureIndexInfo.totalLecturesInCourse > 0 && (
              <div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{completedCount} / {lectureIndexInfo.totalLecturesInCourse} videos</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 shadow-inner">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${courseProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 py-2 overflow-y-auto dark-scrollbar">
            {course.curriculum.map((module) => (
              <div key={module.id} className="mb-1">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex justify-between items-center px-4 py-2.5 text-sm font-medium text-left text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-slate-200 dark:focus:bg-slate-700 focus:ring-1 focus:ring-orange-500 transition-colors rounded-md mx-2"
                  aria-expanded={expandedModules[module.id]}
                  aria-controls={`module-lectures-${module.id}`}
                >
                  <span className="truncate">{module.title}</span>
                  <ChevronDownIcon className={`w-4 h-4 text-slate-500 dark:text-slate-400 transform transition-transform duration-300 ${expandedModules[module.id] ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedModules[module.id] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                  <ul id={`module-lectures-${module.id}`} className="pl-5 border-l-2 border-slate-200 dark:border-slate-700 ml-5 py-1 mt-1">
                    {module.lectures.map((lecture) => (
                      <li key={lecture.contentDetails?.videoId}>
                        <button
                          onClick={() => handleLectureSelect(lecture.contentDetails?.videoId)}
                          className={`w-full text-left px-3 py-2 text-xs rounded-md transition-all my-0.5 group ${lecture.contentDetails?.videoId === currentLecture?.contentDetails?.videoId
                            ? 'bg-orange-600 text-white font-semibold shadow-md ring-1 ring-orange-400'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-orange-500 dark:hover:text-orange-400'
                            }`}
                          aria-current={lecture.contentDetails?.videoId === currentLecture?.contentDetails?.videoId ? "page" : undefined}
                        >
                          <div className="flex items-center">
                            {completedLectures[lecture.contentDetails?.videoId] ? (
                              <CheckBadgeIcon
                                className={`w-4 h-4 mr-2 flex-shrink-0 ${lecture.contentDetails?.videoId === currentLecture?.contentDetails?.videoId ? 'text-white' : 'text-green-400 group-hover:text-green-300'}`} />
                            ) : (
                              <VideoCameraIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${lecture.contentDetails?.videoId === currentLecture?.contentDetails?.videoId ? 'text-white' : 'text-slate-500 group-hover:text-orange-500 dark:text-slate-400 dark:group-hover:text-orange-400'}`} />
                            )}
                            <span className="truncate">{lecture.snippet?.title}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {isCurriculumSidebarVisible && (
          <div
            className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setIsCurriculumSidebarVisible(false)}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </div>
  );
};

export default ContestsPage;