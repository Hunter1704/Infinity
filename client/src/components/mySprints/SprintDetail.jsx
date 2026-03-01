import React, {useMemo} from 'react';
import { ArrowLeft, Lock, Unlock } from 'lucide-react';
import { useNavigate, useParams, useOutletContext, NavLink } from 'react-router';
import Icon from '../shared/Icon';

const getStatusIcon = (status) => {
  switch (status) {
    case 'Solved':
      return (
        <Icon
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
          className="w-5 h-5 text-green-600 dark:text-green-500"
          viewBox="0 0 20 20"
          isOutline={false}
          svgProps={{ "aria-label": "Solved" }}
        />
      );
    case 'Attempted':
      return (
        <Icon
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
          pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
          className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
          viewBox="0 0 20 20"
          isOutline={false}
          svgProps={{ "aria-label": "Attempted" }}
        />
      );
    case 'Todo':
    default:
      return (
        <Icon
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
          pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
          className="w-5 h-5 text-slate-400 dark:text-gray-500"
          viewBox="0 0 20 20"
          isOutline={false}
          svgProps={{ "aria-label": "To Do" }}
        />
      );
  }
};

const SprintDetail = () => {
  const { sprints } = useOutletContext();
  const navigate = useNavigate();
  const { sprintName } = useParams();

 const sprint = useMemo(() => {
  if (!sprintName) return null;

  return sprints?.find((sp) => sp.sprintName === sprintName) || null;

}, [sprintName, sprints]);

  const difficultyStyles = {
    Easy: 'bg-green-500/10 text-green-400',
    Medium: 'bg-yellow-500/10 text-yellow-400',
    Hard: 'bg-red-500/10 text-red-400',
  };

  if(!sprint) return <div>No sprint exists with the given name</div>

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50 via-white to-orange-50
        dark:from-[#0f172a] dark:via-[#0b1220] dark:to-[#1a2332]
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
  
        {/* Back Button */}
        <button
          onClick={() => navigate('/my-sprints')}
          className="
            flex items-center space-x-2
            text-sm font-semibold
            text-slate-600 dark:text-slate-400
            hover:text-orange-500
            transition-colors
            mb-10
          "
        >
          <ArrowLeft size={16} />
          <span>Back to Sprints</span>
        </button>
  
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <h1
              className="
                text-4xl md:text-5xl font-extrabold
                bg-gradient-to-r from-orange-500 to-amber-400
                bg-clip-text text-transparent
              "
            >
              {sprint.sprintName}
            </h1>
  
            <span
              className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full ${
                sprint.isPublic
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-slate-500/10 text-slate-400'
              }`}
            >
              {sprint.isPublic ? <Unlock size={14} /> : <Lock size={14} />}
              <span>{sprint.isPublic ? 'Public' : 'Private'}</span>
            </span>
          </div>
        </div>
  
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl">
          {sprint.description}
        </p>
  
        {/* Table Section */}
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
          Problems in this Sprint
        </h2>
  
        <div
          className="
            backdrop-blur-xl
            bg-white/70 dark:bg-slate-900/60
            border border-slate-200/60 dark:border-slate-700/60
            rounded-3xl
            shadow-xl
            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-600 dark:text-slate-300">
              <thead className="text-xs uppercase bg-slate-100/70 dark:bg-slate-800/60">
                <tr>
                  <th className="px-6 py-4 w-16">Status</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
  
              <tbody>
                {sprint.problems.map((problem) => (
                  <tr
                    key={problem._id}
                    className="
                      border-b border-slate-200 dark:border-slate-700
                      hover:bg-slate-100/60 dark:hover:bg-slate-800/50
                      transition
                    "
                  >
                    <td className="px-6 py-4" title={problem.status || 'To Do'}>
                      {getStatusIcon(problem.status)}
                    </td>
  
                    <th
                      scope="row"
                      className="px-6 py-4 font-semibold text-slate-800 dark:text-white whitespace-nowrap"
                    >
                      <NavLink
                        to={`/problems/${problem._id}`}
                        className="hover:text-orange-500 transition-colors"
                      >
                        {problem.title}
                      </NavLink>
                    </th>
  
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${difficultyStyles[problem.difficulty]}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
  
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="
                              bg-slate-200/70 dark:bg-slate-700/60
                              px-2.5 py-0.5
                              text-xs
                              rounded-full
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
  
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => navigate(`/problems/${problem._id}`)}
                        className="
                          font-semibold
                          py-2 px-4
                          rounded-lg
                          text-white
                          bg-gradient-to-r from-orange-500 to-amber-400
                          hover:opacity-90
                          transition
                        "
                        aria-label={`View problem: ${problem.title}`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
  
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintDetail;
