import React, { useMemo } from 'react';
import { ContestCard } from '../components';
import { Trophy } from 'lucide-react';

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

const ContestsPageListing = () => {
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

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 pt-12 pb-30'>
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
    );
}

export default ContestsPageListing;
