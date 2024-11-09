import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomBadge: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
    <div className={`relative h-14 w-14 ${color}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
            {children}
        </svg>
    </div>
);

const EcoLevelSystem = ({ score = 2800 }) => {
    const levels = [
        {
            range: [0, 499],
            title: "Eco Beginner",
            tagline: "Taking the first steps in the journey of environmental stewardship",
            badge: (
                <CustomBadge color="text-green-400">
                    {/* Seedling emerging from soil design */}
                    <rect x="20" y="70" width="60" height="20" fill="#8B4513" />
                    <path d="M50 20 C40 40 60 40 50 60" stroke="currentColor" strokeWidth="8" fill="none" />
                    <circle cx="50" cy="65" r="5" fill="currentColor" />
                    <path d="M35 45 C45 35 55 35 65 45" stroke="currentColor" strokeWidth="4" fill="none" />
                </CustomBadge>
            ),
            color: "text-green-400",
            bgColor: "bg-green-50"
        },
        {
            range: [500, 999],
            title: "Eco Explorer",
            tagline: "Venturing beyond basics to discover new horizons of sustainability",
            badge: (
                <CustomBadge color="text-blue-500">
                    {/* Compass with leaf elements design */}
                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                    <path d="M50 20 L60 45 L85 45 L65 60 L75 85 L50 70 L25 85 L35 60 L15 45 L40 45 Z" fill="white" />
                    <circle cx="50" cy="50" r="5" fill="white" />
                    <path d="M50 30 L50 70 M30 50 L70 50" stroke="white" strokeWidth="3" />
                </CustomBadge>
            ),
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            range: [1000, 1499],
            title: "Eco Warrior",
            tagline: "Fighting for change with every sustainable action and choice",
            badge: (
                <CustomBadge color="text-amber-500">
                    {/* Shield with environmental symbols */}
                    <path d="M50 10 L90 25 L85 75 L50 90 L15 75 L10 25 Z" fill="currentColor" />
                    <path d="M50 20 L80 32 L76 72 L50 85 L24 72 L20 32 Z" fill="white" />
                    <path d="M40 45 Q50 30 60 45 Q50 60 40 45" fill="currentColor" />
                    <rect x="48" y="42" width="4" height="25" fill="currentColor" />
                </CustomBadge>
            ),
            color: "text-amber-500",
            bgColor: "bg-amber-50"
        },
        {
            range: [1500, 2499],
            title: "Eco Hero",
            tagline: "Inspiring communities through exemplary environmental leadership",
            badge: (
                <CustomBadge color="text-emerald-500">
                    {/* Star with earth elements */}
                    <path d="M50 5 L61 41 L95 41 L67 63 L79 95 L50 75 L21 95 L33 63 L5 41 L39 41 Z" fill="currentColor" />
                    <circle cx="50" cy="50" r="15" fill="white" />
                    <path d="M40 50 Q50 35 60 50 Q50 65 40 50" fill="currentColor" />
                </CustomBadge>
            ),
            color: "text-emerald-500",
            bgColor: "bg-emerald-50"
        },
        {
            range: [2500, 4499],
            title: "Eco Champion",
            tagline: "Mastering the art of sustainable living and leading by example",
            badge: (
                <CustomBadge color="text-indigo-500">
                    {/* Trophy with ecological elements */}
                    <path d="M30 20 L70 20 L65 80 L35 80 Z" fill="currentColor" />
                    <circle cx="50" cy="40" r="15" fill="white" />
                    <path d="M20 20 Q10 50 30 50" fill="currentColor" />
                    <path d="M80 20 Q90 50 70 50" fill="currentColor" />
                    <rect x="45" y="75" width="10" height="15" fill="currentColor" />
                    <rect x="35" y="90" width="30" height="5" fill="currentColor" />
                </CustomBadge>
            ),
            color: "text-indigo-500",
            bgColor: "bg-indigo-50"
        },
        {
            range: [4500, 99999],
            title: "Eco Legend",
            tagline: "Setting the golden standard for environmental excellence",
            badge: (
                <CustomBadge color="text-purple-500">
                    {/* Crown with environmental elements */}
                    <path d="M20 50 L50 20 L80 50 L70 80 L30 80 Z" fill="currentColor" />
                    <path d="M30 60 L50 40 L70 60 L65 75 L35 75 Z" fill="white" />
                    <circle cx="50" cy="55" r="8" fill="currentColor" />
                    <circle cx="30" cy="45" r="5" fill="white" />
                    <circle cx="70" cy="45" r="5" fill="white" />
                </CustomBadge>
            ),
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        }
    ];

    const getCurrentLevel = (score: number) => {
        return levels.find(level =>
            score >= level.range[0] && score <= level.range[1]
        ) || levels[0];
    };

    const currentLevel = getCurrentLevel(score);

    // Calculate progress to next level
    const getProgressToNext = (score: number, currentLevel: { range: number[], title: string, tagline: string, badge: JSX.Element, color: string, bgColor: string }) => {
        const nextLevel = levels[levels.indexOf(currentLevel) + 1];
        if (!nextLevel) return 100;
        const rangeSize = currentLevel.range[1] - currentLevel.range[0];
        const scoreInRange = score - currentLevel.range[0];
        return Math.min(Math.round((scoreInRange / rangeSize) * 100), 100);
    };

    const progress = getProgressToNext(score, currentLevel);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            {/* Current Level Card */}
            <Card className={`border-2 ${currentLevel.bgColor}`}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Your EcoScore Progress</CardTitle>
                        <span className={`text-3xl font-bold ${currentLevel.color}`}>{score}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-full ${currentLevel.bgColor}`}>
                            {currentLevel.badge}
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-xl font-bold ${currentLevel.color}`}>
                                {currentLevel.title}
                            </h3>
                            <p className="text-gray-600 italic">{currentLevel.tagline}</p>
                            <div className="mt-2">
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className={`h-2 rounded-full ${currentLevel.bgColor} ${currentLevel.color}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {progress}% to next level
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Level Progress System */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {levels.map((level, index) => (
                    <Card
                        key={index}
                        className={`${score >= level.range[0] && score <= level.range[1]
                                ? level.bgColor + ' border-2'
                                : ''
                            }`}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${level.bgColor}`}>
                                    {level.badge}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${level.color}`}>{level.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {level.range[0]}-{level.range[1] === 99999 ? '∞' : level.range[1]} points
                                    </p>
                                    <p className="text-xs text-gray-500 italic">{level.tagline}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default EcoLevelSystem;